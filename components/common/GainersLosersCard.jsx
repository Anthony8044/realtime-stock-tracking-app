import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const GainersLosersCard = ({ item, symbols }) => {
  const router = useRouter();
  const upDownIndication = Number(item?.change) > 0 ? "up" : "down";
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/stock-details/${item?.symbol}`)}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity style={styles.logoContainer}>
          <Text style={styles.symbol}>{item?.symbol}</Text>
        </TouchableOpacity>
        {symbols &&
        symbols?.length > 0 &&
        symbols.filter((a) => a === item?.symbol).length > 0 ? (
          <Ionicons name="ios-star-sharp" size={28} color={COLORS.tertiary} />
        ) : (
          <Ionicons name="ios-star-outline" size={28} color={COLORS.tertiary} />
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {item?.name?.length > 0 ? item?.name : item?.symbol}
      </Text>

      <Text style={styles.price}>{"$" + Number(item?.price).toFixed(2)}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <View style={styles.percentWrapper(upDownIndication)}>
          {upDownIndication === "down" ? (
            <Ionicons name="arrow-down-outline" size={16} color="#a50e0f" />
          ) : (
            <Ionicons name="arrow-up-outline" size={16} color="#137333" />
          )}
          <Text style={styles.percent(upDownIndication)}>
            {Math.abs(Number(item?.changesPercentage).toFixed(2)) + "%"}
          </Text>
        </View>
        {/* {Number(item?.changesPercentage).toFixed(2) + "%"} */}
        <Text style={styles.change}>
          {" $" +
            (upDownIndication === "up" ? "+" : "") +
            Number(item?.change).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GainersLosersCard;

const styles = StyleSheet.create({
  container: {
    width: 170,
    padding: SIZES.lg,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.md,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.gray,
  },
  logoContainer: {
    // width: 44,
    minWidth: 44,
    height: 44,
    paddingHorizontal: 4,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.md,
    justifyContent: "center",
    alignItems: "center",
  },
  symbol: {
    fontSize: SIZES.md,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  name: {
    paddingVertical: 2,
    fontSize: 14,
    fontFamily: FONT.bold,
    color: COLORS.white,
    marginTop: SIZES.sm / 1.5,
  },
  price: {
    paddingVertical: 6,
    fontSize: 20,
    fontFamily: FONT.bold,
    color: COLORS.tertiary,
    // marginTop: SIZES.sm / 1.5,
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
    fontSize: SIZES.md,
    fontFamily: FONT.semiBold,
    color: COLORS.lightWhite,
  },
});
