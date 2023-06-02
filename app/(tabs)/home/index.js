import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

          {/* GAINERS LOSERS */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Gainers and Losers</Text>
            <TouchableOpacity>
              <Text style={styles.headerBtn}>See all</Text>
            </TouchableOpacity>
          </View>
          <GainersLosers symbols={watchList} />

          {/* WATCHLIST */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Watchlist</Text>
            <TouchableOpacity>
              <Text style={styles.headerBtn}>See all</Text>
            </TouchableOpacity>
          </View>
          {watchList.length > 0 && (
            <WatchList symbols={watchList.slice(0, 3)} deleteItem={() => ""} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeTabIndex;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.sm,
  },
  headerTitle: {
    fontSize: SIZES.lg,
    fontFamily: FONT.regular,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.md,
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },
});
