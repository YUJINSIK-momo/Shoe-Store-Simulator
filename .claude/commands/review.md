---
description: 현재 변경사항을 코드 리뷰
---

현재 작업 디렉터리의 `git diff`를 먼저 확인한 뒤,
다음 4가지 관점에서 리뷰해줘:

1. **TypeScript 타입** — `any` 사용, 타입 누락, 잘못된 추론
2. **렌더링 성능** — 불필요한 재렌더링, 누락된 메모이제이션, FlatList key
3. **모바일 UX·접근성** — SafeArea 처리, 터치 영역(최소 44pt), 레이아웃 깨짐, 색 대비
4. **보안** — 시크릿 키 노출(`EXPO_PUBLIC_` 오용), 민감 정보 로깅, 인증·인가 누락

## 출력 형식

각 발견 사항은 다음 형식으로:

```
🔴 Critical — app/(tabs)/customize.tsx:42
  설명: ...
  제안: ...

🟡 Warning — components/customizer/ShoeViewer.tsx:15
  설명: ...

🟢 Suggestion — store/cartStore.ts:7
  설명: ...
```

## 제외 사항

- 들여쓰기·세미콜론 같은 스타일은 lint가 잡으므로 생략
- "더 좋은 이름" 같은 주관적 의견은 명백한 경우만
