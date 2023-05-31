import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Welcome } from "../../../components";
import GainersLosers from "../../../components/home/GainersLosers";
import { COLORS, FONT, SIZES } from "../../../constants";
import WatchList from "../../../components/home/WatchList";
import { auth, db } from "../../../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";

const HomeTabIndex = () => {
  const [watchList, setWatchList] = useState([]);
  // const userRef = doc(db, "users", auth.currentUser.uid);
  useEffect(() => {
    const sub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setWatchList(doc.data()?.watchList);
    });
    return () => sub();
  }, []);

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
          <GainersLosers />
          {watchList.length > 0 && (
            <WatchList symbols={watchList.slice(0, 3)} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeTabIndex;
