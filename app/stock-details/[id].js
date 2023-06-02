import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import {
  IntervalTabs,
  ScreenHeaderBtn,
  StockChart,
  StockHeader,
  StockNews,
} from "../../components";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import useFetch from "../../hooks/useFetch";
import onShare from "../../hooks/common";

const timeIntervals = [
  { time: "1 Day", params: { interval: "15min", outputsize: "30" } },
  { time: "1 Month", params: { interval: "1day", outputsize: "22" } },
  { time: "6 Months", params: { interval: "1week", outputsize: "24" } },
  { time: "1 Year", params: { interval: "1month", outputsize: "13" } },
];

const StockDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [isFollowed, setIsFollowed] = useState(false);
  const [activeTab, setActiveTab] = useState(timeIntervals[0]);
  const userRef = doc(db, "users", auth.currentUser.uid);

  const { data, isLoading, error, refetch } = useFetch(
    "rapidapi",
    "time_series",
    { ...activeTab.params, symbol: params.id }
  );

  useEffect(() => {
    const sub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      if (doc.data()?.watchList.find((a) => a === params.id)) {
        setIsFollowed(true);
      } else {
        setIsFollowed(false);
      }
    });
    return () => sub();
  }, []);

  // useEffect(() => {
  //   refetch();
  // }, [activeTab]);

  useEffect(() => {
    if (error) {
      Alert.alert("There is an error: ", error);
    }
  }, [error]);

  const onWatchListPress = () => {
    const unFollowItem = async () => {
      await updateDoc(userRef, {
        watchList: arrayRemove(params.id),
      });
    };
    const followItem = async () => {
      await updateDoc(userRef, {
        watchList: arrayUnion(params.id),
      });
    };
    isFollowed ? unFollowItem() : followItem();
  };
  // console.log(data);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShown: true,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              icon={"arrow-back-outline"}
              dimension={20}
              handlePress={() => router.push(`/home`)}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              icon={"ios-share"}
              dimension={20}
              handlePress={() =>
                onShare(data?.meta?.symbol, data?.meta?.exchange)
              }
            />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <>
            {Object.keys(data).length != 0 && (
              <>
                <StockHeader symbol={params.id} timeData={data} />
                <IntervalTabs
                  tabs={timeIntervals}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  refetch={refetch}
                />
                <StockChart timeData={data} />
              </>
            )}
          </>
        )}
        <TouchableOpacity
          style={styles.button(isFollowed)}
          onPress={() => onWatchListPress()}
        >
          <Text style={styles.buttonText}>
            {isFollowed ? "Unfollow" : "Follow"}
          </Text>
        </TouchableOpacity>
        <StockNews symbol={params.id} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StockDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    width: "100%",
    paddingHorizontal: "5%",
  },
  button: (isFollowed) => ({
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 8,
    height: 50,
    backgroundColor: isFollowed ? COLORS.gray : COLORS.primary,
    borderWidth: 1,
    borderRadius: 16,
  }),
  buttonText: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.lg,
    color: "#F3F4F8",
  },
});
