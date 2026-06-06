import { Tabs } from "expo-router"
import { View, Platform, StyleSheet } from "react-native"
import BrandHeader from "../../components/ui/BrandHeader"

const isWeb = Platform.OS === "web"

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      {/* 웹: 상단 브랜드 네비 / 모바일: 하단 탭 */}
      {isWeb && <BrandHeader />}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#AAAAAA",
          tabBarStyle: isWeb
            ? { display: "none" }
            : {
                borderTopWidth: 1,
                borderTopColor: "#F0F0F0",
              },
        }}
      >
        <Tabs.Screen name="index" options={{ title: "홈" }} />
        <Tabs.Screen name="customize" options={{ title: "커스텀" }} />
        <Tabs.Screen name="cart" options={{ title: "장바구니" }} />
        <Tabs.Screen name="mypage" options={{ title: "마이페이지" }} />
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
