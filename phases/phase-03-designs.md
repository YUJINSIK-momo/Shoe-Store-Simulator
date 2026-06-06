# Phase 03 — 디자인 저장/갤러리 + UI 일관성

## 목표 / 배경

지금은 커스텀을 만들어도 저장할 수 없다. 로그인(phase-02)이 붙었으니
사용자별 커스텀 디자인을 **Supabase `custom_designs`** 에 저장하고,
갤러리에서 보고·삭제하고·다시 커스터마이저로 불러올 수 있게 한다.

함께 전체 화면의 **헤더/여백/배경을 공통 컴포넌트로 통일**해 UI 일관성을 높인다.

> 저장은 NestJS 백엔드가 아직 없으므로 **supabase-js로 Supabase에 직접** 한다. (ADR-008)

> **진행 상태 (2026-06-06):** 코드 전부 구현 + `npm run verify`·웹 빌드 통과. 남은 건 아래 🖐 SQL 실행(대시보드)뿐 — 그 전엔 저장 시 "저장 실패"가 정상이다.

---

## 🖐 선행 수동 작업 — Supabase 테이블 생성

`supabase/custom_designs.sql`의 SQL을 **Supabase 대시보드 → SQL Editor**에서 한 번 실행한다.
(테이블 + RLS 정책: 본인 디자인만 접근 가능)

- [ ] 🖐 `custom_designs` 테이블 + RLS 생성 (SQL 실행)

---

## A. 디자인 저장/갤러리 (MVP)

- [x] `types/shoe.ts` — `CustomDesign.shoeId`를 선택값으로 (아직 신발 카탈로그 없음)
- [x] `api/designs.ts` — supabase-js로 `list / create / delete` (snake_case ↔ camelCase 매핑)
- [x] `hooks/useDesigns.ts` — TanStack Query (`useDesigns`, `useCreateDesign`, `useDeleteDesign`)
- [x] `store/customizeStore.ts` — `loadConfig(partsConfig)` 추가 (갤러리 → 커스터마이저 불러오기)
- [x] 커스터마이저에 **저장** 버튼 (비로그인 시 로그인 유도)
- [x] `app/designs/index.tsx` — 갤러리: 목록·부위 색상 미리보기·삭제·탭하면 불러오기
- [x] 마이페이지 "저장된 디자인" → `/designs` 연결 (홈에도 바로가기 추가)

## B. UI/UX 일관성

- [x] `components/ui/Screen.tsx` — 공통 스캐폴드 (SafeArea + 배경 `#FAFAFA`)
- [x] `components/ui/ScreenHeader.tsx` — 공통 헤더 (제목·부제·뒤로가기·우측 액션)
- [x] 전 화면 적용 (home/customize/cart/mypage/designs/checkout/complete/product/order)
- [x] 푸시 화면은 뒤로가기, 탭 화면은 일관된 제목 블록

## 완료 조건

- [ ] 🖐 로그인 후 커스텀을 저장하면 갤러리에 나타난다 (SQL 실행 후 확인)
- [ ] 🖐 갤러리에서 삭제·불러오기가 동작한다 (불러오면 커스터마이저에 반영)
- [ ] 🖐 본인 디자인만 보인다 (RLS)
- [x] 모든 화면 헤더/여백/배경이 공통 컴포넌트로 통일된다
- [x] `npm run verify` 통과

## 다음 Phase

→ `phases/phase-04-catalog.md` (신발 모델 카탈로그 `shoes`) 또는 결제 연동

## 참고

- 결정: `docs/ADR.md` ADR-008 (디자인 Supabase 직접 저장 + parts_config 미리보기)
- 스키마: `CLAUDE.md` "Supabase 테이블 구조"
- Supabase 호출은 `api/`(순수)에, React 연동은 `hooks/`에 (ARCHITECTURE 경계 규칙)
