import { TouchableOpacity, Text, ScrollView, StyleSheet } from "react-native"
import { ShoePart } from "../../types/shoe"

const PARTS: { id: ShoePart; label: string }[] = [
  { id: "upper", label: "갑피" },
  { id: "outsole", label: "밑창" },
  { id: "insole", label: "안창" },
  { id: "laces", label: "신발끈" },
  { id: "logo", label: "로고" },
]

interface PartSelectorProps {
  selectedPart: ShoePart | null
  onSelectPart: (part: ShoePart) => void
}

export default function PartSelector({
  selectedPart,
  onSelectPart,
}: PartSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {PARTS.map((part) => (
        <TouchableOpacity
          key={part.id}
          style={[styles.chip, selectedPart === part.id && styles.selectedChip]}
          onPress={() => onSelectPart(part.id)}
        >
          <Text
            style={[
              styles.label,
              selectedPart === part.id && styles.selectedLabel,
            ]}
          >
            {part.label}
          </Text>
        </TouchableOpacity>
      ))}
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
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  selectedChip: {
    backgroundColor: "#000000",
    borderColor: "#000000",
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
