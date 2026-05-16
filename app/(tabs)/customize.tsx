import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ShoeViewer from "../../components/customizer/ShoeViewer"
import PartSelector from "../../components/customizer/PartSelector"
import ColorPalette from "../../components/customizer/ColorPalette"
import MaterialPicker from "../../components/customizer/MaterialPicker"
import { useCustomizeStore } from "../../store/customizeStore"

export default function CustomizeScreen() {
  const {
    partsConfig,
    selectedPart,
    setSelectedPart,
    updatePartColor,
    updatePartMaterial,
  } = useCustomizeStore()

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>커스텀 시뮬레이터</Text>
      </View>
      <ShoeViewer partsConfig={partsConfig} />
      <View style={styles.panel}>
        <Text style={styles.sectionLabel}>부위 선택</Text>
        <PartSelector
          selectedPart={selectedPart}
          onSelectPart={setSelectedPart}
        />
        {selectedPart && (
          <>
            <Text style={styles.sectionLabel}>색상 선택</Text>
            <ColorPalette
              selectedColor={partsConfig[selectedPart].color}
              onSelectColor={(color) => updatePartColor(selectedPart, color)}
            />
            <Text style={styles.sectionLabel}>소재 선택</Text>
            <MaterialPicker
              selectedMaterial={partsConfig[selectedPart].material}
              onSelectMaterial={(material) =>
                updatePartMaterial(selectedPart, material)
              }
            />
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111111",
  },
  panel: {
    flex: 1,
    gap: 16,
    paddingTop: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555555",
    paddingHorizontal: 16,
  },
})
