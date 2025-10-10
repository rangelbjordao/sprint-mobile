import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: "#F5F5F5",
        },
      ]}
      edges={["top"]}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
  },
};
