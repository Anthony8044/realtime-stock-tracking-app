import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COLORS } from "../../constants";

const StockChart = ({ timeData }) => {
  const reversed = timeData?.values?.slice()?.reverse();

  //   console.log("timeData: ", timeData);
  return (
    <>
      <LineChart
        data={{
          datasets: [
            {
              data: reversed?.map((a) => a.close),
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get("window").width - 16}
        lab
        height={220}
        yAxisLabel={"$"}
        withDots={false}
        chartConfig={{
          backgroundColor: COLORS.lightWhite,
          backgroundGradientFrom: COLORS.lightWhite,
          backgroundGradientTo: COLORS.lightWhite,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(49, 38, 81, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginBottom: -24,
          marginTop: 10,
          borderRadius: 16,
        }}
      />
    </>
  );
};

export default StockChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
