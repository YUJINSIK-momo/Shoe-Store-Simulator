import { View, Text, StyleSheet, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { useCartStore } from "../../store/cartStore"
import CartItemComponent from "../../components/cart/CartItem"
import CartSummary from "../../components/cart/CartSummary"

export default function CartScreen() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>장바구니가 비었어요</Text>
          <Text style={styles.emptyText}>커스텀 탭에서 신발을 디자인해보세요</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>장바구니</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.design.id}
        renderItem={({ item }) => (
          <CartItemComponent
            item={item}
            onRemove={() => removeItem(item.design.id)}
            onUpdateQuantity={(q) => updateQuantity(item.design.id, q)}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <CartSummary
        totalPrice={totalPrice()}
        onCheckout={() => router.push("/checkout")}
      />
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
  list: {
    paddingVertical: 8,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  emptyText: {
    fontSize: 14,
    color: "#888888",
  },
})
