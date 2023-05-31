import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants";

const WatchListCard = ({ item, handleNavigate }) => {
  const changesPercentage =
    ((parseInt(item?.values[0]?.close) -
      parseInt(item?.values[item?.values?.length - 1]?.open)) /
      parseInt(item?.values[0]?.close)) *
    100;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigate(item)}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ uri: item?.employer_logo }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName}>{item?.meta?.symbol}</Text>
        <Text style={styles.location}>
          {changesPercentage.toFixed(2) + "%"}
        </Text>
      </View>
      <View>
        <Text style={styles.jobName}>
          {"$" + parseInt(item?.values[0]?.close).toFixed(2)}
        </Text>
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
    flex: 1,
    marginHorizontal: SIZES.md,
  },
  jobName: {
    fontSize: SIZES.md,
    fontFamily: "SSPBold",
    color: COLORS.primary,
  },
  jobType: {
    fontSize: SIZES.sm + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});
