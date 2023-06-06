import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const PortfolioHeader = ({ watchListData }) => {
  let price = 0,
    change = 0;
  watchListData.map((a) => {
    price += a.price;
    change += a.change;
  });
  const changesPercentage = Math.abs(
    ((price - (price - change)) / price) * 100
  );
  const upDownIndication = change > 0 ? "up" : "down";

  return (
    <View style={{ padding: SIZES.md }}>
      <Text style={styles.name}>Today's Performance</Text>
      <Text style={styles.price}>
        {"Total Value: " + "$" + price.toFixed(2)}
      </Text>
      <View style={styles.priceWrapper}>
        <Text style={styles.change}>
          {(upDownIndication === "up" ? "Gained " : "Lost ") +
            "$" +
            Math.abs(change.toFixed(2))}
        </Text>
        <View style={styles.percentWrapper(upDownIndication)}>
          {upDownIndication === "down" ? (
            <Ionicons name="arrow-down-outline" size={18} color="#a50e0f" />
          ) : (
            <Ionicons name="arrow-up-outline" size={18} color="#137333" />
          )}
          <Text style={styles.percent(upDownIndication)}>
            {changesPercentage.toFixed(2) + "%"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PortfolioHeader;

const styles = StyleSheet.create({
  name: {
    fontFamily: FONT.bold,
    fontSize: 32,
    color: COLORS.primary,
  },
  priceWrapper: {
    flexDirection: "row",
    gap: SIZES.md,
    height: 24,
    marginTop: 6,
  },
  price: {
    fontFamily: FONT.semiBold,
    fontSize: 24,
    color: COLORS.primary,
    marginTop: 8,
  },
  percentWrapper: (upDownIndication) => ({
    flexDirection: "row",
    paddingVertical: 2,
    paddingHorizontal: 4,
    height: 24,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: upDownIndication === "down" ? "#fce8e6" : "#e6f4ea",
    borderRadius: 6,
    textAlignVertical: "bottom",
  }),
  percent: (upDownIndication) => ({
    fontFamily: FONT.regular,
    fontSize: 18,
    color: upDownIndication === "down" ? "#a50e0f" : "#137333",
  }),
  change: {
    fontFamily: FONT.regular,
    fontSize: 22,
    color: COLORS.secondary,
    alignSelf: "flex-end",
  },
});
