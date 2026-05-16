import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native"

interface ButtonProps {
  label: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline"
  disabled?: boolean
  style?: ViewStyle
}

export default function Button({
  label,
  onPress,
  variant = "primary",
  disabled,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, variant === "outline" && styles.outlineLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#000000",
  },
  secondary: {
    backgroundColor: "#F5F5F5",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  outlineLabel: {
    color: "#000000",
  },
})
