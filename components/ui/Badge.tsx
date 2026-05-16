import { View, Text, StyleSheet } from "react-native"

interface BadgeProps {
  label: string
  color?: string
}

export default function Badge({ label, color = "#000000" }: BadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: color + "20", borderColor: color + "40" },
      ]}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
})
