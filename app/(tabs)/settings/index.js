import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { appSignOut } from "../../../store";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

const SettingsTabIndex = () => {
  const router = useRouter();

  const [watchList, setWatchList] = useState([]);
  const userRef = doc(db, "users", auth.currentUser.uid);

  useEffect(() => {
    const sub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setWatchList(doc.data()?.watchList);
    });
    return () => sub();
  }, []);

  // // TO ADD.
  // const userRef = doc(db, "users", auth.currentUser.uid);
  // await updateDoc(userRef, {
  //     watchList: arrayUnion("APPL")
  // });

  const renderWatchList = ({ item }) => {
    const deleteItem = async () => {
      await updateDoc(userRef, {
        watchList: arrayRemove(item),
      });
    };

    return (
      <View>
        <Text>{item}</Text>
        <TouchableOpacity onPress={deleteItem}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerShown: true, title: "Settings" }} />
      <TouchableOpacity
        onPress={async () => {
          const resp = await appSignOut();
          if (!resp?.error) {
            router.replace("/(auth)/login");
          } else {
            console.log(resp.error);
            Alert.alert("Logout Error", resp.error?.message);
          }
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>

      {watchList?.length > 0 && (
        <FlatList
          data={watchList}
          renderItem={renderWatchList}
          keyExtractor={(wList) => wList}
        />
      )}
    </View>
  );
};

export default SettingsTabIndex;
