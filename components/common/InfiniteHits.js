import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { connectInfiniteHits } from "react-instantsearch-native";

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  item: {
    padding: 10,
    flexDirection: "column",
  },
  titleText: {
    fontWeight: "bold",
  },
});

const InfiniteHits = ({ hits, hasMore, refineNext }) => {
  return (
    <FlatList
      data={hits}
      keyExtractor={(item) => item.symbol}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => hasMore && refineNext()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.titleText}>{item.company_name}</Text>
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
