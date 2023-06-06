import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Text,
} from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import { InstantSearch } from "react-instantsearch-native";
import SearchBox from "../common/SearchBox";
import InfiniteHits from "../common/InfiniteHits";
import algoliasearch from "algoliasearch";
import { ALGOLIA_APP_API, ALGOLIA_API_KEY } from "@env";

const searchClient = algoliasearch(ALGOLIA_APP_API, ALGOLIA_API_KEY);

const Search = ({ userDetails }) => {
  const [showModal, setShowModal] = useState(userDetails ?? false);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity
            style={styles.searchInput}
            onPress={() => setShowModal(true)}
          >
            <Text style={{ color: COLORS.gray }}>Search</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => setShowModal(true)}
        >
          <AntDesign name="search1" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        onDismiss={() => setShowModal(false)}
      >
        <SafeAreaView>
          <InstantSearch searchClient={searchClient} indexName="all-stocks">
            <SearchBox setShowModal={setShowModal} userDetails={userDetails} />
            <InfiniteHits setShowModal={setShowModal} />
          </InstantSearch>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.lg,
    height: 50,
    paddingHorizontal: "5%",
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    marginRight: SIZES.sm,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.md,
    height: "100%",
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.md,
    justifyContent: "center",
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.md,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
});
