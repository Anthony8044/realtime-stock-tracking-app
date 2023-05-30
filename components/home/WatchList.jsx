import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";
import { dummyWatchList } from "../../dummyData";
import { COLORS, FONT, SIZES } from "../../constants";
import { StyleSheet } from "react-native";
import WatchListCard from "../common/WatchListCard";

const WatchList = () => {
  const router = useRouter();

  const data = Object.entries(dummyWatchList);
  const isLoading = false;
  const error = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Watchlist</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((item) => (
            <WatchListCard
              item={item[1]}
              key={item[0]}
            />
          ))
        )}
      </View>
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
