import { Stack } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants/theme";
import { Welcome } from "../../../components";

const HomeTabIndex = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "Dashboard",
          headerTitleStyle: {
            fontFamily: FONT.regular,
            fontSize: SIZES.xl,
            color: COLORS.secondary,
          },
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.md }}>
          <Welcome />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeTabIndex;
