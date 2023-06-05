import { Stack, useRouter } from "expo-router";
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
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";

const HomeTabIndex = () => {
  const router = useRouter();
  const [watchList, setWatchList] = useState([]);
  const [watchListData, setWatchListData] = useState([]);

  useEffect(() => {
    const sub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setWatchList(doc.data()?.watchList);
    });
    return () => sub();
  }, []);

  useEffect(() => {
    if (watchList.length > 0) {
      const sub = onSnapshot(
        query(collection(db, "stocks"), where("symbol", "in", watchList)),
        (querySnapshot) => {
          setWatchListData(querySnapshot.docs.map((d) => d.data()));
        }
      );
      return () => sub();
    }
  }, [watchList]);

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

      <Welcome />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.md }}>
          {/* GAINERS LOSERS */}
          {/* <View style={styles.header}>
            <Text style={styles.headerTitle}>Gainers and Losers</Text>
          </View>
          <GainersLosers symbols={watchList} /> */}

          {/* WATCHLIST */}
          {/* <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Watchlist</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/portfolio")}>
              <Text style={styles.headerBtn}>See all</Text>
            </TouchableOpacity>
          </View>
          {watchListData.length > 0 && (
            <WatchList
              symbols={watchList.slice(0, 3)}
              deleteItem={() => ""}
              watchListData={watchListData.slice(0, 3)}
            />
          )} */}
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
