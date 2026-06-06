import { useState } from "react"
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Link, useRouter } from "expo-router"
import AuthForm from "../../components/auth/AuthForm"
import { useAuthStore } from "../../store/authStore"

export default function SignupScreen() {
  const router = useRouter()
  const signUp = useAuthStore((s) => s.signUp)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    const { error, needsConfirm } = await signUp(email, password)
    setLoading(false)
    if (error) {
      setError(error)
      return
    }
    if (needsConfirm) {
      Alert.alert(
        "확인 메일을 보냈어요",
        "메일의 링크를 눌러 가입을 완료한 뒤 로그인하세요.",
        [{ text: "확인", onPress: () => router.replace("/login") }],
      )
      return
    }
    router.replace("/")
  }

  return (
    <SafeAreaView style={styles.safe}>
      <AuthForm
        title="회원가입"
        subtitle="이메일로 간단히 시작하세요"
        submitLabel="가입하기"
        loading={loading}
        error={error}
        onSubmit={handleSignup}
        footer={
          <>
            <Text style={styles.footerText}>이미 계정이 있으신가요?</Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>로그인</Text>
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
