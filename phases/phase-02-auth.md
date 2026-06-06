# Phase 02 — 인증 (Supabase Auth) + CI/CD 프리뷰

## 목표 / 배경

마이페이지가 현재 "로그인이 필요합니다" 상태다.
Supabase Auth를 연동해 로그인/회원가입과 세션 유지를 붙이고,
이후 커스텀 디자인 저장(`custom_designs`)·주문을 사용자에 귀속시킬 기반을 만든다.

**추가 목표:** 로컬에서만 확인하던 인증·프론트 동작을 **GitHub Actions + GitHub Pages**로 올려,
`dev` 브랜치 push/PR마다 브라우저에서 실시간으로 확인할 수 있게 한다.

```
[로컬 개발]  expo start / expo start --web
      ↓
[CI]         push/PR → verify (type-check, lint, Supabase 연결 검증)
      ↓
[프리뷰]     dev push → Expo Web 빌드 → GitHub Pages 배포 → URL 공유
```

---

## 진행 상태 (2026-06-06 자동 처리)

- ✅ **코드 전부 구현 완료** — Supabase 클라이언트·authStore·로그인/회원가입 화면·세션 유지·로딩 게이트·토큰 주입·마이페이지·주문 로그인 게이트.
- ✅ **CI/프리뷰 파일 작성 완료** — `verify.yml`(Supabase step), `preview.yml`, `verify-supabase.mjs`, `app.json` baseUrl, package.json 스크립트. `npm run verify`·`verify:supabase`·`export:web` 로컬 통과.
- ⏳ **남은 것은 전부 "GitHub/Supabase 대시보드 수동 작업"** — 아래 `🖐 수동` 표시 항목. 코드로는 처리 불가.
- ℹ️ Supabase 설정상 **이메일 확인이 필요**(`mailer_autoconfirm=false`)하다. 회원가입 후 메일 링크를 눌러야 로그인 가능. 테스트 편의를 원하면 대시보드 Authentication → Sign In/Up에서 "Confirm email"을 잠시 꺼도 됨.

---

## A. Supabase 프로젝트 & 앱 연동

- [x] Supabase 프로젝트 생성 (또는 기존 프로젝트 사용)
- [x] `.env.example` → 로컬 `.env` 복사 후 `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` 채우기
- [x] `@supabase/supabase-js` 클라이언트 초기화 (`api/supabase.ts`, publishable key만 사용)
- [ ] Supabase 콘솔 Auth 설정
  - [x] 이메일/비밀번호 로그인 활성화 (확인됨: `email=true`)
  - [ ] 소셜 로그인 1종 (Google 또는 Apple) — 선택, 미적용
  - [ ] 🖐 수동 — **Redirect/Site URLs**에 로컬·프리뷰 URL 등록 (이메일 확인 링크용)
    - `exp://localhost:8081` (Expo Go)
    - `http://localhost:8081` (웹 로컬)
    - `https://<github-username>.github.io/Shoe-Store-Simulator/**` (GitHub Pages 프리뷰)
- [x] 로그인/회원가입 화면 (`app/(auth)/login.tsx`, `signup.tsx`)
- [x] 세션 유지 — 앱 재실행 시 자동 로그인 (AsyncStorage `persistSession`)
- [x] 전역 인증 상태 (`store/authStore.ts`) + 앱 로딩 게이트 (`app/_layout.tsx`)
- [x] `api/client.ts` 요청 인터셉터에 액세스 토큰 주입
- [x] 마이페이지에 로그인 유저 정보·로그아웃 연결
- [x] 비로그인 시 주문(결제) 동작은 로그인 유도 (`app/checkout/index.tsx`)

---

## B. CI/CD 파이프라인 (GitHub Actions)

### B-1. GitHub Secrets 등록  🖐 수동

저장소 → **Settings → Secrets and variables → Actions** 에 추가:

| Secret | 용도 |
|--------|------|
| `EXPO_PUBLIC_SUPABASE_URL` | `https://xpkltycmkloeshwcvqck.supabase.co` |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | publishable key (`sb_publishable_...`) |
| `EXPO_PUBLIC_API_BASE_URL` | (선택) 백엔드 API URL |

> Service Role Key(`sb_secret_...`)는 **절대** Secrets·앱·커밋에 넣지 않는다. publishable key만 사용.
> Secrets 미등록 시 `verify`의 Supabase step과 `preview` 빌드가 실패한다.

### B-2. `verify.yml` 확장

파일: `.github/workflows/verify.yml`

- [x] `dev` 브랜치 push/PR 시 자동 실행 (`main`, `dev`)
- [x] Supabase step에 `EXPO_PUBLIC_SUPABASE_*` env 주입 (`secrets` 참조)
- [x] `scripts/verify-supabase.mjs` 추가 — Auth 엔드포인트 연결 스모크 테스트
- [x] verify job에 **Supabase 연결 검증** step 추가
- [ ] 🖐 수동 — push 후 Actions 탭에서 초록 체크 확인 (Secrets 등록 후)

### B-3. `preview.yml` 신규 (GitHub Pages 웹 프리뷰)

파일: `.github/workflows/preview.yml`

- [x] 트리거: `dev` push + `workflow_dispatch` 수동 실행
- [x] `npm ci` → `npx expo export -p web` (Secrets로 env 주입)
- [x] 공식 Pages 액션(`upload-pages-artifact` + `deploy-pages`)으로 `dist/` 배포 (peaceiris 대신 공식 액션 사용)
- [x] SPA 폴백 `404.html` + `.nojekyll` 생성
- [x] `app.json`에 GitHub Pages **baseUrl** 설정 (`/Shoe-Store-Simulator`)
- [x] 배포 URL: `https://<github-username>.github.io/Shoe-Store-Simulator/`
- [ ] 🖐 수동 — 저장소 **Settings → Pages → Source: GitHub Actions** 활성화
- [ ] 🖐 수동 — 프리뷰에서 로그인/회원가입·마이페이지 세션 UI 확인

> 빌드 메모: `output: "static"`(프리렌더)는 reanimated/supabase가 빌드 시 `window`를 참조해 실패 → `output: "single"`(SPA)로 결정 (`docs/ADR.md` ADR-007).

### B-4. `package.json` 스크립트 정리

- [x] `"verify"`: `type-check` + `lint`
- [x] `"verify:supabase"`: `node --env-file-if-exists=.env scripts/verify-supabase.mjs`
- [x] `"export:web"`: `expo export -p web`

---

## C. 로컬 ↔ GitHub 동작 일치 확인

| 확인 항목 | 로컬 | GitHub |
|-----------|------|--------|
| type-check + lint | `npm run verify` ✅ | Actions `verify` job |
| Supabase 연결 | `npm run verify:supabase` ✅ | Actions Supabase step |
| 로그인 UI | `npx expo start --web` | GitHub Pages 프리뷰 URL |
| 세션 유지 | 앱 재실행 | 웹: 새로고침 후 세션 |

---

## 완료 조건

- [ ] 🖐 로그인 → 앱/웹 재실행(새로고침) 후에도 세션 유지 (실기기/프리뷰 확인)
- [ ] 🖐 로그인 상태에서 API 요청에 토큰이 실려 나감 (백엔드 연동 후 확인)
- [x] `npm run verify` 통과
- [ ] 🖐 `dev` push 시 Actions `verify` **초록** (Secrets 등록 후)
- [ ] 🖐 `dev` push 시 GitHub Pages 프리뷰 URL에서 로그인 화면·마이페이지 확인
- [x] 시크릿 키가 앱 코드·커밋에 노출되지 않음 (publishable key + `.env` gitignore + GitHub Secrets)

---

## 다음 Phase

→ `phases/phase-03-designs.md` (디자인 저장/갤러리, `custom_designs`)

---

## 참고

- 결정은 `docs/ADR.md`에 ADR로 기록 (세션 저장소·baseUrl → ADR-007)
- Supabase 테이블 구조: `CLAUDE.md` "테스트 환경 구성" 참조
- CI 워크플로: `.github/workflows/verify.yml`, `.github/workflows/preview.yml`
- **Expo SDK 54** — `baseUrl`, web export는 구현 전 `AGENTS.md` 문서 링크 확인
- GitHub Pages가 404면: Pages Source 설정, `baseUrl` 저장소명 일치, `dist` 산출물 경로 확인
