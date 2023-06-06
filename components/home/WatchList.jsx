import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, RefreshControl } from "react-native";

import { useRouter } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import { StyleSheet } from "react-native";
import WatchListCard from "../common/WatchListCard";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fetchAndUpdate, isOutOfDateArray } from "../../hooks/common";

const WatchList = ({
  symbols,
  showDelete,
  watchListData,
  maxNumber,
}) => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const stocksRef = collection(db, "stocks");

  const refreshFirebaseData = async () => {
    const w = query(stocksRef, where("symbol", "in", symbols));
    const querySnapshot = await getDocs(w);

    if (!querySnapshot.empty) {
      const stocksData = querySnapshot.docs.map((d) => d.data());

      if (isOutOfDateArray(stocksData)) {
        // console.log("is out of date");
        fetchAndUpdate(symbols);
      }
    }
  };
  useEffect(() => {
    if (symbols && symbols.length > 0) {
      refreshFirebaseData();
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAndUpdate(symbols);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={styles.cardsContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {watchListData.length > 0 &&
        watchListData
          .slice(0, maxNumber)
          .map((item) => (
            <WatchListCard
              item={item}
              key={item.symbol}
              handleNavigate={() =>
                router.push(`/stock-details/${item.symbol}`)
              }
              showDelete={showDelete}
            />
          ))}
    </ScrollView>
  );
};

export default WatchList;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xl,
  },
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
  cardsContainer: {
    marginTop: SIZES.md,
  },
});

// newData.length > 0 &&
// newData
//   ?.sort((a, b) => Number(b[1]?.change) - Number(a[1]?.change))
//   ?.map((item) => (
//     <WatchListCard
//       item={item[1]}
//       key={item[0]}
//       handleNavigate={() => router.push(`/stock-details/${item[0]}`)}
//       showDelete={showDelete}
//       deleteItem={deleteItem}
//     />
//   ))
