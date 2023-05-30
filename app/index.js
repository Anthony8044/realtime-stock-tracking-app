import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStore } from "../store";

const Home = () => {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  const { initialized, isLoggedIn } = AuthStore.useState();

  useEffect(() => {
    if (!navigationState?.key || !initialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/login");
    } else if (isLoggedIn) {
      router.replace("/(tabs)/home");
    }
  }, [segments, navigationState?.key, initialized]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!navigationState?.key ? <Text>LOADING...</Text> : <></>}
    </SafeAreaView>
  );
};

export default Home;
