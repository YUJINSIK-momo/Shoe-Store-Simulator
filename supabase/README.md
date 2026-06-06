# Supabase — DB 마이그레이션 가이드

`supabase/migrations/`가 **DB 스키마의 단일 진실**이다. 테이블 변경은 항상 새 마이그레이션 파일로 추가한다.

## 마이그레이션 목록 (적용 순서)

| 파일 | 내용 |
|------|------|
| `20260606120000_custom_designs.sql` | 커스텀 디자인 + RLS |
| `20260606120100_profiles.sql` | 프로필 + 회원가입 자동생성 트리거 |
| `20260606120200_shoes.sql` | 신발 카탈로그 (공개 읽기) |
| `20260606120300_orders.sql` | 주문/주문항목/결제 + RLS |
| `seed.sql` | 샘플 신발 (선택) |

모든 파일은 `if not exists` / `drop policy if exists`로 **재실행 안전(idempotent)**.

## 적용 방법

### 방법 1 — SQL Editor (간단)
대시보드 → SQL Editor에서 위 파일을 **순서대로** 붙여넣고 Run.
`https://supabase.com/dashboard/project/<PROJECT_REF>/sql/new`

### 방법 2 — Supabase CLI (권장, 재현성)
```bash
npm i -g supabase            # 또는 scoop/brew
supabase login
supabase link --project-ref <PROJECT_REF>
supabase db push             # migrations/ 전체 적용
# 로컬 개발 DB로 테스트:  supabase start && supabase db reset (seed 포함)
```

## 환경 분리 (dev / prod)

| 환경 | Supabase 프로젝트 | 앱/CI env |
|------|-------------------|-----------|
| **dev / test** | `xpkltycmkloeshwcvqck` (현재) | 로컬 `.env`, CI/preview Secrets |
| **prod** | 🖐 신설 필요 | 프로덕션 빌드 Secrets |

- 앱은 `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY`만 보면 되므로, **env만 바꾸면 환경 전환**된다.
- prod 프로젝트를 만들면 **같은 `migrations/`를 그대로 적용**해 스키마를 동일 재현한다.
- 비밀키(`sb_secret_...` / service_role)는 앱·커밋에 넣지 않는다. 공개키(`sb_publishable_...`)만.

## RDS 이식 메모 (장기)

- 테이블 **DDL은 순수 Postgres** → AWS RDS에 그대로 실행 가능.
- 단 `auth.users` 참조와 RLS의 `auth.uid()`, `handle_new_user` 트리거는 **Supabase Auth 전용**.
  → RDS + NestJS로 갈 때는 이 부분만 교체:
  - `auth.users` → 자체 `users` 테이블
  - RLS(`auth.uid()`) → **NestJS에서 앱 레벨 인가**로 대체
- 즉 이 마이그레이션들은 RDS 이전의 **베이스 설계**가 된다. (`docs/ADR.md` ADR-009)
