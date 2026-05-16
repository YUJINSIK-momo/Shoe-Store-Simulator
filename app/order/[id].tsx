import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router"
import { OrderStatus } from "../../types/order"

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "주문 접수",
  confirmed: "주문 확인",
  manufacturing: "제작 중",
  shipping: "배송 중",
  delivered: "배송 완료",
}

const STATUS_ORDER: OrderStatus[] = [
  "pending",
  "confirmed",
  "manufacturing",
  "shipping",
  "delivered",
]

export default function OrderTrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const currentStatus: OrderStatus = "manufacturing"

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>주문 추적</Text>
      <Text style={styles.orderId}>주문번호: {id}</Text>
      <View style={styles.timeline}>
        {STATUS_ORDER.map((status, index) => {
          const isCompleted =
            STATUS_ORDER.indexOf(currentStatus) >= index
          return (
            <View key={status} style={styles.step}>
              <View style={[styles.dot, isCompleted && styles.activeDot]} />
              <Text
                style={[styles.stepLabel, isCompleted && styles.activeLabel]}
              >
                {STATUS_LABELS[status]}
              </Text>
            </View>
          )
        })}
      </View>
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
    marginBottom: 4,
  },
  orderId: {
    fontSize: 13,
    color: "#888888",
    marginBottom: 32,
  },
  timeline: {
    gap: 24,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#DDDDDD",
  },
  activeDot: {
    backgroundColor: "#000000",
  },
  stepLabel: {
    fontSize: 15,
    color: "#AAAAAA",
  },
  activeLabel: {
    color: "#111111",
    fontWeight: "600",
  },
})
