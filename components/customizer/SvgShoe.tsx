import Svg, { Path, Rect, Ellipse, Line, G } from "react-native-svg"
import { PartsConfig } from "../../types/shoe"

interface SvgShoeProps {
  partsConfig: PartsConfig
  width: number
}

// 부위별 색이 실제로 칠해지는 스타일라이즈드 측면 스니커즈.
// (소재 텍스처 반영은 phase-05 후속 단계)
export default function SvgShoe({ partsConfig, width }: SvgShoeProps) {
  const height = width * 0.6
  const upper = partsConfig.upper.color
  const outsole = partsConfig.outsole.color
  const laces = partsConfig.laces.color
  const insole = partsConfig.insole.color
  const logo = partsConfig.logo.color

  return (
    <Svg width={width} height={height} viewBox="0 0 300 180">
      {/* 바닥 그림자 */}
      <Ellipse cx={155} cy={170} rx={120} ry={7} fill="#000000" opacity={0.06} />

      {/* 갑피 (upper) */}
      <Path
        d="M40,148 C40,96 78,70 150,70 C210,70 250,96 268,140 C270,146 266,149 260,149 L46,149 C42,149 40,148 40,148 Z"
        fill={upper}
        stroke="#00000022"
        strokeWidth={1.5}
      />

      {/* 발목 입구 (insole 컬러로 표현) */}
      <Ellipse cx={78} cy={88} rx={19} ry={11} fill={insole} stroke="#00000022" strokeWidth={1.2} />

      {/* 신발끈 (laces) */}
      <G stroke={laces} strokeWidth={5} strokeLinecap="round">
        <Line x1={110} y1={100} x2={140} y2={90} />
        <Line x1={116} y1={110} x2={146} y2={100} />
        <Line x1={122} y1={120} x2={152} y2={110} />
      </G>

      {/* 로고 (side swoosh) */}
      <Path
        d="M176,131 C198,118 222,116 237,120 C224,127 204,131 183,137 Z"
        fill={logo}
      />

      {/* 밑창 (outsole) */}
      <Rect
        x={18}
        y={146}
        width={266}
        height={24}
        rx={12}
        fill={outsole}
        stroke="#00000022"
        strokeWidth={1.5}
      />
    </Svg>
  )
}
