# 신발 커스텀 시뮬레이터 (shoe-customizer)

신발의 부위별 색상·소재를 직접 커스터마이징하고, 실시간으로 미리 본 뒤
장바구니 → 주문 → 결제까지 진행하는 React Native(Expo) 모바일 앱.

> ⚠️ **이 폴더가 프로젝트·git 루트입니다.** 상위 폴더명에 한글이 있어
> Expo 도구가 거기서는 동작하지 않습니다. 모든 명령은 `shoe-customizer/`에서 실행하세요.
> Claude Code도 이 폴더에서 여는 것을 권장합니다. (배경: `docs/ADR.md` ADR-005)

---

## 기술 스택

- **Expo SDK 54** / **React Native 0.81** / **TypeScript**
- **Expo Router** (파일 기반 라우팅)
- **Zustand** (로컬 상태) · **TanStack Query** (서버 상태) · **axios**
- **react-native-svg** · **reanimated** · **gesture-handler** (2D 뷰어)
- **Supabase** (DB/Auth/Storage, 연동 예정)
- 결제: **토스페이먼츠** / **Stripe** (예정)

## 시작하기

```bash
cd shoe-customizer
npm install --legacy-peer-deps   # React 19/RN 0.81 peer 충돌 회피
npm start                        # Expo 개발 서버 (i: iOS, a: Android)
```

`.env`는 `.env.example`을 복사해 채운다 (`EXPO_PUBLIC_` 공개키만, 시크릿 금지).

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm start` | Expo 개발 서버 |
| `npm run type-check` | `tsc --noEmit` |
| `npm run lint` | `expo lint` |
| `npm run verify` | type-check + lint (= "완료의 정의") |

## 문서

| 파일 | 내용 |
|------|------|
| `CLAUDE.md` | 프로젝트 헌법 (전체 사양·플로우·인프라) |
| `docs/PRD.md` | 무엇을 만드는가 |
| `docs/ARCHITECTURE.md` | 폴더 구조·데이터 흐름 |
| `docs/ADR.md` | 주요 결정과 근거 |
| `docs/UI_GUIDE.md` | 색상 토큰·간격·텍스트 위계 |
| `phases/` | 단계별 작업 명세 (01 셋업 → 02 인증 …) |

## Claude Code 슬래시 명령

- `/review` — 현재 변경 코드 리뷰
- `/deploy` — verify → 커밋 → 푸쉬
- `/phase <할 일>` — 목표를 phase 문서로 만들고 진행

## 검증 자동화

- **Stop hook**: 작업 종료 시 `npm run verify` 자동 실행 (`.claude/settings.json`)
- **CI**: `main`/`dev` push·PR 시 `.github/workflows/verify.yml`이 type-check + lint
- **배포 CI**: `main` push 시 `.github/workflows/eas-build.yml`이 EAS 빌드 → TestFlight
