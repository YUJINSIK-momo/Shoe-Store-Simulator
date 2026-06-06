import { Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router"

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>신발 상세</Text>
      <Text style={styles.id}>ID: {id}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 8,
  },
  id: {
    fontSize: 14,
    color: "#888888",
  },
})
