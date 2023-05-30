import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const GainersLosersCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => ""}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ uri: item?.employer_logo }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.name}
      </Text>

      <View style={styles.jobName}>
        <Text>{"$" + item.price}</Text>
        <Text style={styles.location}>{item.changesPercentage}</Text>
        <Text style={styles.location}>{item.change}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GainersLosersCard;

const styles = StyleSheet.create({
  container: {
    width: 250,
    padding: SIZES.lg,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.md,
    justifyContent: "space-between",
    ...SHADOWS.medium,
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
  companyName: {
    fontSize: SIZES.md,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.sm / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.lg,
  },
  jobName: {
    fontSize: SIZES.lg,
    fontFamily: FONT.regular,
    color: COLORS.primary,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  location: {
    fontSize: SIZES.md - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});
