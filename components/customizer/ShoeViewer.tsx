import { Suspense, useRef } from "react"
import { View, Text, StyleSheet, useWindowDimensions } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { Canvas } from "./three/ThreeCanvas"
import SneakerModel from "./three/SneakerModel"
import { ShoeRotation } from "./three/Shoe3D"
import { PartsConfig } from "../../types/shoe"

// 웹에서는 창 전체폭이 아니라 앱 프레임(최대 480)에 맞춘다
const MAX_FRAME = 480

interface ShoeViewerProps {
  partsConfig: PartsConfig
}

export default function ShoeViewer({ partsConfig }: ShoeViewerProps) {
  const { width: winWidth } = useWindowDimensions()
  const stageWidth = Math.min(winWidth, MAX_FRAME) * 0.9
  const stageHeight = stageWidth * 0.8

  const rotationRef = useRef<ShoeRotation>({ y: 0.6, auto: true })
  const startY = useRef(0)

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
          <Canvas camera={{ position: [0, 0.6, 6], fov: 40 }}>
            <Suspense fallback={null}>
              <SneakerModel partsConfig={partsConfig} rotationRef={rotationRef} />
            </Suspense>
          </Canvas>
        </View>
      </GestureDetector>
      <Text style={styles.hint}>드래그로 돌려보고, 부위 색을 바꾸면 반영돼요</Text>
      <Text style={styles.credit}>3D: “Sneakers” by Poly by Google (CC-BY)</Text>
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
  credit: {
    fontSize: 10,
    color: "#CCCCCC",
    marginTop: 2,
  },
})
