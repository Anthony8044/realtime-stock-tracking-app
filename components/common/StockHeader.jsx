import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useFetch from "../../hooks/useFetch";
import { COLORS, FONT, SIZES } from "../../constants";

const StockHeader = ({ symbol, timeData }) => {
  const { data, isLoading, error } = useFetch("rapidapi", "quote", {
    symbol: symbol,
    interval: "1min",
  });
  const changesPercentage =
    ((parseInt(timeData?.values[timeData?.values?.length - 1]?.open) -
      parseInt(timeData?.values[0]?.close)) /
      parseInt(timeData?.values[timeData?.values?.length - 1]?.open)) *
    100;
  //   const newData = timeData ? Object.entries({ [symbol]: { ...timeData } }) : {};
  console.log(timeData?.values[0]);

  return (
    <View>
      <Text style={styles.symbol}>{data?.symbol}</Text>
      <Text style={styles.name}>{data?.name}</Text>
      <View style={styles.priceWrapper}>
        <Text style={styles.price}>
          {"$" + parseInt(data?.close).toFixed(2)}
        </Text>
        <Text style={styles.percent}>{changesPercentage.toFixed(2) + "%"}</Text>
        <Text style={styles.change}>
          {"$" +
            (
              parseInt(data?.close) - parseInt(timeData?.values[0]?.open)
            ).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default StockHeader;

const styles = StyleSheet.create({
  symbol: {
    fontFamily: FONT.semiBold,
    fontSize: 18,
    color: COLORS.gray2,
  },
  name: {
    fontFamily: FONT.bold,
    fontSize: 32,
    color: COLORS.primary,
  },
  priceWrapper: {
    flex: 1,
    flexDirection: "row",
    gap: SIZES.md,
    height: 24,
  },
  price: {
    fontFamily: FONT.semiBold,
    fontSize: 22,
    color: COLORS.primary,
  },
  percent: {
    fontFamily: FONT.regular,
    fontSize: 16,
    color: COLORS.tertiary,
    paddingTop: 4,
  },
  change: {
    fontFamily: FONT.regular,
    fontSize: 16,
    color: COLORS.gray,
    paddingTop: 4,
  },
});
