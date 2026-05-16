import { View, Text, StyleSheet, ScrollView } from "react-native"
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
        <Text style={styles.subtitle}>부위를 선택하고 색상·소재를 바꿔보세요</Text>
      </View>

      <ShoeViewer partsConfig={partsConfig} />

      <ScrollView style={styles.panel} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>부위 선택</Text>
        <PartSelector
          selectedPart={selectedPart}
          partsConfig={partsConfig}
          onSelectPart={setSelectedPart}
        />

        {selectedPart && (
          <>
            <Text style={styles.sectionLabel}>색상</Text>
            <ColorPalette
              selectedColor={partsConfig[selectedPart].color}
              onSelectColor={(color) => updatePartColor(selectedPart, color)}
            />

            <Text style={styles.sectionLabel}>소재</Text>
            <MaterialPicker
              selectedMaterial={partsConfig[selectedPart].material}
              onSelectMaterial={(material) =>
                updatePartMaterial(selectedPart, material)
              }
            />
          </>
        )}

        {!selectedPart && (
          <View style={styles.hint}>
            <Text style={styles.hintText}>위에서 부위를 선택하면{"\n"}색상과 소재를 변경할 수 있어요</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111111",
  },
  subtitle: {
    fontSize: 13,
    color: "#AAAAAA",
    marginTop: 2,
  },
  panel: {
    flex: 1,
    paddingTop: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888888",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  hint: {
    alignItems: "center",
    paddingVertical: 32,
  },
  hintText: {
    fontSize: 14,
    color: "#BBBBBB",
    textAlign: "center",
    lineHeight: 22,
  },
})
