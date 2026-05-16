import { View, Text, StyleSheet } from "react-native"
import Button from "../ui/Button"

interface CartSummaryProps {
  totalPrice: number
  onCheckout: () => void
}

export default function CartSummary({ totalPrice, onCheckout }: CartSummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>상품 금액</Text>
        <Text style={styles.value}>{totalPrice.toLocaleString()}원</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>배송비</Text>
        <Text style={styles.value}>무료</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>총 결제 금액</Text>
        <Text style={styles.totalValue}>{totalPrice.toLocaleString()}원</Text>
      </View>
      <Button label="주문하기" onPress={onCheckout} style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#888888",
  },
  value: {
    fontSize: 14,
    color: "#111111",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  button: {
    marginTop: 16,
  },
})
