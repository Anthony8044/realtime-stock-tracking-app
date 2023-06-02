import { Stack } from "expo-router";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { auth, db } from "../../../firebase-config";
import { COLORS, FONT, SIZES } from "../../../constants";
import { WatchList } from "../../../components";

const PortfolioTabIndex = () => {
  const [watchList, setWatchList] = useState([]);
  const userRef = doc(db, "users", auth.currentUser.uid);
  useEffect(() => {
    const sub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setWatchList(doc.data()?.watchList);
    });
    return () => sub();
  }, []);

  const deleteItem = async (item) => {
    try {
      await updateDoc(userRef, {
        watchList: arrayRemove(item),
      });
    } catch (error) {
      console.log("Could'nt delete");
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "Dashboard",
          headerTitleStyle: {
            fontFamily: FONT.regular,
            fontSize: SIZES.xl,
            color: COLORS.secondary,
          },
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.md }}>
          {watchList.length > 0 && (
            <WatchList
              symbols={watchList}
              showDelete={true}
              deleteItem={deleteItem}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PortfolioTabIndex;
