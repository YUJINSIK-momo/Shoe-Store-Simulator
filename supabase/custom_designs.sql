-- custom_designs 테이블 + RLS
-- 실행 위치: Supabase 대시보드 → SQL Editor → 새 쿼리에 붙여넣고 Run
-- (한 번만 실행하면 된다. 재실행해도 안전하도록 IF NOT EXISTS 사용)

create table if not exists public.custom_designs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  shoe_id      text,                       -- 신발 카탈로그 도입 전이라 nullable
  parts_config jsonb not null,             -- 부위별 색상/소재
  thumbnail_url text,
  created_at   timestamptz not null default now()
);

create index if not exists custom_designs_user_id_idx
  on public.custom_designs (user_id, created_at desc);

-- Row Level Security: 본인 행만 접근
alter table public.custom_designs enable row level security;

drop policy if exists "본인 디자인 조회" on public.custom_designs;
create policy "본인 디자인 조회"
  on public.custom_designs for select
  using (auth.uid() = user_id);

drop policy if exists "본인 디자인 생성" on public.custom_designs;
create policy "본인 디자인 생성"
  on public.custom_designs for insert
  with check (auth.uid() = user_id);

drop policy if exists "본인 디자인 수정" on public.custom_designs;
create policy "본인 디자인 수정"
  on public.custom_designs for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "본인 디자인 삭제" on public.custom_designs;
create policy "본인 디자인 삭제"
  on public.custom_designs for delete
  using (auth.uid() = user_id);
