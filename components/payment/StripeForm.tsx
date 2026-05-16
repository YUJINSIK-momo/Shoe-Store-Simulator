import { View, Text, StyleSheet } from "react-native"
import Button from "../ui/Button"

interface StripeFormProps {
  amount: number
  onSuccess: (paymentMethodId: string) => void
}

export default function StripeForm({ amount, onSuccess }: StripeFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>카드 결제</Text>
      <Text style={styles.amount}>{amount.toLocaleString()}원</Text>
      <Text style={styles.placeholder}>Stripe SDK 카드 폼 (연동 예정)</Text>
      <Button
        label="카드로 결제"
        onPress={() => onSuccess("mock_payment_method")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  amount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
  },
  placeholder: {
    fontSize: 13,
    color: "#888888",
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 8,
    textAlign: "center",
  },
})
