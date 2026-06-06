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

## ADR-008: 디자인 저장은 Supabase 직접, 미리보기는 parts_config

- **결정**: `custom_designs`는 NestJS 백엔드 대신 **supabase-js로 Supabase에 직접** 저장(`api/designs.ts`). 갤러리 썸네일은 별도 이미지 업로드 없이 **parts_config의 부위 색상 스와치**로 렌더. RLS로 본인 행만 접근.
- **이유**: 백엔드가 아직 없고 인증이 이미 Supabase다. 썸네일 이미지 생성(렌더→캡처→Storage)은 비용이 커 MVP에서 제외. 색상 스와치만으로 디자인 식별 충분.
- **대안**: NestJS 경유 저장, ViewShot으로 실제 썸네일 캡처 후 Storage 업로드
- **트레이드오프**: 서버 측 검증/가공 없음(RLS에 의존). 썸네일이 실제 신발 렌더가 아니라 색상 요약. 신발 카탈로그(`shoes`) 도입 전이라 `shoe_id`는 nullable.
- **결정일**: 2026-06-06

---

## ADR-009: DB는 Supabase 마이그레이션 기반, dev/prod 분리, RDS는 이식 대비만

- **결정**: 스키마의 단일 진실을 `supabase/migrations/`(순수 Postgres SQL)로 둔다. 환경은 dev/prod **Supabase 프로젝트 2개**로 분리하고 앱/CI는 env로 전환. AWS RDS는 **지금 도입하지 않고**, 마이그레이션을 RDS 이식 가능한 형태로 작성만 한다.
- **이유**: RDS는 순수 Postgres라 Auth·RLS·Storage·자동 API가 없어 **NestJS 백엔드가 선행**돼야 함(현재 없음). 지금 RDS를 묶으면 인증 재구현까지 떠안는 큰 작업. 반면 마이그레이션 체계화+환경분리는 즉시 가치(재현성·안전한 테스트)를 주고, 순수 SQL이라 후일 RDS로 이전 시 베이스가 된다.
- **대안**: 지금 NestJS+RDS 풀백엔드 구축 / Supabase 단일 환경 유지(분리 없음)
- **트레이드오프**: RLS의 `auth.uid()`·`auth.users` FK·`handle_new_user` 트리거는 Supabase 전용 → RDS 전환 시 그 부분만 앱 레벨 인가로 교체 필요(테이블 DDL은 그대로 이식). prod 프로젝트 신설·마이그레이션 재적용은 수동.
- **결정일**: 2026-06-06

---

## ADR-010: 미리보기는 SVG 재색칠 (PNG+뱃지 폐기)

- **결정**: 커스터마이저 미리보기를 정적 PNG+색상 뱃지에서 **부위별 SVG path(`fill` 교체)** 로 전환(`SvgShoe`). 색은 즉시 반영, 소재 텍스처는 후속(phase-05 B), 3D는 장기.
- **이유**: 사진(PNG)은 부위별 재색칠이 불가해 색 변경이 신발에 안 보였다. SVG는 부위를 path로 분리해 `partsConfig` 색을 직접 칠할 수 있다.
- **대안**: PNG `tintColor`(단색 마스킹, 사진엔 부적합), 처음부터 3D(Three.js, 비용 큼), 디자이너 분리 SVG 에셋(추후)
- **트레이드오프**: 현재 신발 형태는 스타일라이즈드(사진만큼 사실적이지 않음). 다각도 PNG 스와이프 제거(단일 측면). 소재 시각 구분은 아직 없음. `mockup_*.png`는 보존.
- **결정일**: 2026-06-06

---

## ADR-011: 3D 미리보기는 react-three-fiber + expo-gl (플레이스홀더 우선)

- **결정**: 미리보기를 SVG(2D)에서 **3D**로 전환. `@react-three/fiber@9` + `three` + `expo-gl`로 웹·네이티브 모두 렌더. Canvas는 플랫폼별 파일(`ThreeCanvas.tsx`/`.native.tsx`)로 분기. 우선 **원시 도형 플레이스홀더 신발**로 파이프라인·부위 재색칠·회전을 완성하고, 진짜 GLB 모델은 후속(phase-05 C).
- **이유**: "진짜 신발처럼 돌려보며 부위 색 변경"이 목표. r3f가 웹/RN 공통 표준. 모델 소싱이 관건이라, 모델 없이도 검증 가능하도록 플레이스홀더부터.
- **대안**: 2D 사실적(이미지 레이어 틴팅, 회전 불가), 처음부터 GLB(모델 의존), `<model-viewer>`(웹 전용)
- **트레이드오프**: 번들 크기 큼(three ~수 MB), 저사양 성능 고려, 현재 외형은 블록형(사실적이지 않음 — GLB 교체로 해결). `react/no-unknown-property`·`react-hooks/refs`는 r3f/제스처 패턴상 `components/customizer/**`에서 비활성.
- **결정일**: 2026-06-06

---

## ADR-012: 3D 신발은 절차적 저폴리(부위 분리) — 무료 사실적 모델은 부위별 재색칠 불가

- **결정**: 3D 신발을 외부 GLB 대신 **three `ExtrudeGeometry` 기반 절차적 저폴리**(부위별 메쉬/머티리얼 분리)로 만든다. 부위별 색 변경(앱 핵심 기능)을 보존.
- **이유**: 무료 사실적 모델(예: Khronos `MaterialsVariantsShoe`)은 **메쉬 1개 + 단일 텍스처 머티리얼 + 색상 variants** 구조라 부위별로 칠할 수 없다(전체 틴트/프리셋만). "사실적 + 부위별 재색칠"을 동시 만족하는 무료·직접URL 모델은 사실상 없음. 부위 커스터마이즈가 제품의 핵심이라 그쪽을 우선.
- **대안**: Khronos 사실적 신발(부위별 포기, CC BY 출처표기), 부위 분리 모델 유료/직접 제작
- **트레이드오프**: 외형이 저폴리(사실적이지 않음). 추후 부위 분리된 실사급 GLB 확보 시 로더만 추가해 교체 가능(파이프라인은 이미 구축).
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
