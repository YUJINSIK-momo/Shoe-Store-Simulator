import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { Material } from "../../types/shoe"
import { MATERIALS } from "../../constants/materials"

interface MaterialPickerProps {
  selectedMaterial?: Material
  onSelectMaterial: (material: Material) => void
}

export default function MaterialPicker({
  selectedMaterial,
  onSelectMaterial,
}: MaterialPickerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {MATERIALS.map((material) => (
        <TouchableOpacity
          key={material.id}
          style={[
            styles.card,
            selectedMaterial === material.id && styles.selectedCard,
          ]}
          onPress={() => onSelectMaterial(material.id)}
        >
          <Text
            style={[
              styles.name,
              selectedMaterial === material.id && styles.selectedText,
            ]}
          >
            {material.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 10,
    flexDirection: "row",
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  selectedCard: {
    backgroundColor: "#000000",
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  selectedText: {
    color: "#FFFFFF",
  },
})
