import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { connectInfiniteHits } from "react-instantsearch-native";
import { useRouter } from "expo-router";
import { FONT } from "../../constants";

const InfiniteHits = ({ hits, hasMore, refineNext, setShowModal }) => {
  const router = useRouter();
  return (
    <FlatList
      data={hits}
      keyExtractor={(item) => item.symbol}
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="on-drag"
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => hasMore && refineNext()}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setShowModal(false);
              router.push(`/stock-details/${item.symbol.replace("$", "")}`);
            }}
          >
            <Text style={styles.symbolText}>{item.symbol}</Text>
            <Text style={styles.titleText}>{item.company_name}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refineNext: PropTypes.func.isRequired,
};

export default connectInfiniteHits(InfiniteHits);

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: "row",
  },
  symbolText: {
    width: "20%",
    fontFamily: FONT.bold,
    fontSize: 16,
  },
  titleText: {
    width: "80%",
    fontFamily: FONT.regular,
    fontSize: 16,
  },
});
