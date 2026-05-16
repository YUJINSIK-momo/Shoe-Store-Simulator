import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { CartItem } from "../../types/order"

interface CartItemProps {
  item: CartItem
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
}

export default function CartItemComponent({
  item,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.shoe.name}</Text>
        <Text style={styles.detail}>
          사이즈: {item.size} | 수량: {item.quantity}
        </Text>
        <Text style={styles.price}>
          {(item.shoe.basePrice * item.quantity).toLocaleString()}원
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyLabel}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => onUpdateQuantity(item.quantity + 1)}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyLabel}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
          <Text style={styles.removeLabel}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  info: {
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: "#888888",
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000000",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
  },
  qty: {
    fontSize: 16,
    fontWeight: "600",
    minWidth: 24,
    textAlign: "center",
  },
  removeBtn: {
    marginLeft: "auto",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  removeLabel: {
    fontSize: 13,
    color: "#888888",
  },
})
