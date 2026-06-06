-- custom_designs 테이블 + RLS (본인 디자인만 접근)
-- idempotent: 재실행 안전

create table if not exists public.custom_designs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  shoe_id      text,                       -- 카탈로그(shoes) FK는 추후 전환
  parts_config jsonb not null,
  thumbnail_url text,
  created_at   timestamptz not null default now()
);

create index if not exists custom_designs_user_id_idx
  on public.custom_designs (user_id, created_at desc);

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
