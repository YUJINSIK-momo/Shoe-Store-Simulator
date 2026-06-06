import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { useRouter } from "expo-router"
import Screen from "../../components/ui/Screen"
import ScreenHeader from "../../components/ui/ScreenHeader"
import ShoeViewer from "../../components/customizer/ShoeViewer"
import PartSelector from "../../components/customizer/PartSelector"
import ColorPalette from "../../components/customizer/ColorPalette"
import MaterialPicker from "../../components/customizer/MaterialPicker"
import { useCustomizeStore } from "../../store/customizeStore"
import { useAuthStore } from "../../store/authStore"
import { useCreateDesign } from "../../hooks/useDesigns"

export default function CustomizeScreen() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const createDesign = useCreateDesign()
  const {
    partsConfig,
    selectedShoeId,
    selectedPart,
    setSelectedPart,
    updatePartColor,
    updatePartMaterial,
  } = useCustomizeStore()

  const handleSave = () => {
    if (!user) {
      Alert.alert("로그인이 필요해요", "디자인을 저장하려면 로그인하세요.", [
        { text: "취소", style: "cancel" },
        { text: "로그인", onPress: () => router.push("/login") },
      ])
      return
    }
    createDesign.mutate(
      { partsConfig, shoeId: selectedShoeId },
      {
        onSuccess: () =>
          Alert.alert("저장 완료", "갤러리에서 확인할 수 있어요.", [
            { text: "계속 편집", style: "cancel" },
            { text: "갤러리 보기", onPress: () => router.push("/designs") },
          ]),
        onError: () => Alert.alert("저장 실패", "잠시 후 다시 시도해주세요."),
      },
    )
  }

  return (
    <Screen>
      <ScreenHeader
        title="커스텀 시뮬레이터"
        subtitle="부위를 선택하고 색상·소재를 바꿔보세요"
        right={
          <TouchableOpacity
            style={[styles.saveButton, createDesign.isPending && styles.saveDisabled]}
            onPress={handleSave}
            disabled={createDesign.isPending}
          >
            <Text style={styles.saveText}>{createDesign.isPending ? "저장 중" : "저장"}</Text>
          </TouchableOpacity>
        }
      />

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
    </Screen>
  )
}

const styles = StyleSheet.create({
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#000000",
  },
  saveDisabled: {
    opacity: 0.4,
  },
  saveText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
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
