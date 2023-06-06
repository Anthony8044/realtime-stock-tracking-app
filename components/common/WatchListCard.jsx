import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { deleteWatchlist } from "../../hooks/common";

const WatchListCard = ({ item, handleNavigate, showDelete }) => {
  const { name, symbol, change, percentChange, price } = item;
  const upDownIndication = percentChange > 0 ? "up" : "down";

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleNavigate(symbol)}
      >
        <TouchableOpacity style={styles.logoContainer}>
          <Text style={styles.title}>{symbol}</Text>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.percent}>
            {Number(percentChange).toFixed(2) + "%"}
            {"  "}
            {"$" + Number(change).toFixed(2)}
          </Text>
        </View>
        {upDownIndication === "up" ? (
          <Ionicons name="trending-up" size={36} color="#137333" />
        ) : (
          <Ionicons name="trending-down" size={36} color="#a50e0f" />
        )}
        <View>
          <Text style={styles.price}>{"$" + Number(price).toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
      {showDelete && (
        <TouchableOpacity
          style={styles.delete}
          onPress={() => deleteWatchlist(symbol)}
        >
          <Ionicons name="ios-trash" size={20} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WatchListCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: SIZES.sm,
    ...SHADOWS.md,
    shadowColor: COLORS.white,
    backgroundColor: "#FFF",
    marginBottom: SIZES.sm,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.md,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.md,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: SIZES.md,
  },
  title: {
    fontSize: SIZES.md,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  price: {
    paddingLeft: 24,
    fontSize: SIZES.md,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  percent: {
    fontSize: SIZES.md,
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },
  delete: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ff726f",
    paddingHorizontal: 6,
    borderTopEndRadius: SIZES.sm,
    borderBottomEndRadius: SIZES.sm,
  },
});
