import { useEffect } from "react"
import { Stack, useRouter, useSegments } from "expo-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { useAuthStore } from "../store/authStore"

const queryClient = new QueryClient()

function RootNavigator() {
  const router = useRouter()
  const segments = useSegments()
  const session = useAuthStore((s) => s.session)
  const initializing = useAuthStore((s) => s.initializing)
  const init = useAuthStore((s) => s.init)

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    if (initializing) return
    // 로그인 상태로 인증 화면에 남아 있으면 홈으로 보낸다.
    // (둘러보기·커스터마이징은 비로그인도 허용 — 로그인은 주문 시점에 요구)
    const inAuthGroup = segments[0] === "(auth)"
    if (session && inAuthGroup) router.replace("/")
  }, [session, initializing, segments, router])

  if (initializing) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    )
  }

  return <Stack screenOptions={{ headerShown: false }} />
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
})
