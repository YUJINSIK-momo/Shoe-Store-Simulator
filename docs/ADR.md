# Architecture Decision Records (ADR)

> **목적**: 6개월 뒤 "왜 이렇게 했지?"에 답하는 기록.
> 큰 결정이 생길 때마다 ADR-NN 형식으로 추가.

---

## ADR-001: 상태관리로 Zustand 채택

- **결정**: 로컬 전역 상태는 Zustand 사용 (커스텀 옵션 `customizeStore`, 장바구니 `cartStore`)
- **이유**: 커스텀 옵션과 장바구니가 여러 화면에 걸쳐 공유됨. boilerplate 적고 RN 친화적.
- **대안**: Context API, Redux Toolkit, Jotai
- **트레이드오프**: 서버 상태까지 Zustand에 넣지 않는다 — 그건 TanStack Query 몫(ADR-002).
- **결정일**: 2026-05-16

---

## ADR-002: 서버 상태는 TanStack Query

- **결정**: 신발 목록·주문 등 서버 데이터는 `hooks/`에서 useQuery/useMutation으로 관리
- **이유**: 캐싱·무효화·로딩/에러 상태를 표준화. 컴포넌트에서 직접 axios 호출 방지.
- **대안**: 직접 axios + useState, SWR
- **트레이드오프**: 로컬 상태(Zustand)와 서버 상태(Query)의 경계를 명확히 지켜야 함.
- **결정일**: 2026-05-16

---

## ADR-003: 라우팅은 Expo Router (파일 기반)

- **결정**: expo-router로 `app/` 디렉터리 파일 구조가 곧 라우트
- **이유**: Expo 표준, 딥링크·탭 네비게이션 기본 지원. 별도 네비게이션 설정 최소화.
- **대안**: React Navigation 수동 구성
- **트레이드오프**: 파일 위치가 URL을 결정하므로 폴더 이동 시 경로가 바뀐다.
- **결정일**: 2026-05-16

---

## ADR-004: 미리보기는 2D 먼저, 3D는 이후

- **결정**: 1단계는 다각도 이미지 + react-native-svg 기반 2D 미리보기. Three.js/Expo GL 3D는 2단계 이후.
- **이유**: 빠른 MVP·TestFlight 검증이 우선. 3D 모델 제작·성능 튜닝은 비용이 큼.
- **대안**: 처음부터 3D
- **트레이드오프**: 색상 변경의 시각적 사실감은 떨어지나, 핵심 플로우 검증에는 충분.
- **결정일**: 2026-05-16

---

## ADR-005: git 루트 = `shoe-customizer/` 서브폴더

- **결정**: 상위 폴더(한글 경로) 안의 `shoe-customizer/`를 git·npm·프로젝트 루트로 둔다.
- **이유**: 상위 폴더명에 한글이 있어 `create-expo-app`이 실패. Expo 도구체인은 ASCII 경로를 기대.
- **대안**: 상위 폴더명을 영문으로 변경 후 평탄화
- **트레이드오프**: Claude Code·터미널 작업은 항상 `shoe-customizer/`에서 실행해야 함. 상위 폴더는 컨테이너일 뿐.
- **결정일**: 2026-05-16

---

## ADR-006: 검증은 type-check + lint (build 단계 없음)

- **결정**: `npm run verify` = `tsc --noEmit && expo lint`. ESLint는 v9 + eslint-config-expo로 고정.
- **이유**: Expo 앱은 웹처럼 `npm run build`가 없다(번들은 EAS/Metro 담당). 빠른 정적 검증으로 "완료의 정의"를 잡는다. ESLint 10은 eslint-plugin-react와 비호환이라 v9로 고정.
- **대안**: Jest 테스트까지 포함, build 흉내
- **트레이드오프**: 런타임 동작은 보장하지 못함 → 실기기/시뮬레이터 확인은 별도.
- **결정일**: 2026-06-06

---

## ADR-007: 세션 저장은 AsyncStorage, 웹 배포는 SPA + baseUrl

- **결정**: Supabase 세션은 `@react-native-async-storage/async-storage`로 persist. 웹 프리뷰는 Expo Router `web.output: "single"`(SPA) + `experiments.baseUrl: "/Shoe-Store-Simulator"`로 GitHub Pages 서브패스 배포. 배포 시 `404.html = index.html` 폴백.
- **이유**: `expo-secure-store`는 웹 미지원. AsyncStorage는 네이티브+웹(localStorage)에서 모두 동작. `output: "static"`(프리렌더)는 빌드 시 Node에 `window`가 없어 reanimated·supabase 초기화가 `ReferenceError: window is not defined`로 깨짐 → 전체 클라이언트 렌더(SPA)로 전환.
- **대안**: expo-secure-store(네이티브 한정 하이브리드 어댑터), `output: "static"`(SSR 프리렌더 유지)
- **트레이드오프**: SPA라 route별 HTML/SEO 없음, 새로고침·딥링크는 `404.html` 폴백에 의존. AsyncStorage는 SecureStore보다 토큰 보안이 약하나 베타 단계에서 허용.
- **결정일**: 2026-06-06

---

## 템플릿

새 ADR을 추가할 때 이 형식을 복사:

```
## ADR-NNN: 제목

- **결정**:
- **이유**:
- **대안**:
- **트레이드오프**:
- **결정일**: YYYY-MM-DD
```
