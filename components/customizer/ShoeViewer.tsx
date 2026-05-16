import { useState } from "react"
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { PartsConfig } from "../../types/shoe"

const { width } = Dimensions.get("window")

const VIEWS = [
  { key: "side", label: "측면", source: require("../../assets/shoes/mockup_side.png") },
  { key: "front", label: "정면", source: require("../../assets/shoes/mockup_front.png") },
  { key: "back", label: "후면", source: require("../../assets/shoes/mockup_back.png") },
  { key: "top", label: "상단", source: require("../../assets/shoes/mockup_top.png") },
] as const

interface ShoeViewerProps {
  partsConfig: PartsConfig
}

export default function ShoeViewer({ partsConfig }: ShoeViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const opacity = useSharedValue(1)
  const translateX = useSharedValue(0)

  const switchTo = (nextIndex: number) => {
    opacity.value = withTiming(0, { duration: 120 }, () => {
      runOnJS(setCurrentIndex)(nextIndex)
      opacity.value = withTiming(1, { duration: 180 })
    })
  }

  const goNext = () => switchTo((currentIndex + 1) % VIEWS.length)
  const goPrev = () => switchTo((currentIndex - 1 + VIEWS.length) % VIEWS.length)

  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((e) => {
      translateX.value = e.translationX * 0.15
    })
    .onEnd((e) => {
      translateX.value = withSpring(0)
      if (e.translationX < -40) runOnJS(goNext)()
      else if (e.translationX > 40) runOnJS(goPrev)()
    })

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }))

  return (
    <View style={styles.container}>
      <GestureDetector gesture={swipeGesture}>
        <Animated.View style={[styles.imageWrapper, animatedStyle]}>
          <Image
            source={VIEWS[currentIndex].source}
            style={styles.image}
            resizeMode="contain"
          />
          {/* 선택된 색상 미리보기 뱃지 */}
          <View style={styles.colorBadges}>
            <ColorBadge label="갑피" color={partsConfig.upper.color} />
            <ColorBadge label="밑창" color={partsConfig.outsole.color} />
            <ColorBadge label="끈" color={partsConfig.laces.color} />
          </View>
        </Animated.View>
      </GestureDetector>

      {/* 각도 선택 탭 */}
      <View style={styles.tabs}>
        {VIEWS.map((view, i) => (
          <TouchableOpacity
            key={view.key}
            style={[styles.tab, i === currentIndex && styles.activeTab]}
            onPress={() => switchTo(i)}
          >
            <Text style={[styles.tabLabel, i === currentIndex && styles.activeTabLabel]}>
              {view.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.hint}>← 스와이프로 각도 전환</Text>
    </View>
  )
}

function ColorBadge({ label, color }: { label: string; color: string }) {
  const isWhite = color.toUpperCase() === "#FFFFFF"
  return (
    <View style={styles.badge}>
      <View
        style={[
          styles.badgeColor,
          { backgroundColor: color },
          isWhite && styles.badgeColorBorder,
        ]}
      />
      <Text style={styles.badgeLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageWrapper: {
    width: width * 0.88,
    height: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "90%",
    height: "90%",
  },
  colorBadges: {
    position: "absolute",
    bottom: 10,
    right: 12,
    gap: 6,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  badgeColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  badgeColorBorder: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  badgeLabel: {
    fontSize: 11,
    color: "#555555",
    fontWeight: "500",
  },
  tabs: {
    flexDirection: "row",
    marginTop: 12,
    gap: 6,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
  activeTab: {
    backgroundColor: "#111111",
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888888",
  },
  activeTabLabel: {
    color: "#FFFFFF",
  },
  hint: {
    fontSize: 11,
    color: "#BBBBBB",
    marginTop: 6,
  },
})
