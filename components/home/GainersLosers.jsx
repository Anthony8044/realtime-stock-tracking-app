import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { dummyGainer, dummyLoser } from "../../dummyData";
import { COLORS, FONT, SIZES } from "../../constants";
import GainersLosersCard from "../common/GainersLosersCard";
import useFetch from "../../hooks/useFetch";

const GainersLosers = ({ symbols }) => {
  const router = useRouter();

  // const { data, isLoading, error } = useFetch(
  //   "financialmodelingprep",
  //   "stock_market/losers"
  // );
  // const {
  //   data: dataTwo,
  //   isLoading: isLoadingTwo,
  //   error: errorTwo,
  // } = useFetch("financialmodelingprep", "stock_market/gainers");
  // const dataConcat = data
  // .concat(dataTwo)
  // .sort(
  //   (a, b) => Math.abs(b.changesPercentage) - Math.abs(a.changesPercentage)
  // )
  // .slice(0, 10);

  // DUMMY VALUES FOR TESTING
  const dataConcat = dummyGainer
    .concat(dummyLoser)
    .sort(
      (a, b) => Math.abs(b.changesPercentage) - Math.abs(a.changesPercentage)
    )
    .slice(0, 10);
  const isLoading = false;
  const error = false;

  return (
    <View style={styles.cardsContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={dataConcat}
          renderItem={({ item }) => (
            <GainersLosersCard item={item} symbols={symbols} />
          )}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{ columnGap: 6 }}
          horizontal
        />
      )}
    </View>
  );
};

export default GainersLosers;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.lg,
    fontFamily: FONT.regular,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.lg,
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.md,
  },
});
