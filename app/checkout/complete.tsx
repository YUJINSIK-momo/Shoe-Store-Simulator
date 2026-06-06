import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import Screen from "../../components/ui/Screen"
import Button from "../../components/ui/Button"
import { useCartStore } from "../../store/cartStore"

export default function CheckoutCompleteScreen() {
  const router = useRouter()
  const { clearCart } = useCartStore()

  const handleDone = () => {
    clearCart()
    router.replace("/(tabs)")
  }

  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.icon}>✓</Text>
        <Text style={styles.title}>결제 완료!</Text>
        <Text style={styles.subtitle}>
          주문이 접수되었습니다.{"\n"}제작이 시작되면 알림을 드릴게요.
        </Text>
        <Button label="홈으로 돌아가기" onPress={handleDone} style={styles.button} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111111",
  },
  subtitle: {
    fontSize: 15,
    color: "#888888",
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    marginTop: 16,
    width: "100%",
  },
})
