import { View, Text, StyleSheet, useWindowDimensions } from "react-native"
import SvgShoe from "./SvgShoe"
import { PartsConfig } from "../../types/shoe"

// 웹에서는 창 전체폭이 아니라 앱 프레임(최대 480)에 맞춘다
const MAX_FRAME = 480

interface ShoeViewerProps {
  partsConfig: PartsConfig
}

export default function ShoeViewer({ partsConfig }: ShoeViewerProps) {
  const { width: winWidth } = useWindowDimensions()
  const shoeWidth = Math.min(winWidth, MAX_FRAME) * 0.86

  return (
    <View style={styles.container}>
      <View style={styles.stage}>
        <SvgShoe partsConfig={partsConfig} width={shoeWidth} />
      </View>
      <Text style={styles.hint}>색상을 바꾸면 신발에 바로 반영돼요</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
  },
  stage: {
    alignItems: "center",
    justifyContent: "center",
  },
  hint: {
    fontSize: 12,
    color: "#BBBBBB",
    marginTop: 6,
  },
})
