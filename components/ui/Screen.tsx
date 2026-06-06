import { ReactNode } from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface ScreenProps {
  children: ReactNode
  style?: ViewStyle
}

// 모든 화면의 공통 스캐폴드: SafeArea + 일관된 배경색
export default function Screen({ children, style }: ScreenProps) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
})
