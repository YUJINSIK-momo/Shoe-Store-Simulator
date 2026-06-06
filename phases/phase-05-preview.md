# Phase 05 — 실시간 색상/소재 반영 미리보기 (2D → 3D)

## 목표 / 배경

기존 뷰어는 신발 사진(PNG) 위에 색상 뱃지만 얹어, 색·소재를 바꿔도 신발이 안 바뀌었다.
부위별 색이 **실제로 칠해지는** 미리보기로 바꾸고, 나아가 **3D로 돌려보며** 커스터마이즈한다.

## A. 색상 실시간 반영 (완료)

- [x] 1차: `SvgShoe`(2D 벡터)로 부위별 `fill` 적용 — 색 변경 즉시 반영 (현재는 3D로 대체, 2D 폴백으로 보존)
- [x] 2차: **3D 전환** — 색 변경이 3D 신발에 즉시 반영

## B. 3D 파이프라인 (완료 — 플레이스홀더)

- [x] `react-three-fiber@9` + `three` + `expo-gl` 도입 (웹/네이티브)
- [x] `three/ThreeCanvas.tsx`(웹) / `.native.tsx`(네이티브) Canvas 분기 (Metro 플랫폼 해석)
- [x] `three/Shoe3D.tsx` — 원시 도형으로 조립한 신발, 부위별 `meshStandardMaterial` 색 = `partsConfig`
- [x] `ShoeViewer` — Canvas + 라이트 + **드래그 회전 + 미조작 시 자동 회전**
- [x] 480 프레임 클램프 유지 (웹 과대 방지)

## C. 정교화 (다음)

- [ ] **진짜 신발 GLB 모델**로 교체 (부위 분리·명명된 메쉬/머티리얼) → 사실적 외형
- [ ] 소재(가죽/스웨이드/메쉬/캔버스) 시각 차이: PBR 텍스처·러프니스/메탈니스 또는 노멀맵
- [ ] 선택 부위 하이라이트(편집 중 부위 강조)
- [ ] 성능: 저사양 기기 프레임·번들 최적화 (three는 번들 큼)

## 완료 조건

- [x] 부위 색을 바꾸면 미리보기가 즉시 바뀐다 (3D)
- [x] 드래그로 돌려볼 수 있다
- [x] 웹/모바일 모두 프레임에 맞게 표시 (`npm run verify` + 웹 빌드 통과)
- [ ] 진짜 GLB 모델 적용 (C)
- [ ] 소재가 시각적으로 구분된다 (C)

## 참고

- 결정: `docs/ADR.md` ADR-010(2D SVG 재색칠), ADR-011(3D react-three-fiber)
- GLB 교체 시: 모델 메쉬/머티리얼 이름을 부위(upper/outsole/laces/insole/logo)에 매핑해 색 적용
- `assets/shoes/mockup_*.png`(목업)·`SvgShoe.tsx`(2D)는 삭제하지 않고 보존
- 색 상태 단일 소스: `store/customizeStore.ts` `partsConfig`
