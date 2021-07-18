import React, { useState, useEffect } from "react";
import { Dimensions, Text } from "react-native";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default (props) => {
  const chartConfig = {
    backgroundColor: "#3466af",
    backgroundGradientFrom: "#3466af",
    backgroundGradientTo: "#3466af",
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "3",
      strokeWidth: "1",
      stroke: "#ffcb05",
    },
  };
  return (
    <LineChart
      data={{
        labels: [
          "00",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
        ].filter((i, j) => j % 2 === 0),
        datasets: [{ data: props.chartData[props.currentAd].timeSlots }],
      }}
      width={Dimensions.get("window").width * 0.9} // from react-native
      height={Dimensions.get("window").height * 0.3}
      //   yAxisLabel="Rs. "
      // yAxisSuffix="k"
      yAxisInterval={4} // optional, defaults to 1
      chartConfig={chartConfig}
      bezier
      style={{
        //   margin: 8,
        padding: 5,
        borderRadius: 16,
      }}
    />
  );
};
