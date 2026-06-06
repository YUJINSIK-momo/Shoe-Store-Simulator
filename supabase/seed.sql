-- 샘플 신발 카탈로그 (선택). 로컬: supabase db reset 시 자동 적용.
-- 원격(대시보드)에 넣으려면 SQL Editor에 직접 실행.
-- 고정 id로 idempotent하게.

insert into public.shoes (id, name, base_price, model_url) values
  ('11111111-1111-1111-1111-111111111111', '클래식 스니커즈', 89000, null),
  ('22222222-2222-2222-2222-222222222222', '러너 로우', 119000, null),
  ('33333333-3333-3333-3333-333333333333', '하이탑 캔버스', 99000, null)
on conflict (id) do nothing;
