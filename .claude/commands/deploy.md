---
description: 빌드 검증 → 커밋 → 푸쉬 자동화
---

다음 순서를 **순차적으로** 실행해줘. 한 단계라도 실패하면 멈추고 사용자에게 보고.

## 1. 검증 (type-check + lint)
```bash
npm run verify
```
실패 시: 에러 내용 보고하고 종료. (Expo 앱이라 별도 build 단계는 없다)

## 2. 변경사항 확인
```bash
git status
git diff --stat
```

스테이지되지 않은 변경이 있으면 사용자에게 어떤 파일을 커밋할지 확인.

## 3. 커밋

CLAUDE.md의 커밋 규칙을 따라 한글 메시지로 작성:

- `feat:` 기능 추가
- `fix:` 버그 수정
- `style:` UI 수정
- `refactor:` 코드 개선
- `docs:` 문서
- `chore:` 설정
- `build:` 빌드/배포

메시지 형식: `prefix: 한 줄 요약 (50자 이내)`

## 4. 푸쉬
```bash
git push origin <현재 브랜치>
```
- 작업은 보통 `dev` 브랜치에서 진행한다. 현재 브랜치를 확인하고 그 브랜치로 푸쉬.
- `main` 푸쉬가 필요하면 사용자에게 먼저 확인.

## 5. 앱 배포 (선택, 사용자 요청 시에만)

TestFlight 배포는 EAS를 통한다. 사용자가 명시적으로 요청할 때만:
```bash
eas build --platform ios --profile preview
eas submit --platform ios --latest
```

**금지 사항**: `--force`, `--no-verify`, `-f` 옵션은 절대 사용하지 않는다. 커밋/푸쉬/배포는 사용자 허락 전에는 하지 않는다.
