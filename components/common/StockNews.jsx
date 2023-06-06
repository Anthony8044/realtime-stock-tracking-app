import React from "react";
import useFetch from "../../hooks/useFetch";
import { ActivityIndicator, Text, View } from "react-native";
import { COLORS } from "../../constants";
import StockNewsCard from "./StockNewsCard";
import SkeletonChooser from "./SkeletonChooser";

const StockNews = ({ symbol }) => {
  const { data, isLoading, error, refetch } = useFetch("alphavantage", "", {
    function: "NEWS_SENTIMENT",
    tickers: symbol,
    sort: "RELEVANCE",
    limit: 10,
  });
  const stockData =
    data?.feed?.length > 0
      ? data?.feed?.length > 5
        ? data.feed?.slice(0, 5)
        : data?.feed
      : [];
  return (
    <View>
      {isLoading ? (
        <SkeletonChooser type={"watchList"} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <>
          {Object.keys(data).length != 0 && (
            <>
              {stockData.length > 0 &&
                stockData.map((item, index) => (
                  <StockNewsCard item={item} index={index} key={index} />
                ))}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default StockNews;
