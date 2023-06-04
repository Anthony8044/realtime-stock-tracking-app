import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";

import { useRouter } from "expo-router";
import { dummyWatchList } from "../../dummyData";
import { COLORS, FONT, SIZES } from "../../constants";
import { StyleSheet } from "react-native";
import WatchListCard from "../common/WatchListCard";
import useFetch from "../../hooks/useFetch";
import useFetchWatchList from "../../hooks/useFetchWatchList";

const WatchList = ({ symbols, showDelete, deleteItem, watchListData }) => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error, refetch } = useFetchWatchList(
    "rapidapi",
    "quote",
    symbols
  );
  // const newData = data
  //   ? Object.entries(
  //       symbols.length === 1 ? { [symbols.toString()]: { ...data } } : data
  //     )
  //   : [];

  // DUMMY VALUES FOR TESTING
  // const newData = Object.entries(dummyWatchList);
  // const isLoading = false;
  // const error = false;

  useEffect(() => {
    if (error) {
      Alert.alert("There is an error: ", error);
    }
  }, [error]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
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
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        watchListData.length > 0 &&
        watchListData.map((item) => (
          <WatchListCard
            item={item}
            key={item.symbol}
            handleNavigate={() => router.push(`/stock-details/${item.symbol}`)}
            showDelete={showDelete}
            deleteItem={deleteItem}
          />
        ))
      )}
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
