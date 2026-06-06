-- orders / order_items / payments + RLS (본인 주문만)

create table if not exists public.orders (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  status           text not null default 'pending'
                     check (status in ('pending','confirmed','manufacturing','shipping','delivered')),
  total_price      integer not null default 0,
  shipping_address jsonb,
  created_at       timestamptz not null default now()
);

create index if not exists orders_user_id_idx
  on public.orders (user_id, created_at desc);

create table if not exists public.order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.orders (id) on delete cascade,
  design_id  uuid references public.custom_designs (id) on delete set null,
  shoe_id    uuid references public.shoes (id) on delete set null,
  size       integer not null,
  quantity   integer not null default 1 check (quantity > 0),
  unit_price integer not null default 0
);

create index if not exists order_items_order_id_idx
  on public.order_items (order_id);

create table if not exists public.payments (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders (id) on delete cascade,
  method      text not null,             -- card | kakao | naver | toss | stripe
  amount      integer not null,
  status      text not null default 'pending'
                check (status in ('pending','completed','failed','cancelled')),
  payment_key text,
  created_at  timestamptz not null default now()
);

-- RLS
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;

-- orders: 본인 것만
drop policy if exists "본인 주문 조회" on public.orders;
create policy "본인 주문 조회" on public.orders for select
  using (auth.uid() = user_id);
drop policy if exists "본인 주문 생성" on public.orders;
create policy "본인 주문 생성" on public.orders for insert
  with check (auth.uid() = user_id);
drop policy if exists "본인 주문 수정" on public.orders;
create policy "본인 주문 수정" on public.orders for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- order_items: 소속 주문이 본인 것일 때만
drop policy if exists "본인 주문항목 조회" on public.order_items;
create policy "본인 주문항목 조회" on public.order_items for select
  using (exists (select 1 from public.orders o
                 where o.id = order_items.order_id and o.user_id = auth.uid()));
drop policy if exists "본인 주문항목 생성" on public.order_items;
create policy "본인 주문항목 생성" on public.order_items for insert
  with check (exists (select 1 from public.orders o
                      where o.id = order_items.order_id and o.user_id = auth.uid()));

-- payments: 소속 주문이 본인 것일 때만 (조회). 승인/생성은 서버(service_role)에서.
drop policy if exists "본인 결제 조회" on public.payments;
create policy "본인 결제 조회" on public.payments for select
  using (exists (select 1 from public.orders o
                 where o.id = payments.order_id and o.user_id = auth.uid()));
