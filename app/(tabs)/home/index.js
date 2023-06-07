import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GainersLosers from "../../../components/home/GainersLosers";
import { COLORS, FONT, SIZES } from "../../../constants";
import WatchList from "../../../components/home/WatchList";
import { auth, db } from "../../../firebase-config";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { Search, SkeletonChooser } from "../../../components";
import { AuthStore } from "../../../store";

const HomeTabIndex = () => {
  const router = useRouter();
  const { userDetails } = AuthStore.useState();
  const [watchList, setWatchList] = useState(false);
  const [watchListData, setWatchListData] = useState([]);
  // console.log("userDetails: ", userDetails?.isNewUser);

  useEffect(() => {
    const sub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setWatchList(doc.data()?.watchList);
    });
    return () => sub();
  }, []);

  useEffect(() => {
    if (watchList && watchList?.length > 0) {
      const sub = onSnapshot(
        query(
          collection(db, "stocks"),
          where("symbol", "in", watchList),
          orderBy("percentChange", "desc"),
          limit(10)
        ),
        (querySnapshot) => {
          setWatchListData(querySnapshot.docs.map((d) => d.data()));
        }
      );
      return () => sub();
    } else {
      setWatchListData([]);
    }
  }, [watchList]);

  return (
    <View style={{ justifyContent: "center" }}>
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

      <Search userDetails={userDetails?.isNewUser} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%" }}
      >
        <View style={{ flex: 1, padding: SIZES.md }}>
          {/* GAINERS LOSERS */}
          <View style={styles.headerGainers}>
            <Text style={styles.headerTitle}>Gainers and Losers</Text>
          </View>
          <GainersLosers symbols={watchList} />
          {/* WATCHLIST */}
          <View style={styles.headerWatchList}>
            <Text style={styles.headerTitle}>Your Watchlist</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/portfolio")}>
              <Text style={styles.headerBtn}>See all</Text>
            </TouchableOpacity>
          </View>
          {watchList === false && <SkeletonChooser type={"watchList"} />}
          {watchListData && watchListData?.length > 0 && (
            <WatchList
              symbols={watchList}
              watchListData={watchListData}
              maxNumber={3}
            />
          )}
          {watchList !== false &&
            watchListData &&
            watchListData?.length === 0 && (
              <Text
                style={{
                  padding: 6,
                  fontFamily: FONT.regular,
                  fontSize: 18,
                }}
              >
                Start by adding stocks to your watchlist
              </Text>
            )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeTabIndex;

const styles = StyleSheet.create({
  headerGainers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.sm,
  },
  headerWatchList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.xl,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: FONT.semiBold,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.md,
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },
});
