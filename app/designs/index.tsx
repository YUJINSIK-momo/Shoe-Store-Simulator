import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native"
import { useRouter } from "expo-router"
import Screen from "../../components/ui/Screen"
import ScreenHeader from "../../components/ui/ScreenHeader"
import Button from "../../components/ui/Button"
import { useDesigns, useDeleteDesign } from "../../hooks/useDesigns"
import { useAuthStore } from "../../store/authStore"
import { useCustomizeStore } from "../../store/customizeStore"
import { useCartStore } from "../../store/cartStore"
import { DEFAULT_SHOE, DEFAULT_SIZE, DEFAULT_BASE_PRICE } from "../../constants/shoe"
import { CustomDesign, ShoePart } from "../../types/shoe"

const PART_LABELS: { key: ShoePart; label: string }[] = [
  { key: "upper", label: "갑피" },
  { key: "outsole", label: "밑창" },
  { key: "laces", label: "끈" },
  { key: "insole", label: "안창" },
  { key: "logo", label: "로고" },
]

export default function DesignsScreen() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const loadConfig = useCustomizeStore((s) => s.loadConfig)
  const addItem = useCartStore((s) => s.addItem)
  const { data: designs, isLoading } = useDesigns()
  const deleteDesign = useDeleteDesign()

  const handleLoad = (design: CustomDesign) => {
    loadConfig(design.partsConfig)
    router.push("/customize")
  }

  const handleAddToCart = (design: CustomDesign) => {
    addItem({ design, shoe: DEFAULT_SHOE, size: DEFAULT_SIZE, quantity: 1 })
    router.push("/cart")
  }

  const handleDelete = (id: string) => {
    Alert.alert("디자인 삭제", "이 디자인을 삭제할까요?", [
      { text: "취소", style: "cancel" },
      { text: "삭제", style: "destructive", onPress: () => deleteDesign.mutate(id) },
    ])
  }

  if (!user) {
    return (
      <Screen>
        <ScreenHeader title="저장된 디자인" onBack={() => router.back()} />
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>로그인이 필요해요</Text>
          <Text style={styles.emptyText}>디자인은 로그인 후 저장·확인할 수 있어요</Text>
          <Button label="로그인하러 가기" onPress={() => router.push("/login")} style={styles.cta} />
        </View>
      </Screen>
    )
  }

  return (
    <Screen>
      <ScreenHeader
        title="저장된 디자인"
        subtitle={designs ? `${designs.length}개` : undefined}
        onBack={() => router.back()}
      />
      {isLoading ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>불러오는 중...</Text>
        </View>
      ) : !designs || designs.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>아직 저장된 디자인이 없어요</Text>
          <Text style={styles.emptyText}>커스텀 탭에서 디자인하고 저장해보세요</Text>
          <Button label="커스텀 시작하기" onPress={() => router.push("/customize")} style={styles.cta} />
        </View>
      ) : (
        <FlatList
          data={designs}
          keyExtractor={(d) => d.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <DesignCard
              design={item}
              onLoad={() => handleLoad(item)}
              onAddToCart={() => handleAddToCart(item)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}
    </Screen>
  )
}

function DesignCard({
  design,
  onLoad,
  onAddToCart,
  onDelete,
}: {
  design: CustomDesign
  onLoad: () => void
  onAddToCart: () => void
  onDelete: () => void
}) {
  const date = new Date(design.createdAt)
  const dateLabel = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardMain} onPress={onLoad} activeOpacity={0.8}>
        <View style={styles.swatches}>
          {PART_LABELS.map(({ key }) => (
            <View
              key={key}
              style={[styles.swatch, { backgroundColor: design.partsConfig[key].color }]}
            />
          ))}
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>커스텀 디자인</Text>
          <Text style={styles.cardDate}>{dateLabel} · 탭하면 불러오기</Text>
          <Text style={styles.cardPrice}>{DEFAULT_BASE_PRICE.toLocaleString()}원</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onAddToCart} style={styles.cartBtn}>
          <Text style={styles.cartBtnText}>담기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} hitSlop={8} style={styles.delete}>
          <Text style={styles.deleteText}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
  },
  cardMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  swatches: {
    flexDirection: "row",
    gap: 3,
  },
  swatch: {
    width: 14,
    height: 28,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111111",
  },
  cardDate: {
    fontSize: 12,
    color: "#AAAAAA",
    marginTop: 3,
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000000",
    marginTop: 4,
  },
  actions: {
    alignItems: "center",
    gap: 8,
  },
  cartBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#000000",
  },
  cartBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  delete: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  deleteText: {
    fontSize: 12,
    color: "#E03131",
    fontWeight: "500",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  emptyText: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
  },
  cta: {
    marginTop: 12,
    alignSelf: "stretch",
  },
})
