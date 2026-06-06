import { useRef } from "react"
import { View, Text, StyleSheet, useWindowDimensions } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { Canvas } from "./three/ThreeCanvas"
import Shoe3D, { ShoeRotation } from "./three/Shoe3D"
import { PartsConfig } from "../../types/shoe"

// 웹에서는 창 전체폭이 아니라 앱 프레임(최대 480)에 맞춘다
const MAX_FRAME = 480

interface ShoeViewerProps {
  partsConfig: PartsConfig
}

export default function ShoeViewer({ partsConfig }: ShoeViewerProps) {
  const { width: winWidth } = useWindowDimensions()
  const stageWidth = Math.min(winWidth, MAX_FRAME) * 0.9
  const stageHeight = stageWidth * 0.78

  const rotationRef = useRef<ShoeRotation>({ y: 0.6, auto: true })
  const startY = useRef(0)

  // 드래그로 회전 (JS 스레드에서 ref 갱신 — runOnJS)
  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      startY.current = rotationRef.current.y
      rotationRef.current.auto = false
    })
    .onUpdate((e) => {
      rotationRef.current.y = startY.current + e.translationX * 0.01
    })

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <View style={{ width: stageWidth, height: stageHeight }}>
          <Canvas camera={{ position: [0, 0.7, 5.5], fov: 42 }}>
            <Shoe3D partsConfig={partsConfig} rotationRef={rotationRef} />
          </Canvas>
        </View>
      </GestureDetector>
      <Text style={styles.hint}>드래그로 돌려보고, 색을 바꾸면 바로 반영돼요</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
  },
  hint: {
    fontSize: 12,
    color: "#BBBBBB",
    marginTop: 6,
  },
})
