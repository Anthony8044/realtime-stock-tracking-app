import { Stack } from "expo-router";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { auth, db } from "../../../firebase-config";
import { COLORS, FONT, SIZES } from "../../../constants";
import {
  PortfolioHeader,
  SkeletonChooser,
  WatchList,
} from "../../../components";

const PortfolioTabIndex = () => {
  const [watchList, setWatchList] = useState(false);
  const [watchListData, setWatchListData] = useState([]);

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
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "Portfolio",
          headerTitleStyle: {
            fontFamily: FONT.regular,
            fontSize: SIZES.xl,
            color: COLORS.secondary,
          },
        }}
      />
      {watchListData && watchListData?.length > 0 && (
        <PortfolioHeader watchListData={watchListData} />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: "5%",
        }}
      >
        {watchList === false && <SkeletonChooser type={"watchList"} />}
        {watchListData && watchListData?.length > 0 && (
          <WatchList
            symbols={watchList}
            watchListData={watchListData}
            showDelete={true}
            maxNumber={10}
          />
        )}
        {watchList !== false &&
          watchListData &&
          watchListData?.length === 0 && (
            <Text
              style={{
                paddingTop: "50%",
                padding: 6,
                fontFamily: FONT.regular,
                fontSize: 22,
                textAlign: "center",
              }}
            >
              Start by adding stocks to your watchlist
            </Text>
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PortfolioTabIndex;
