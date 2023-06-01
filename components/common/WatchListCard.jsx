import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const WatchListCard = ({ item, handleNavigate }) => {
  const upDownIndication = item?.percent_change > 0 ? "up" : "down";
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigate(item)}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Text style={styles.price}>{item?.symbol}</Text>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.price} numberOfLines={1}>
          {item?.name}
        </Text>
        <Text style={styles.percent}>
          {Number(item?.percent_change).toFixed(2) + "%"}
          {"  "}
          {"$" + Number(item?.change).toFixed(2)}
        </Text>
      </View>
      {upDownIndication === "up" ? (
        <Ionicons name="trending-up" size={36} color="#137333" />
      ) : (
        <Ionicons name="trending-down" size={36} color="#a50e0f" />
      )}
      <View>
        <Text style={styles.price}>{"$" + Number(item?.close).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WatchListCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.md,
    borderRadius: SIZES.sm,
    backgroundColor: "#FFF",
    ...SHADOWS.md,
    shadowColor: COLORS.white,
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
    marginHorizontal: SIZES.md,
  },
  price: {
    fontSize: SIZES.md,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  percent: {
    fontSize: SIZES.md,
    fontFamily: FONT.light,
    color: COLORS.primary,
  },
});
