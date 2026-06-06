import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import Card from "../../components/ui/Card"

export default function HomeScreen() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>신발 커스터마이저</Text>
        <Text style={styles.subtitle}>나만의 신발을 디자인하세요</Text>
        <TouchableOpacity activeOpacity={0.85} onPress={() => router.push("/customize")}>
          <Card style={styles.banner}>
            <Text style={styles.bannerTitle}>새 커스텀 시작하기</Text>
            <Text style={styles.bannerText}>
              원하는 신발 모델을 선택하고{"\n"}색상과 소재를 자유롭게 바꿔보세요
            </Text>
            <Text style={styles.bannerCta}>시작하기 →</Text>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scroll: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#888888",
    marginBottom: 24,
  },
  banner: {
    backgroundColor: "#000000",
    padding: 24,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 14,
    color: "#AAAAAA",
    lineHeight: 22,
  },
  bannerCta: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 16,
  },
})
