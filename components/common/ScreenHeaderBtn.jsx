import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ScreenHeaderBtn = ({ icon, dimension, color, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Ionicons name={icon} size={dimension} color={color ?? "black"} />
      {/* <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      /> */}
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.sm / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.sm / 1.25,
  }),
});
