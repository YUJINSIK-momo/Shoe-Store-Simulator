// Supabase 연결 스모크 테스트 (CI·로컬 공용)
// URL/키가 유효하고 Auth 엔드포인트가 살아있는지만 확인한다.
// 로컬:  node --env-file=.env scripts/verify-supabase.mjs
// CI:    secrets로 env 주입 후 node scripts/verify-supabase.mjs

const url = process.env.EXPO_PUBLIC_SUPABASE_URL
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error("✗ EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY 가 비어 있습니다.")
  process.exit(1)
}

const endpoint = `${url.replace(/\/$/, "")}/auth/v1/health`

try {
  const res = await fetch(endpoint, { headers: { apikey: key } })
  if (!res.ok) {
    console.error(`✗ Supabase 응답 ${res.status} — URL/키를 확인하세요 (${endpoint})`)
    process.exit(1)
  }
  console.log(`✓ Supabase 연결 OK (${url})`)
} catch (e) {
  console.error(`✗ Supabase 연결 실패: ${e.message}`)
  process.exit(1)
}
