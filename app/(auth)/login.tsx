import { useState } from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Link, useRouter } from "expo-router"
import AuthForm from "../../components/auth/AuthForm"
import { useAuthStore } from "../../store/authStore"

export default function LoginScreen() {
  const router = useRouter()
  const signIn = useAuthStore((s) => s.signIn)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError("로그인 실패: 이메일·비밀번호를 확인하세요")
      return
    }
    router.replace("/")
  }

  return (
    <SafeAreaView style={styles.safe}>
      <AuthForm
        title="로그인"
        subtitle="내 디자인과 주문을 이어서 관리하세요"
        submitLabel="로그인"
        loading={loading}
        error={error}
        onSubmit={handleLogin}
        footer={
          <>
            <Text style={styles.footerText}>계정이 없으신가요?</Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>회원가입</Text>
              </TouchableOpacity>
            </Link>
          </>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#888888",
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },
})
