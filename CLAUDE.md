# CLAUDE.md

## 프로젝트 개요

신발 커스텀 시뮬레이션 모바일 애플리케이션이다.

사용자가 신발의 색상, 소재, 부위별 디자인을 직접 커스터마이징하고,
완성된 커스텀 신발을 장바구니에 담아 결제까지 완료할 수 있다.

TestFlight를 통해 iOS 베타 배포하며, 추후 App Store 정식 출시를 목표로 한다.

---

## 프로젝트 목표

- 신발 부위별(밑창, 갑피, 끈, 로고 등) 색상 및 소재 커스터마이징
- 실시간 2D/3D 미리보기 시뮬레이션
- 커스텀 결과물 저장 및 공유
- 장바구니 → 주문 → 결제 플로우 완성
- TestFlight 베타 배포
- GitHub Actions 기반 CI/CD 자동화

---

## 기술 스택

### 앱 (Frontend)

- **React Native** (Expo SDK 51+)
- **TypeScript**
- **Expo Router** (파일 기반 네비게이션)
- **React Native Reanimated** (애니메이션)
- **React Native Gesture Handler**
- **react-native-svg** (2D 커스터마이저)
- **Three.js / Expo GL** (3D 뷰어 - 2단계)
- **Zustand** (전역 상태관리 - 장바구니, 커스텀 옵션)
- **TanStack Query** (서버 상태 관리 / API 캐싱)

### 백엔드

- **Node.js + NestJS**
- **Supabase** (PostgreSQL DB + Auth + Storage)
- **Railway** (서버 실행 환경 - 테스트)
- **AWS EC2 + RDS** (프로덕션 이전 시)

### 결제

- **Stripe** (해외 결제 / 카드)
- **토스페이먼츠** (국내 결제 / 간편결제)

### 배포

- **Expo EAS Build** (앱 빌드)
- **TestFlight** (iOS 베타 배포)
- **GitHub Actions** (CI/CD 자동화)
- **Expo Updates (OTA)** (앱 스토어 심사 없이 JS 코드 업데이트)

---

## 전체 시스템 구성도

```
[ 사용자 iPhone ]
        ↓
┌─────────────────────────┐
│   React Native (Expo)   │  ← 커스텀 UI / 뷰어 / 장바구니
│   TestFlight 배포        │
└──────────┬──────────────┘
           │ REST API / HTTPS
           ↓
┌─────────────────────────┐
│   NestJS 백엔드          │  ← 주문 처리 / 결제 검증 / 인증
│   Railway (테스트)       │
│   AWS EC2 (프로덕션)     │
└──────┬──────────┬───────┘
       │          │
       ↓          ↓
┌──────────┐  ┌──────────────┐
│ Supabase │  │ Stripe /     │
│ (DB/Auth │  │ 토스페이먼츠  │
│ Storage) │  │ (결제 API)   │
└──────────┘  └──────────────┘
```

---

## 주요 화면 구성

### 1. 홈 / 탐색 화면
- 추천 커스텀 디자인 피드
- 카테고리별 신발 모델 선택
- 인기 커스텀 랭킹

### 2. 커스텀 시뮬레이터 (핵심 화면)
- 신발 2D/3D 뷰어
- 부위 선택 패널
  - 밑창 (Outsole)
  - 갑피 (Upper)
  - 안창 (Insole)
  - 신발끈 (Laces)
  - 로고 부위
- 색상 팔레트 선택
- 소재 선택 (가죽 / 스웨이드 / 메쉬 / 캔버스)
- 실시간 미리보기 업데이트
- 커스텀 저장 / 공유 버튼

### 3. 저장된 디자인 목록
- 내가 만든 커스텀 디자인 갤러리
- 수정 / 삭제 / 재주문

### 4. 장바구니
- 커스텀 옵션 요약 카드
- 수량 조절
- 사이즈 선택
- 예상 제작 기간 표시
- 주문하기 버튼

### 5. 결제 화면
- 배송지 입력
- 결제 수단 선택 (카드 / 카카오페이 / 네이버페이 / 토스)
- 주문 최종 확인
- 결제 완료 → 주문 추적 화면

### 6. 주문 내역 / 추적
- 주문 상태 타임라인
  - 주문접수 → 제작중 → 배송중 → 완료
- 커스텀 상세 내역 확인

### 7. 마이페이지
- 프로필 설정
- 주문 내역
- 저장된 디자인
- 알림 설정

---

## 커스텀 시뮬레이터 기술 구현

### 2D SVG 방식 (1단계 - 기본 구현)

```
신발 SVG 레이어 구조
├── 밑창 레이어 (outsole.svg)
├── 갑피 레이어 (upper.svg)
├── 안창 레이어 (insole.svg)
├── 끈 레이어 (laces.svg)
└── 로고 레이어 (logo.svg)

각 레이어는 독립적으로 색상 / 텍스처 변경 가능
react-native-svg 라이브러리 사용
```

### 3D 방식 (2단계 - 고급 구현)

```
Three.js + Expo GL
├── GLB/GLTF 신발 3D 모델 로드
├── 부위별 Material 분리
├── 색상 / 텍스처 실시간 교체
└── 터치로 360도 회전
```

> 초기 개발은 2D SVG로 빠르게 구현하고, 이후 3D로 업그레이드한다.

---

## 결제 플로우

### 토스페이먼츠 (국내 간편결제)

```
앱에서 결제 버튼 클릭
↓
NestJS 백엔드로 결제 요청 생성
↓
토스페이먼츠 SDK → 결제창 호출
(카카오페이 / 네이버페이 / 카드)
↓
결제 완료 → 백엔드에 paymentKey + orderId 전달
↓
백엔드에서 토스페이먼츠 API로 결제 승인 요청
↓
승인 완료 → 주문 DB 저장 (Supabase)
↓
앱에 결제 완료 응답 → 주문 추적 화면 이동
```

### Stripe (해외 카드 결제)

```
앱에서 결제 버튼 클릭
↓
NestJS 백엔드로 PaymentIntent 생성 요청
↓
Stripe API → client_secret 반환
↓
앱에서 Stripe SDK로 카드 정보 입력 후 결제 승인
↓
Stripe → 백엔드 Webhook 호출 (payment_intent.succeeded)
↓
백엔드에서 주문 상태 업데이트 → Supabase DB 저장
↓
앱에 결제 완료 응답
```

---

## 배포 플로우 (TestFlight까지)

### 사전 준비 (최초 1회)

```
1. Apple Developer Program 가입 ($99/년)
   → https://developer.apple.com/programs/

2. Expo 계정 생성
   → https://expo.dev/signup

3. EAS CLI 설치
   npm install -g eas-cli

4. EAS 로그인
   eas login

5. 프로젝트 EAS 초기화
   eas build:configure
```

### 개발 환경 초기 세팅

```bash
# EAS CLI 전역 설치
npm install -g eas-cli expo-cli

# Expo 프로젝트 생성
npx create-expo-app@latest shoe-customizer --template blank-typescript

# 프로젝트 폴더 이동
cd shoe-customizer

# 필수 라이브러리 설치
npx expo install expo-router react-native-svg react-native-reanimated \
  react-native-gesture-handler zustand @tanstack/react-query \
  @supabase/supabase-js axios

# 개발 서버 실행
npx expo start
```

### EAS 빌드 설정 (eas.json)

```json
{
  "cli": {
    "version": ">= 10.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "buildConfiguration": "Release"
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@apple.com",
        "ascAppId": "your-app-store-connect-app-id",
        "appleTeamId": "YOUR_TEAM_ID"
      }
    }
  }
}
```

### TestFlight 배포 절차

```
1. EAS로 iOS 빌드 실행
   eas build --platform ios --profile preview
   └─ 빌드 완료까지 약 10~20분 소요

2. App Store Connect에 자동 업로드
   eas submit --platform ios --latest

3. App Store Connect 접속
   → https://appstoreconnect.apple.com
   → 내 앱 → TestFlight 탭
   → 업로드된 빌드 확인 (처리 시간 약 5~10분)

4. 테스터 추가
   → 내부 테스터: Apple Developer 팀원 (최대 100명, 즉시 배포)
   → 외부 테스터: 이메일 초대 (최대 10,000명, Apple 심사 1~3일)

5. 테스터 기기에서
   → TestFlight 앱 설치 → 초대 이메일 수락 → 베타 앱 다운로드
```

### GitHub Actions CI/CD 자동화

```yaml
# .github/workflows/eas-build.yml

name: EAS Build & TestFlight 자동 배포

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    name: EAS Build iOS
    runs-on: ubuntu-latest

    steps:
      - name: 코드 체크아웃
        uses: actions/checkout@v4

      - name: Node.js 설정
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: 의존성 설치
        run: npm ci

      - name: EAS CLI 설치
        run: npm install -g eas-cli

      - name: EAS 빌드 + TestFlight 제출
        run: eas build --platform ios --profile preview --non-interactive --auto-submit
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

### GitHub Secrets 설정 (최초 1회)

```
GitHub 저장소 → Settings → Secrets and variables → Actions

EXPO_TOKEN              Expo 계정 액세스 토큰 (expo.dev에서 발급)
STRIPE_SECRET_KEY       Stripe 시크릿 키 (백엔드용)
TOSS_SECRET_KEY         토스페이먼츠 시크릿 키 (백엔드용)
SUPABASE_URL            Supabase 프로젝트 URL
SUPABASE_SERVICE_KEY    Supabase Service Role Key (백엔드용)
```

---

## 폴더 구조

```
shoe-customizer/
├── app/                          # Expo Router 페이지
│   ├── (tabs)/
│   │   ├── index.tsx             # 홈
│   │   ├── customize.tsx         # 커스텀 시뮬레이터
│   │   ├── cart.tsx              # 장바구니
│   │   └── mypage.tsx            # 마이페이지
│   ├── product/
│   │   └── [id].tsx              # 신발 모델 상세
│   ├── checkout/
│   │   ├── index.tsx             # 결제 화면
│   │   └── complete.tsx          # 결제 완료
│   └── order/
│       └── [id].tsx              # 주문 추적
│
├── components/
│   ├── customizer/
│   │   ├── ShoeViewer.tsx        # 신발 SVG 뷰어
│   │   ├── PartSelector.tsx      # 부위 선택 패널
│   │   ├── ColorPalette.tsx      # 색상 팔레트
│   │   └── MaterialPicker.tsx    # 소재 선택
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   ├── payment/
│   │   ├── StripeForm.tsx
│   │   └── TossButton.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Badge.tsx
│
├── store/
│   ├── customizeStore.ts         # 커스텀 옵션 상태 (Zustand)
│   └── cartStore.ts              # 장바구니 상태 (Zustand)
│
├── hooks/
│   ├── useShoeModel.ts
│   └── useOrder.ts
│
├── api/
│   ├── client.ts                 # axios 기본 설정
│   ├── shoes.ts
│   ├── orders.ts
│   └── payment.ts
│
├── types/
│   ├── shoe.ts
│   ├── order.ts
│   └── payment.ts
│
├── assets/
│   ├── shoes/                    # 신발 SVG 파일
│   └── textures/                 # 소재 텍스처 이미지
│
├── constants/
│   ├── colors.ts                 # 선택 가능한 색상 목록
│   └── materials.ts              # 소재 옵션 목록
│
├── eas.json
├── app.json
├── .env
└── .github/
    └── workflows/
        └── eas-build.yml
```

---

## 환경변수

```env
# API 서버
EXPO_PUBLIC_API_BASE_URL=https://your-backend.railway.app

# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe 공개키 (앱에서 사용)
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx

# 토스페이먼츠 클라이언트 키 (앱에서 사용)
EXPO_PUBLIC_TOSS_CLIENT_KEY=test_ck_xxxx
```

> `EXPO_PUBLIC_` 접두사가 붙은 변수만 앱 코드에서 접근 가능하다.
> 시크릿 키(Secret Key)는 절대 앱에 포함하지 않는다 → 백엔드(Railway)에서만 사용.

---

## 테스트 환경 구성 (Railway + Supabase)

```
[ Expo 앱 (로컬 / TestFlight) ]
          ↓
┌─────────────────────┐
│   Railway           │  ← NestJS 백엔드
│   (테스트 서버)      │    GitHub push 시 자동 배포
└──────┬──────────────┘
       ↓
┌─────────────────────┐
│   Supabase          │  ← PostgreSQL + Auth + Storage
│   (DB / 인증)        │    신발 모델, 주문, 유저 데이터
└─────────────────────┘
```

### Supabase 테이블 구조

```sql
-- 신발 모델
shoes (id, name, base_price, model_url, created_at)

-- 커스텀 디자인
custom_designs (
  id, user_id, shoe_id,
  parts_config JSONB,   -- 부위별 색상/소재 저장
  thumbnail_url,
  created_at
)

-- parts_config 예시
-- {
--   "outsole": { "color": "#FFFFFF", "material": "rubber" },
--   "upper":   { "color": "#000000", "material": "leather" },
--   "laces":   { "color": "#FF0000" }
-- }

-- 주문
orders (
  id, user_id, design_id,
  status,   -- pending | confirmed | manufacturing | shipping | delivered
  total_price, shipping_address,
  created_at
)

-- 결제
payments (id, order_id, method, amount, status, payment_key, created_at)
```

---

## AWS 인프라 구성 (프로덕션 이전 시)

```
[ iOS 앱 / TestFlight / App Store ]
            ↓
┌────────────────────────┐
│  Route 53 (DNS)        │  ← 도메인 연결
└──────────┬─────────────┘
           ↓
┌────────────────────────┐
│  ALB (로드밸런서)       │  ← HTTPS 처리 / SSL 종료
└──────┬─────────────────┘
       ↓
┌────────────────────────┐
│  EC2 t3.medium         │  ← NestJS 서버 + Nginx
└──────┬─────────────────┘
       ├──→ RDS PostgreSQL (Multi-AZ)
       ├──→ ElastiCache Redis (세션 / 캐시)
       └──→ S3 + CloudFront (신발 이미지 / SVG / 3D 모델)
```

---

## 코드 규칙

### 기본 규칙
- 들여쓰기 2칸, 탭 사용 금지
- 세미콜론 사용하지 않음
- 큰따옴표 사용
- 컴포넌트명 PascalCase, 변수/함수명 camelCase
- 사용하지 않는 import 제거

### TypeScript 규칙
- `any` 사용 금지
- 모든 컴포넌트 props 타입 명시
- API 응답 타입은 `types/` 폴더에 정의
- Zustand store 타입 명시

### 컴포넌트 규칙
- 한 파일에 하나의 컴포넌트
- 비즈니스 로직은 커스텀 훅으로 분리
- 스타일은 `StyleSheet.create()` 사용

---

## 작업 프로세스

### 기능 구현 순서

```
1단계: 커스텀 시뮬레이터 UI
  └─ SVG 뷰어 → 부위 선택 → 색상/소재 변경 → 실시간 반영

2단계: 인증 (Supabase Auth)
  └─ 소셜 로그인 → 회원가입 → 로그인 상태 유지

3단계: 장바구니
  └─ Zustand store → 로컬 저장 → 서버 동기화

4단계: 결제
  └─ 토스페이먼츠 먼저 → Stripe 추가

5단계: 주문 추적
  └─ 상태 타임라인 UI

6단계: EAS 빌드 + TestFlight 배포
```

### 상태 확인 명령어

```bash
npx expo start          # 개발 서버 실행 확인
npm run lint            # 린트 오류 확인
npm run type-check      # 타입 오류 확인
```

---

## 명령어 정리

| 명령어 | 설명 |
|--------|------|
| `npx expo start` | 개발 서버 실행 |
| `npx expo start --ios` | iOS 시뮬레이터 실행 |
| `npm run lint` | 린트 확인 |
| `npm run type-check` | 타입 체크 |
| `eas build --platform ios --profile development` | 개발 빌드 (시뮬레이터) |
| `eas build --platform ios --profile preview` | TestFlight용 빌드 |
| `eas submit --platform ios --latest` | App Store Connect 제출 |
| `eas update --branch main --message "설명"` | OTA 업데이트 |

---

## 커밋 규칙

한글 커밋 메시지 사용 가능.

| prefix | 설명 |
|--------|------|
| `feat:` | 기능 추가 |
| `fix:` | 버그 수정 |
| `style:` | UI 수정 |
| `refactor:` | 코드 개선 |
| `docs:` | 문서 수정 |
| `chore:` | 설정 변경 |
| `build:` | 빌드 / 배포 관련 |

**예시**
```
feat: 신발 SVG 뷰어 색상 변경 기능 추가
feat: Zustand 장바구니 스토어 구현
feat: 토스페이먼츠 결제 연동
fix: 커스텀 옵션 저장 시 누락 버그 수정
build: EAS GitHub Actions 워크플로우 추가
chore: Supabase 환경변수 설정
```

---

## 완료 기준

- [ ] 신발 부위별 색상 / 소재 변경이 실시간 미리보기에 반영된다
- [ ] 커스텀 디자인을 저장하고 불러올 수 있다
- [ ] 장바구니에 커스텀 신발을 담을 수 있다
- [ ] 사이즈 선택이 가능하다
- [ ] 토스페이먼츠 또는 Stripe로 결제가 완료된다
- [ ] 주문 상태를 타임라인으로 확인할 수 있다
- [ ] Supabase Auth로 로그인 / 회원가입이 동작한다
- [ ] EAS 빌드가 성공한다
- [ ] TestFlight에 앱이 정상 배포된다
- [ ] GitHub Actions에서 main 브랜치 push 시 자동 빌드 / 배포된다
- [ ] 시크릿 키가 앱 코드에 노출되지 않는다