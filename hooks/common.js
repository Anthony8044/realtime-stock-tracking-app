import React from "react";
import moment from "moment-timezone";
import { Alert, Share } from "react-native";
import { Timestamp, arrayRemove, doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { RAPID_API_KEY } from "@env";
import { auth, db } from "../firebase-config";
import Toast from "react-native-root-toast";

// Use the react native share to share stocks 
const onShare = async (symbol, exchange) => {
  try {
    const result = await Share.share({
      message:
        `Check out ${symbol} | ${exchange} on Google Finance` +
        "\n" +
        `https://g.co/finance/${symbol}:${exchange}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

// To check if data is 1 hour out of date
const isOutOfDate = (itemDate) => {
  const oneHourAgo = moment().subtract(1, "hours");
  const newDate = moment(itemDate).tz("Asia/Hong_Kong").isBefore(oneHourAgo);
  // myArray.filter(stat => moment(stat.date, PARSE_FORMAT).isAfter(twoMinutesAgo));
  return newDate;
};

// To check if any of the user array is out of date
const isOutOfDateArray = (itemArray) => {
  const oneHourAgo = moment().subtract(1, "hour");
  const newArray = itemArray.find((item) =>
    moment(item.lastUpdate.toDate()).tz("Asia/Hong_Kong").isBefore(oneHourAgo)
  );
  return newArray ? true : false;
};

// function creating the watchlist object
const watchListObj = (data, rtData) => {
  const dataObj = {
    symbol: rtData?.symbol,
    price: Number(rtData?.close),
    name: rtData?.name,
    percentChange: Number(
      ((Number(data?.values[0]?.close) -
        Number(data?.values[data?.values?.length - 1]?.open)) /
        Number(data?.values[0]?.close)) *
        100
    ),
    change: Number(
      Number(rtData?.close) -
        Number(data?.values[data?.values?.length - 1]?.open)
    ),
    lastUpdate: Timestamp.now(),
  };
  return dataObj;
};

// Fetch and update the watchlist data in the "stocks" collection
const fetchAndUpdate = async (symbols) => {
  let options = {
    method: "GET",
    url: `https://twelve-data1.p.rapidapi.com/time_series`,
    params: { interval: "15min", outputsize: "30", symbol: symbols.toString() },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
    },
  };
  let errorMessage;
  let data;

  try {
    const response = await axios.request(options);
    if (response.data?.code === 429) {
      errorMessage = response.data?.message;
    } else if (response.data?.code === 400) {
      errorMessage = response.data?.message;
    } else {
      data = response.data;
    }
    console.log("API request from: ", "rapidapi");
  } catch (error) {
    errorMessage = error?.message ?? error;
  }
  const newData = data
    ? Object.entries(
        symbols.length === 1 ? { [symbols.toString()]: { ...data } } : data
      )
    : [];
  if (newData && newData.length > 0) {
    // console.log("data: ", newData);
    let arrayUpdates = [];
    newData.forEach(async (item) => {
      const docRef = doc(db, "stocks", item[1].meta.symbol);
      arrayUpdates.push(
        updateDoc(docRef, {
          price: Number(item[1].values[0].close),
          lastUpdate: Timestamp.now(),
          percentChange: Number(
            ((Number(item[1]?.values[0]?.close) -
              Number(item[1]?.values[item[1]?.values?.length - 1]?.open)) /
              Number(item[1]?.values[0]?.close)) *
              100
          ),
          change: Number(
            Number(item[1]?.values[0]?.close) -
              Number(item[1]?.values[item[1]?.values?.length - 1]?.open)
          ),
        })
      );
    });
    await Promise.all(arrayUpdates);
    Toast.show("Watchlist data updated", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  } else if (errorMessage) {
    Toast.show("Could not refreshed watchlist data", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  return "Completed";
};

const deleteWatchlist = async (item) => {
  const userRef = doc(db, "users", auth.currentUser.uid);
  try {
    await updateDoc(userRef, {
      watchList: arrayRemove(item),
    });
  } catch (error) {
    console.log("Could'nt delete: ", error);
  }
};

export {
  onShare,
  isOutOfDate,
  watchListObj,
  isOutOfDateArray,
  fetchAndUpdate,
  deleteWatchlist,
};
