import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const SettingsTabIndex = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerShown: true, title: "Settings" }} />
    </View>
  );
};

export default SettingsTabIndex;
