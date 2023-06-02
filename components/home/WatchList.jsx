import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useRouter } from "expo-router";
import { dummyWatchList } from "../../dummyData";
import { COLORS, FONT, SIZES } from "../../constants";
import { StyleSheet } from "react-native";
import WatchListCard from "../common/WatchListCard";
import useFetch from "../../hooks/useFetch";

const WatchList = ({ symbols, showDelete, deleteItem }) => {
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch("rapidapi", "quote", {
    symbol: symbols.toString(),
    interval: "1day",
    format: "json",
  });
  const newData = data
    ? Object.entries(
        symbols.length === 1 ? { [symbols.toString()]: { ...data } } : data
      )
    : [];

  // DUMMY VALUES FOR TESTING
  // const newData = Object.entries(dummyWatchList);
  // const isLoading = false;
  // const error = false;

  useEffect(() => {
    if (error) {
      Alert.alert("There is an error: ", error);
    }
  }, [error]);

  return (
    <View style={styles.cardsContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        newData.length > 0 &&
        newData
          ?.sort((a, b) => Number(b[1]?.change) - Number(a[1]?.change))
          ?.map((item) => (
            <WatchListCard
              item={item[1]}
              key={item[0]}
              handleNavigate={() => router.push(`/stock-details/${item[0]}`)}
              showDelete={showDelete}
              deleteItem={deleteItem}
            />
          ))
      )}
    </View>
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
    gap: SIZES.sm,
  },
});
