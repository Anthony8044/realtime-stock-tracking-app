import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const PortfolioTabIndex = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerShown: true, title: "Portfolio" }} />
    </View>
  );
};

export default PortfolioTabIndex;
