import { View, StyleSheet, Dimensions } from "react-native"
import Svg, { Ellipse, Path, Rect } from "react-native-svg"
import { PartsConfig } from "../../types/shoe"

const { width } = Dimensions.get("window")
const VIEWER_SIZE = width * 0.9

interface ShoeViewerProps {
  partsConfig: PartsConfig
}

export default function ShoeViewer({ partsConfig }: ShoeViewerProps) {
  return (
    <View style={styles.container}>
      <Svg
        width={VIEWER_SIZE}
        height={VIEWER_SIZE * 0.6}
        viewBox="0 0 400 240"
      >
        {/* 밑창 */}
        <Ellipse
          cx="200"
          cy="210"
          rx="170"
          ry="24"
          fill={partsConfig.outsole.color}
          stroke="#CCCCCC"
          strokeWidth="1"
        />
        {/* 갑피 */}
        <Path
          d="M 50 190 Q 80 120 160 100 Q 240 80 320 110 Q 360 130 360 170 Q 340 190 300 195 L 70 200 Z"
          fill={partsConfig.upper.color}
          stroke="#CCCCCC"
          strokeWidth="1"
        />
        {/* 안창 */}
        <Ellipse
          cx="200"
          cy="192"
          rx="140"
          ry="12"
          fill={partsConfig.insole.color}
          opacity={0.6}
        />
        {/* 신발끈 */}
        {[0, 1, 2, 3, 4].map((i) => (
          <Rect
            key={i}
            x={140 + i * 26}
            y={140}
            width={18}
            height={6}
            rx={3}
            fill={partsConfig.laces.color}
          />
        ))}
        {/* 로고 */}
        <Ellipse
          cx="100"
          cy="155"
          rx="18"
          ry="10"
          fill={partsConfig.logo.color}
          opacity={0.85}
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
})
