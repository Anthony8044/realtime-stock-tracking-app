import React, { useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import PropTypes from "prop-types";
import { connectSearchBox } from "react-instantsearch-native";
import { useFocusEffect } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const SearchBox = ({
  currentRefinement,
  refine,
  setShowModal,
  userDetails,
}) => {
  const textRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      // When the screen is focused
      const focus = () => {
        setTimeout(() => {
          textRef?.current?.focus();
        }, 100);
      };
      focus();
      return focus; // cleanup
    }, [])
  );

  return (
    <View>
      {userDetails === true && (
        <View style={{ padding: "3%", backgroundColor: COLORS.primary }}>
          <Text
            style={{ fontFamily: FONT.bold, fontSize: 40, color: COLORS.white }}
          >
            Welcome!
          </Text>
          <Text
            style={{
              fontFamily: FONT.regular,
              fontSize: 20,
              color: COLORS.lightWhite,
            }}
          >
            Choose your interests to follow and trade on your terms
          </Text>
        </View>
      )}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => setShowModal(false)}
        >
          <Ionicons name={"arrow-back-outline"} size={20} color={"black"} />
        </TouchableOpacity>
        <TextInput
          ref={textRef}
          style={styles.input}
          onChangeText={(value) => refine(value)}
          value={currentRefinement}
          placeholder="Search stocks..."
        />
      </View>
    </View>
  );
};

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectSearchBox(SearchBox);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: COLORS.primary,
    width: "100%",
    paddingHorizontal: "3%",
    gap: 8,
  },
  input: {
    flex: 1,
    height: 48,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: SIZES.sm,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backBtn: {
    width: 50,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.sm,
    justifyContent: "center",
    alignItems: "center",
  },
});
