import React from "react";
import useFetch from "../../hooks/useFetch";
import { ActivityIndicator, Text, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import StockNewsCard from "./StockNewsCard";

const StockNews = ({ symbol }) => {
  const { data, isLoading, error, refetch } = useFetch("alphavantage", "", {
    function: "NEWS_SENTIMENT",
    tickers: symbol,
    limit: 10,
  });
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <>
          {Object.keys(data).length != 0 && (
            <>
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 22,
                  color: COLORS.primary,
                  marginBottom: 4,
                  marginTop: 16,
                }}
              >
                News
              </Text>
              {data?.feed.length > 0 &&
                data.feed
                  ?.slice(0, 5)
                  .map((item, index) => (
                    <StockNewsCard item={item} index={index} />
                  ))}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default StockNews;
