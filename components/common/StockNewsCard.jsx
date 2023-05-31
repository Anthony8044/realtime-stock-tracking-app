import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants";

const StockNewsCard = ({ item, index }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(item.url)}
      key={index}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ uri: item?.banner_image }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={2}>
          {item?.title}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          {item?.source + " | " + item?.authors[0]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default StockNewsCard;

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
    marginVertical: 4,
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
    flexDirection: "column",
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
