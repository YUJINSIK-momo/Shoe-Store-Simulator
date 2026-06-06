-- shoes: 신발 모델 카탈로그 (공개 읽기, 쓰기는 서버/관리자만)

create table if not exists public.shoes (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  base_price integer not null,            -- 원 단위
  model_url  text,
  created_at timestamptz not null default now()
);

alter table public.shoes enable row level security;

-- 카탈로그는 누구나 조회 가능 (비로그인 포함)
drop policy if exists "신발 카탈로그 공개 조회" on public.shoes;
create policy "신발 카탈로그 공개 조회"
  on public.shoes for select
  using (true);

-- INSERT/UPDATE/DELETE 정책 없음 → anon/authenticated는 쓰기 불가.
-- 시드/관리는 service_role(서버) 또는 SQL Editor로만.
