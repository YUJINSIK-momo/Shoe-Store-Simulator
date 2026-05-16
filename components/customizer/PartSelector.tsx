import { TouchableOpacity, Text, View, ScrollView, StyleSheet } from "react-native"
import { ShoePart, PartsConfig } from "../../types/shoe"

const PARTS: { id: ShoePart; label: string }[] = [
  { id: "upper", label: "갑피" },
  { id: "outsole", label: "밑창" },
  { id: "insole", label: "안창" },
  { id: "laces", label: "신발끈" },
  { id: "logo", label: "로고" },
]

interface PartSelectorProps {
  selectedPart: ShoePart | null
  partsConfig: PartsConfig
  onSelectPart: (part: ShoePart) => void
}

export default function PartSelector({
  selectedPart,
  partsConfig,
  onSelectPart,
}: PartSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {PARTS.map((part) => {
        const isSelected = selectedPart === part.id
        const partColor = partsConfig[part.id].color
        const isWhite = partColor.toUpperCase() === "#FFFFFF"
        return (
          <TouchableOpacity
            key={part.id}
            style={[styles.chip, isSelected && styles.selectedChip]}
            onPress={() => onSelectPart(part.id)}
          >
            <View
              style={[
                styles.colorDot,
                { backgroundColor: partColor },
                isWhite && styles.colorDotBorder,
              ]}
            />
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {part.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: "row",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  selectedChip: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  colorDotBorder: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  selectedLabel: {
    color: "#FFFFFF",
  },
})
