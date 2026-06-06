# UI Guide

> **목적**: Claude가 만든 UI가 톤·간격·색상 면에서 어긋나지 않게 잡아주는 가이드.
> RN `StyleSheet.create()` 기준. Tailwind를 쓰지 않는다.

---

## 디자인 톤

미니멀 흑백 + 화이트 배경. 강조는 검정/포인트 컬러로만. 화려한 색·그림자 남발 금지.

## 색상 토큰

기존 코드에서 실제 쓰이는 값. 새 화면도 이 팔레트를 따른다.

| 용도 | 값 | 비고 |
|------|------|------|
| Page BG | `#FAFAFA` | 모든 화면 SafeAreaView 배경 |
| Surface / Card BG | `#FFFFFF` | 카드·리스트 행·프로필 |
| Ink (Primary 액션) | `#000000` | 배너·주요 버튼·활성 탭 |
| Text Primary | `#111111` | 제목·본문 강조 |
| Text Secondary | `#888888` | 부제·라벨 |
| Text Tertiary / Muted | `#AAAAAA` `#BBBBBB` | 힌트·캡션 |
| Divider / Border | `#F0F0F0` `#F5F5F5` `#EEEEEE` | 경계선·비활성 칩 |
| Border (옅은 색 위) | `#DDDDDD` | 흰색 스와치 테두리 |
| Toss 결제 | `#0064FF` | TossButton 전용 |

> 기능 색(성공/경고/에러)이 필요하면 도입 시 이 표에 추가하고 ADR로 근거를 남긴다.

## 간격 (spacing)

| 용도 | 값 |
|------|------|
| 페이지 좌우 패딩 | `paddingHorizontal: 20` |
| 페이지 제목 패딩 | `padding: 20` |
| 섹션 라벨 위/아래 | `marginTop: 16`, `marginBottom: 10` |
| 요소 간 gap | `gap: 6 / 8 / 16` |
| 카드 패딩 | `padding: 24`(큰 배너) / `18`(리스트 행) |

## 모서리 (radius)

| 용도 | 값 |
|------|------|
| 칩/탭 | `borderRadius: 20` |
| 버튼/카드 | `borderRadius: 12` |
| 이미지 래퍼 | `borderRadius: 20` |
| 아바타/원형 스와치 | `borderRadius: 반지름` (원형) |

## 텍스트 위계

| 용도 | 스타일 |
|------|--------|
| 홈 대제목 (H1) | `fontSize: 28, fontWeight: "800", color: "#111111"` |
| 화면 제목 (H2) | `fontSize: 22, fontWeight: "700", color: "#111111"` |
| 금액 강조 | `fontSize: 32, fontWeight: "800", color: "#000000"` |
| 섹션 라벨 | `fontSize: 13, fontWeight: "600", color: "#888888", textTransform: "uppercase", letterSpacing: 0.5` |
| 본문 | `fontSize: 14~15, color: "#888888"` (강조 시 `#111111`) |
| 캡션/힌트 | `fontSize: 11~13, color: "#BBBBBB"` |

## 컴포넌트 패턴

- 화면 루트는 항상 `SafeAreaView`(react-native-safe-area-context) + `backgroundColor: "#FAFAFA"`
- 재사용 UI는 `components/ui/`(Button, Card, Badge)를 먼저 쓴다. 없으면 거기에 추가.
- 버튼 변형: 기본(검정 채움) / `variant="outline"`(테두리). Button 컴포넌트 props로 제어.
- 터치 요소 최소 높이 ~44pt 확보 (`paddingVertical` 14 내외)
- 스타일은 컴포넌트 하단 `StyleSheet.create()`에. 인라인 스타일은 동적 값(색상 등)에만.

## 모션

- 뷰어 전환은 reanimated `withTiming`(120~180ms) / 제스처는 `withSpring`
- 과한 애니메이션 금지 (200ms 내외, 짧게)
