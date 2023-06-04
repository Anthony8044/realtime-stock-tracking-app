import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useFetch from "../../hooks/useFetch";
import { COLORS, FONT, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const StockHeader = ({ symbol, name, close, timeData }) => {
  const changesPercentage = Math.abs(
    ((Number(timeData?.values[0]?.close) -
      Number(timeData?.values[timeData?.values?.length - 1]?.open)) /
      Number(timeData?.values[0]?.close)) *
      100
  );
  const upDownIndication =
    Number(timeData?.values[timeData?.values?.length - 1]?.open) <
    Number(timeData?.values[0]?.close)
      ? "up"
      : "down";
  // console.log(upDownIndication);
  //   const newData = timeData ? Object.entries({ [symbol]: { ...timeData } }) : {};
  // console.log(data);

  return (
    <View>
      <Text style={styles.symbol}>{symbol}</Text>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.priceWrapper}>
        <Text style={styles.price}>{"$" + Number(close).toFixed(2)}</Text>
        <View style={styles.percentWrapper(upDownIndication)}>
          {upDownIndication === "down" ? (
            <Ionicons name="arrow-down-outline" size={16} color="#a50e0f" />
          ) : (
            <Ionicons name="arrow-up-outline" size={16} color="#137333" />
          )}
          <Text style={styles.percent(upDownIndication)}>
            {changesPercentage.toFixed(2) + "%"}
          </Text>
        </View>
        <Text style={styles.change}>
          {"$" +
            (
              Number(close) -
              Number(timeData?.values[timeData?.values?.length - 1]?.open)
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
  percentWrapper: (upDownIndication) => ({
    flexDirection: "row",
    paddingVertical: 2,
    paddingHorizontal: 4,
    height: 22,
    alignSelf: "flex-end",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: upDownIndication === "down" ? "#fce8e6" : "#e6f4ea",
    borderRadius: 6,
    textAlignVertical: "bottom",
  }),
  percent: (upDownIndication) => ({
    fontFamily: FONT.regular,
    color: upDownIndication === "down" ? "#a50e0f" : "#137333",
  }),
  change: {
    fontFamily: FONT.regular,
    fontSize: 16,
    color: COLORS.gray,
    alignSelf: "flex-end",
  },
});
