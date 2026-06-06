import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import Screen from "../../components/ui/Screen"
import ScreenHeader from "../../components/ui/ScreenHeader"
import Card from "../../components/ui/Card"

export default function HomeScreen() {
  const router = useRouter()

  return (
    <Screen>
      <ScreenHeader title="신발 커스터마이저" subtitle="나만의 신발을 디자인하세요" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => router.push("/customize")}>
          <Card style={styles.banner}>
            <Text style={styles.bannerTitle}>새 커스텀 시작하기</Text>
            <Text style={styles.bannerText}>
              원하는 신발 모델을 선택하고{"\n"}색상과 소재를 자유롭게 바꿔보세요
            </Text>
            <Text style={styles.bannerCta}>시작하기 →</Text>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} onPress={() => router.push("/designs")}>
          <Card style={styles.subCard}>
            <Text style={styles.subCardTitle}>저장된 디자인</Text>
            <Text style={styles.subCardText}>내가 만든 커스텀을 다시 보고 불러오기</Text>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
    gap: 12,
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
  subCard: {
    padding: 20,
  },
  subCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 4,
  },
  subCardText: {
    fontSize: 13,
    color: "#888888",
  },
})
