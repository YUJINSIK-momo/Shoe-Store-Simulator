import { ReactNode, useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import Button from "../ui/Button"

interface AuthFormProps {
  title: string
  subtitle: string
  submitLabel: string
  loading: boolean
  error: string | null
  onSubmit: (email: string, password: string) => void
  footer: ReactNode
}

export default function AuthForm({
  title,
  subtitle,
  submitLabel,
  loading,
  error,
  onSubmit,
  footer,
}: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const canSubmit = email.trim().length > 0 && password.length >= 6 && !loading

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="#BBBBBB"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 (6자 이상)"
        placeholderTextColor="#BBBBBB"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Button
        label={loading ? "처리 중..." : submitLabel}
        onPress={() => onSubmit(email.trim(), password)}
        disabled={!canSubmit}
        style={styles.submit}
      />

      <View style={styles.footer}>{footer}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111111",
  },
  subtitle: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111111",
  },
  error: {
    fontSize: 13,
    color: "#E03131",
  },
  submit: {
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
})
