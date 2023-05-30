import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) {
      return;
    } else {
      router.replace("/(tabs)/home");
    }
  }, [navigationState?.key]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!navigationState?.key ? <Text>LOADING...</Text> : <></>}
    </SafeAreaView>
  );
};

export default Home;
