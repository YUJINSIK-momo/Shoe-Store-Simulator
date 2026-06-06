import { ReactNode } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface ScreenHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
  right?: ReactNode
}

// 전 화면 공통 헤더: (뒤로가기) 제목·부제 (우측 액션)
export default function ScreenHeader({
  title,
  subtitle,
  onBack,
  right,
}: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.back} hitSlop={8}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      )}
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {right && <View style={styles.right}>{right}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 8,
  },
  back: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
  },
  backIcon: {
    fontSize: 30,
    lineHeight: 32,
    color: "#111111",
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111111",
  },
  subtitle: {
    fontSize: 13,
    color: "#AAAAAA",
    marginTop: 2,
  },
  right: {
    marginLeft: "auto",
  },
})
