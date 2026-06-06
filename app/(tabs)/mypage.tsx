import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { useAuthStore } from "../../store/authStore"

const MENU_ITEMS = ["주문 내역", "저장된 디자인", "알림 설정"]

export default function MypageScreen() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const signOut = useAuthStore((s) => s.signOut)

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>마이페이지</Text>

      <View style={styles.profile}>
        <View style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user ? "내 계정" : "사용자"}</Text>
          <Text style={styles.email}>{user?.email ?? "로그인이 필요합니다"}</Text>
        </View>
        {!user && (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        )}
      </View>

      {MENU_ITEMS.map((item) => (
        <TouchableOpacity key={item} style={styles.menuItem}>
          <Text style={styles.menuLabel}>{item}</Text>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      ))}

      {user && (
        <TouchableOpacity style={styles.logout} onPress={signOut}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111111",
    padding: 20,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  profileInfo: {
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EEEEEE",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  email: {
    fontSize: 13,
    color: "#888888",
  },
  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#000000",
  },
  loginButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuLabel: {
    fontSize: 15,
    color: "#111111",
  },
  arrow: {
    fontSize: 18,
    color: "#CCCCCC",
  },
  logout: {
    margin: 20,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#888888",
  },
})
