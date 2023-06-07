import { Tabs } from "expo-router";
import { COLORS, FONT } from "../../constants";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { paddingVertical: 6 },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Dashboard",
          tabBarLabelStyle: {
            fontFamily: FONT.regular,
            // paddingBottom: 4,
            fontSize: 12,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-home"
              size={28}
              color={focused ? COLORS.primary : COLORS.gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: "Portfolio",
          tabBarLabelStyle: {
            fontFamily: FONT.regular,
            // paddingBottom: 4,
            fontSize: 12,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="clipboard-list"
              size={28}
              color={focused ? COLORS.primary : COLORS.gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Profile",
          tabBarLabelStyle: {
            fontFamily: FONT.regular,
            // paddingBottom: 4,
            fontSize: 12,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={28}
              color={focused ? COLORS.primary : COLORS.gray}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
