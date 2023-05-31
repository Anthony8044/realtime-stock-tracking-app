import React from "react";
import {
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

function TabButton({ name, activeTab, onHandleSearchType }) {
  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab.time)}
      onPress={onHandleSearchType}
    >
      <Text style={styles.btnText(name, activeTab.time)}>{name}</Text>
    </TouchableOpacity>
  );
}

const IntervalTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabButton
            name={item.time}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        contentContainerStyle={{ columnGap: SIZES.sm / 2 }}
        keyExtractor={(item) => item.time}
      />
    </View>
  );
};

export default IntervalTabs;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.sm,
    marginBottom: SIZES.sm / 2,
  },
  btn: (name, activeTab) => ({
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.sm,
    backgroundColor: name === activeTab ? COLORS.primary : COLORS.gray,
    borderRadius: 6,
    marginLeft: 2,
    ...SHADOWS.md,
    shadowColor: COLORS.white,
  }),
  btnText: (name, activeTab) => ({
    fontFamily: FONT.regular,
    fontSize: SIZES.sm,
    color: COLORS.white,
  }),
});
