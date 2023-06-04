import React from "react";
import moment from "moment-timezone";
import { Alert, Share } from "react-native";
import { Timestamp } from "firebase/firestore";

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

const isOutOfDate = (itemDate) => {
  const oneHourAgo = moment().subtract(1, "hours");
  const newDate = moment(itemDate).tz("Asia/Hong_Kong").isBefore(oneHourAgo);
  // myArray.filter(stat => moment(stat.date, PARSE_FORMAT).isAfter(twoMinutesAgo));
  return newDate;
};

const isOutOfDateArray = (itemArray) => {
  const oneHourAgo = moment().subtract(1, "hours");
  const newArray = itemArray.filter((item) =>
    moment(item.lastUpdate.toDate()).tz("Asia/Hong_Kong").isBefore(oneHourAgo)
  );
  return newArray.length > 0 ? true : false;
};

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

export { onShare, isOutOfDate, watchListObj, isOutOfDateArray };
