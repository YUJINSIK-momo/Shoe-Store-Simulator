# Phase 01 — 셋업 & 커스텀 시뮬레이터 골격

## 목표

프로젝트 기초 구조와 1단계 커스텀 시뮬레이터 UI 골격을 완성한다.
이 phase가 끝나면 `npm run verify`가 통과하고, 색상/소재 변경이 미리보기에 반영된다.

## 체크리스트

- [x] Expo Router 라우팅 동작 (탭: 홈/커스텀/장바구니/마이페이지)
- [x] `customizeStore`(부위별 partsConfig) 구현
- [x] `cartStore`(장바구니) 구현
- [x] `ShoeViewer` — 다각도 이미지 + 제스처 전환 + 색상 뱃지
- [x] `ColorPalette` / `MaterialPicker` / `PartSelector`로 부위별 색상·소재 변경
- [x] `types/` 정의 (shoe / order / payment)
- [x] `api/` + `hooks/`(TanStack Query) 골격
- [x] ESLint 설정 (eslint-config-expo, flat config)
- [x] `package.json`에 `verify` 스크립트 등록 (`type-check + lint`)
- [x] `npm run verify` 통과
- [x] kit 문서 정리 (CLAUDE.md / docs / phases)
- [ ] GitHub Actions `verify.yml` 첫 실행 통과 (push 후 Actions 탭 확인)
- [ ] 결제 화면 실제 결제 연동 전 UI 마감 (현재 스텁)

## 완료 조건

위 체크박스가 모두 `- [x]`가 되고 `dev` → `main` 머지됨.

## 다음 Phase

→ `phases/phase-02-auth.md` (Supabase Auth 연동)

## 참고

- 폴더 구조: `docs/ARCHITECTURE.md`
- 디자인 토큰: `docs/UI_GUIDE.md`
- 큰 결정: `docs/ADR.md`
