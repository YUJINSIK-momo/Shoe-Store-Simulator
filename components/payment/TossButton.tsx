import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native"

interface TossButtonProps {
  onPress: () => void
  disabled?: boolean
  style?: ViewStyle
}

export default function TossButton({ onPress, disabled, style }: TossButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>토스페이로 결제</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0064FF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
})
