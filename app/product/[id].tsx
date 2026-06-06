import { Text, StyleSheet } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import Screen from "../../components/ui/Screen"
import ScreenHeader from "../../components/ui/ScreenHeader"

export default function ProductDetailScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <Screen>
      <ScreenHeader title="신발 상세" onBack={() => router.back()} />
      <Text style={styles.id}>ID: {id}</Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
  id: {
    fontSize: 14,
    color: "#888888",
    paddingHorizontal: 20,
  },
})
