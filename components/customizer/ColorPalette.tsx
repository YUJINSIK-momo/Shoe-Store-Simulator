import { TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { COLORS } from "../../constants/colors"

interface ColorPaletteProps {
  selectedColor: string
  onSelectColor: (color: string) => void
}

export default function ColorPalette({
  selectedColor,
  onSelectColor,
}: ColorPaletteProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color.hex}
          style={[
            styles.swatch,
            { backgroundColor: color.hex },
            selectedColor === color.hex && styles.selected,
            color.hex === "#FFFFFF" && styles.whiteBorder,
          ]}
          onPress={() => onSelectColor(color.hex)}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  selected: {
    borderWidth: 3,
    borderColor: "#4A90E2",
  },
  whiteBorder: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
})
