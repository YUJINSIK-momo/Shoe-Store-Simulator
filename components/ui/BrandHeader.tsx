import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter, usePathname } from "expo-router"
import Logo from "./Logo"

const NAV: { label: string; route: string }[] = [
  { label: "홈", route: "/" },
  { label: "커스텀", route: "/customize" },
  { label: "갤러리", route: "/designs" },
  { label: "장바구니", route: "/cart" },
  { label: "마이페이지", route: "/mypage" },
]

// 웹 상단 브랜드 네비게이션 (모바일은 하단 탭 사용)
export default function BrandHeader() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <View style={styles.bar}>
      <Logo onPress={() => router.push("/")} />
      <View style={styles.nav}>
        {NAV.map((item) => {
          const active = pathname === item.route
          return (
            <TouchableOpacity
              key={item.route}
              onPress={() => router.push(item.route)}
              style={styles.navItem}
            >
              <Text style={[styles.navText, active && styles.navTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  navItem: {
    paddingVertical: 6,
  },
  navText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
  },
  navTextActive: {
    color: "#111111",
    fontWeight: "700",
  },
})
