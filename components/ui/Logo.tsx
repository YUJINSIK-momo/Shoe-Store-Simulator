import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface LogoProps {
  onPress?: () => void
}

// YUYU 브랜드 마크: 검정 정사각 배지 'Y' + 워드마크
export default function Logo({ onPress }: LogoProps) {
  const content = (
    <>
      <View style={styles.mark}>
        <Text style={styles.markText}>Y</Text>
      </View>
      <Text style={styles.word}>YUYU</Text>
    </>
  )

  if (onPress) {
    return (
      <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    )
  }
  return <View style={styles.row}>{content}</View>
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  mark: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  markText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  word: {
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#111111",
  },
})
