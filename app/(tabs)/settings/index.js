import { Stack, useRouter } from "expo-router";
import React from "react";
import { Alert, Button, View } from "react-native";
import { appSignOut } from "../../../store";

const SettingsTabIndex = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerShown: true, title: "Settings" }} />
      <Button
        onPress={async () => {
          const resp = await appSignOut();
          if (!resp?.error) {
            router.replace("/(auth)/login");
          } else {
            console.log(resp.error);
            Alert.alert("Logout Error", resp.error?.message);
          }
        }}
        title="LOGOUT"
      />
    </View>
  );
};

export default SettingsTabIndex;
