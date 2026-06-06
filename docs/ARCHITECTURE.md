# Architecture

> **목적**: Claude가 "이 코드 어디 있어?"를 매번 묻지 않게 하는 지도.

---

## 폴더 구조

```
shoe-customizer/                  ← git 루트 = 프로젝트 루트
├── app/                          ← Expo Router (파일 기반 라우팅)
│   ├── _layout.tsx               ← 루트 레이아웃 (QueryClient, GestureHandlerRootView)
│   ├── (tabs)/
│   │   ├── _layout.tsx           ← 탭 네비게이션
│   │   ├── index.tsx             ← 홈
│   │   ├── customize.tsx         ← 커스텀 시뮬레이터 (핵심)
│   │   ├── cart.tsx              ← 장바구니
│   │   └── mypage.tsx            ← 마이페이지
│   ├── product/[id].tsx          ← 신발 모델 상세
│   ├── checkout/{index,complete}.tsx ← 결제
│   └── order/[id].tsx            ← 주문 추적
├── components/
│   ├── customizer/               ← ShoeViewer, PartSelector, ColorPalette, MaterialPicker
│   ├── cart/                     ← CartItem, CartSummary
│   ├── payment/                  ← StripeForm, TossButton
│   └── ui/                       ← Button, Card, Badge (재사용)
├── store/                        ← Zustand: customizeStore, cartStore
├── hooks/                        ← TanStack Query 래핑: useShoeModel, useOrder
├── api/                          ← axios client + shoes/orders/payment 엔드포인트
├── types/                        ← shoe, order, payment 타입
├── constants/                    ← colors, materials (선택 옵션 목록)
└── assets/shoes/                 ← 신발 미리보기 이미지 (mockup_*.png)
```

## 데이터 흐름

```
[로컬 상태]  화면 → Zustand store (customize/cart) → 컴포넌트 → UI
[서버 상태]  화면 → hooks(TanStack Query) → api/*.ts → axios → 백엔드 → 캐시
```

- **커스텀 옵션**은 `customizeStore`(partsConfig)에 들고, `ShoeViewer`가 구독해 미리보기.
- **장바구니**는 `cartStore`(items)에 들고, 결제 화면이 `totalPrice()` 사용.
- **서버 데이터**(신발 목록·주문)는 컴포넌트에서 직접 axios 호출하지 말고 `hooks/`의 useQuery/useMutation으로.

## 외부 의존성

| 분류 | 항목 | 용도 |
|------|------|------|
| 프레임워크 | expo `~54`, react-native `0.81` | 앱 런타임 |
| 라우팅 | expo-router | 파일 기반 네비게이션 |
| 상태 | zustand | 로컬 전역 상태 (커스텀·장바구니) |
| 서버 상태 | @tanstack/react-query | API 캐싱·동기화 |
| 통신 | axios | REST 클라이언트 |
| 그래픽 | react-native-svg | 2D 커스터마이저 |
| 애니메이션 | react-native-reanimated, gesture-handler | 뷰어 스와이프/전환 |
| 백엔드 | @supabase/supabase-js | DB/Auth/Storage (연동 예정) |
| 품질 | typescript, eslint(+eslint-config-expo) | 타입·린트 |

## 모듈 경계 규칙

- `app/`(화면)은 `components/`·`store/`·`hooks/`를 import하지만 그 반대는 금지
- `components/ui/`는 비즈니스 로직·store를 직접 import하지 않는다 (props로만)
- `api/`는 React를 import하지 않는다 (순수 함수). React 연동은 `hooks/`에서.
- `types/`는 다른 레이어를 import하지 않는다 (순수 타입)
- 컴포넌트 간 직접 import 금지 — 공통 상태는 store로, 공통 함수는 별도 모듈로

## 라우트 추가 절차 (expo-router)

1. `app/` 하위에 파일 생성 → 파일 경로가 곧 URL (`app/order/[id].tsx` → `/order/123`)
2. 탭에 노출하려면 `app/(tabs)/_layout.tsx`의 `<Tabs.Screen>`에 등록
3. 이동은 `useRouter().push("/경로")` 또는 `<Link>`

## 환경변수

```
EXPO_PUBLIC_API_BASE_URL=
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
EXPO_PUBLIC_TOSS_CLIENT_KEY=
```

- `EXPO_PUBLIC_` 접두사가 붙은 변수만 앱 코드에서 접근 가능
- **시크릿 키(Secret Key)는 절대 앱에 두지 않는다** → 백엔드에서만 사용
- `.env`는 gitignored, 형식은 `.env.example` 참조
