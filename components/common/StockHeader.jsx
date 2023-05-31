import React from "react";
import { Text, View } from "react-native";
import useFetch from "../../hooks/useFetch";

const StockHeader = ({ symbol, timeData }) => {
  const { data, isLoading, error } = useFetch("rapidapi", "quote", {
    symbol: symbol,
  });
  const changesPercentage =
    ((parseInt(timeData?.values[0]?.close) -
      parseInt(timeData?.values[timeData?.values?.length - 1]?.open)) /
      parseInt(timeData?.values[0]?.close)) *
    100;
  //   const newData = timeData ? Object.entries({ [symbol]: { ...timeData } }) : {};
  //   console.log(timeData.values);

  return (
    <View>
      <Text>{data?.symbol}</Text>
      <Text>{data?.name}</Text>
      <Text>{data?.close}</Text>
      <Text>{changesPercentage.toFixed(2) + "%"}</Text>
      <Text>
        {"$" +
          (
            parseInt(data?.close) -
            parseInt(timeData?.values[timeData?.values?.length - 1]?.open)
          ).toFixed(2)}
      </Text>
    </View>
  );
};

export default StockHeader;
