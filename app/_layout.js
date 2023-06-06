import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { RootSiblingParent } from "react-native-root-siblings";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    SSPBold: require("../assets/fonts/SourceSansPro-Bold.ttf"),
    SSPSemiBold: require("../assets/fonts/SourceSansPro-SemiBold.ttf"),
    SSPRegular: require("../assets/fonts/SourceSansPro-Regular.ttf"),
    SSPLight: require("../assets/fonts/SourceSansPro-Light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <RootSiblingParent>
      <Stack
        onLayout={onLayoutRootView}
        screenOptions={{ headerShown: false }}
      />
    </RootSiblingParent>
  );
};

export default Layout;
