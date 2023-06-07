import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import {
  IntervalTabs,
  ScreenHeaderBtn,
  SkeletonChooser,
  StockChart,
  StockHeader,
  StockNews,
} from "../../components";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import useFetch from "../../hooks/useFetch";
import { isOutOfDate, onShare, watchListObj } from "../../hooks/common";
import { RefreshControl } from "react-native";

const timeIntervals = [
  { time: "1 Day", params: { interval: "15min", outputsize: "30" } },
  { time: "1 Month", params: { interval: "1day", outputsize: "22" } },
  { time: "6 Months", params: { interval: "1week", outputsize: "24" } },
  { time: "1 Year", params: { interval: "1month", outputsize: "13" } },
];

const StockDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [activeTab, setActiveTab] = useState(timeIntervals[0]);
  const userRef = doc(db, "users", auth.currentUser.uid);
  const stocksRef = doc(db, "stocks", params.id);

  // Realtime stock data quote
  const {
    data: rtData,
    isLoading: rtIsLoading,
    error: rtError,
    refetch: rtRefetch,
  } = useFetch("rapidapi", "quote", {
    symbol: params.id,
    interval: "1min",
  });

  // Stock time series api based on the time intervals
  const { data, isLoading, error, refetch } = useFetch(
    "rapidapi",
    "time_series",
    {
      ...activeTab.params,
      symbol: params.id,
    }
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    rtRefetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("There is an error: ", error);
    }
  }, [error]);

  useEffect(() => {
    if (rtData?.symbol && data?.meta?.symbol) {
      refreshFirebaseData();
    }
  }, [rtData?.symbol]);

  const refreshFirebaseData = async () => {
    const docSnap = await getDoc(stocksRef);
    if (docSnap.exists()) {
      if (isOutOfDate(docSnap.data().lastUpdate.toDate())) {
        await updateDoc(stocksRef, watchListObj(data, rtData));
      }
    }
  };

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
      const docSnap = await getDoc(stocksRef);
      if (docSnap.exists()) {
        await updateDoc(stocksRef, watchListObj(data, rtData));
      } else {
        await setDoc(doc(db, "stocks", params.id), watchListObj(data, rtData));
      }
    };
    isFollowed ? unFollowItem() : followItem();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.white },
          headerShown: true,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              icon={"arrow-back-outline"}
              dimension={20}
              handlePress={() => router.back()}
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
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <SkeletonChooser type={"stockDetails"} />
        ) : error ? (
          <Text>
            Exceeded api call limit. Please wait and scroll down to refresh.
          </Text>
        ) : (
          <>
            {Object.keys(data)?.length != 0 && Object.keys(rtData) != 0 ? (
              <>
                <StockHeader
                  symbol={rtData?.symbol}
                  name={rtData?.name}
                  close={rtData?.close}
                  timeData={data}
                />
                <IntervalTabs
                  tabs={timeIntervals}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  refetch={refetch}
                />
                <StockChart timeData={data} />
              </>
            ) : (
              <SkeletonChooser type={"stockDetails"} />
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
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: 22,
            color: COLORS.primary,
            marginBottom: 4,
            marginTop: 16,
            paddingHorizontal: "5%",
          }}
        >
          News
        </Text>
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
