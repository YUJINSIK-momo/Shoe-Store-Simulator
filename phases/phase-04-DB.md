# Phase 04 — DB 마이그레이션 체계화 + 전체 스키마 + 환경 분리

## 목표 / 배경

지금 DB는 `custom_designs` 한 장뿐이고, 테이블 생성이 단발성 SQL이라 추적·재현이 어렵다.
**마이그레이션 폴더(`supabase/migrations/`)를 단일 진실로** 삼아 전체 스키마(회원·신발·주문·결제)를
버전관리하고, **dev/prod 환경을 분리**해 안전하게 테스트→배포한다.

> **RDS 대비:** 마이그레이션을 **순수 Postgres SQL**로 작성한다. 테이블 DDL은 RDS에 그대로 이식 가능.
> 단 `auth.users` 참조와 RLS의 `auth.uid()`는 Supabase 전용 → RDS+NestJS 도입 시 그 부분만 앱 레벨 인가로 교체. (ADR-009)

---

## A. 마이그레이션 체계 (단일 진실)

- [x] `supabase/migrations/` 도입 (타임스탬프 순 SQL, idempotent)
- [x] `..._custom_designs.sql` — 기존 테이블을 마이그레이션으로 편입
- [x] `..._profiles.sql` — `profiles` + **회원가입 시 자동 생성 트리거**(`handle_new_user`)
- [x] `..._shoes.sql` — 신발 카탈로그(공개 읽기)
- [x] `..._orders.sql` — `orders` / `order_items` / `payments` + RLS(본인 주문만)
- [x] `supabase/seed.sql` — 샘플 신발 (로컬/선택)
- [x] `supabase/README.md` — 적용법(CLI/SQL Editor) + 환경분리 + RDS 이식 메모

## B. 환경 분리 (dev / prod)

- [x] 앱은 `EXPO_PUBLIC_SUPABASE_*` env로 프로젝트를 가른다 (이미 구조 존재)
- [ ] 🖐 **prod용 Supabase 프로젝트 신설** (현재 `xpkltycmkloeshwcvqck`는 dev로 사용)
- [ ] 🖐 prod 프로젝트에 동일 마이그레이션 적용
- [ ] 🖐 (운영 배포 시) prod secrets로 빌드 — preview(dev) / production(prod) 분리

## 🖐 적용 (한 번)

CLI 또는 SQL Editor 중 택1 — `supabase/README.md` 참고.

- [ ] 🖐 dev 프로젝트에 `supabase/migrations/*` 순서대로 적용
- [ ] 🖐 (이미 `custom_designs.sql`을 수동 실행했다면 idempotent라 재적용 안전)

## 완료 조건

- [x] 마이그레이션 폴더가 전체 스키마의 단일 진실이다
- [x] 순수 SQL이라 RDS 이식 경로가 문서화돼 있다 (ADR-009)
- [ ] 🖐 dev 프로젝트에 전체 스키마가 적용되고 회원가입 시 profile이 자동 생성된다
- [ ] 🖐 prod 프로젝트가 분리돼 동일 스키마로 재현된다
- [x] `npm run verify` 통과 (앱 코드 변경 없음)

## 다음 Phase

→ `phases/phase-05-catalog.md` (신발 카탈로그 화면이 `shoes` 사용) 또는 결제(토스) 연동
→ (장기) NestJS + AWS RDS 도입 시 본 마이그레이션을 베이스로 이전

## 참고

- 결정: `docs/ADR.md` ADR-009 (Supabase 마이그레이션 기반 + dev/prod + RDS 이식 전략)
- 스키마 개요: `CLAUDE.md` "Supabase 테이블 구조"
