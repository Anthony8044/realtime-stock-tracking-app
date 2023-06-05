import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import { InstantSearch } from "react-instantsearch-native";
import SearchBox from "../common/SearchBox";
import InfiniteHits from "../common/InfiniteHits";
import algoliasearch from "algoliasearch";
import { ALGOLIA_APP_API, ALGOLIA_API_KEY } from "@env";

const searchClient = algoliasearch(ALGOLIA_APP_API, ALGOLIA_API_KEY);

const Welcome = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <InstantSearch searchClient={searchClient} indexName="all-stocks">
          <SearchBox />
          <Modal animationType="slide" onRequestClose={() => {}}>
            <SafeAreaView style={{ marginTop: 48 }}>
              <InfiniteHits />
            </SafeAreaView>
          </Modal>

          {/* <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              onChangeText={(value) => refine(value)}
              value={currentRefinement}
              placeholder="Search"
            />
          </View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
            <AntDesign name="search1" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View> */}
        </InstantSearch>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.lg,
    height: 50,
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
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.md,
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
  safe: {
    flex: 1,
    backgroundColor: "#252b33",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
