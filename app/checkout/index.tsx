import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { useCartStore } from "../../store/cartStore"
import { useAuthStore } from "../../store/authStore"
import TossButton from "../../components/payment/TossButton"
import Button from "../../components/ui/Button"

export default function CheckoutScreen() {
  const router = useRouter()
  const { totalPrice } = useCartStore()
  const user = useAuthStore((s) => s.user)

  const handlePayment = () => {
    router.push("/checkout/complete")
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.title}>결제</Text>
        <View style={styles.gate}>
          <Text style={styles.gateTitle}>로그인이 필요해요</Text>
          <Text style={styles.gateText}>
            주문을 진행하려면 먼저 로그인하세요
          </Text>
          <Button
            label="로그인하러 가기"
            onPress={() => router.push("/login")}
            style={styles.gateButton}
          />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>결제</Text>
      <View style={styles.content}>
        <Text style={styles.amount}>{totalPrice().toLocaleString()}원</Text>
        <Text style={styles.label}>결제 수단을 선택하세요</Text>
        <TossButton onPress={handlePayment} />
        <Button label="카드로 결제" onPress={handlePayment} variant="outline" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111111",
    padding: 20,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  amount: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: "#888888",
    marginBottom: 8,
  },
  gate: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 32,
  },
  gateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
  },
  gateText: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
  },
  gateButton: {
    marginTop: 12,
    alignSelf: "stretch",
  },
})
