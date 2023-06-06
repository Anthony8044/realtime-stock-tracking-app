import { Stack, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { appSignOut } from "../../../store";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT, SIZES } from "../../../constants";
import { AuthStore } from "../../../store";

const SettingsTabIndex = () => {
  const router = useRouter();
  const { user } = AuthStore.useState();
  // console.log("user: ", user.providerData[0].phoneNumber);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "Profile",
          headerTitleStyle: {
            fontFamily: FONT.regular,
            fontSize: SIZES.xl,
            color: COLORS.secondary,
          },
        }}
      />
      <Ionicons
        name="ios-person-circle-sharp"
        size={160}
        color={COLORS.tertiary}
      />
      <Text style={styles.label}>
        {"Phone Number: " + user?.providerData[0]?.phoneNumber}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          const resp = await appSignOut();
          if (!resp?.error) {
            router.replace("/(auth)/login");
          } else {
            console.log(resp.error);
            Alert.alert("Logout Error", resp.error?.message);
          }
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsTabIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "5%",
  },
  label: {
    fontSize: 20,
    marginBottom: 4,
    color: "#312651",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
    backgroundColor: "#312651",
    borderWidth: 1,
    borderRadius: 16,
    width: "100%",
  },
  buttonText: {
    color: "#F3F4F8",
  },
});
