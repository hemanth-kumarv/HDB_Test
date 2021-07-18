import React, { useState, useEffect } from "react";
import { Dimensions, Text } from "react-native";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { styles } from "./AnalyticsStyles";

export default (props) => {
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };
  return (
    <View>
      <Text
        style={styles.lineChartContainer}
      >
        Statistics
      </Text>
      <LineChart
        data={{
          labels: props.data.Data.MonthlySummary.map((obj) => obj.Month),
          datasets: [
            {
              data: props.data.Data.MonthlySummary.map((obj) => obj.Revenue),
            },
          ],
        }}
        width={Dimensions.get("window").width * 0.9} // from react-native
        height={Dimensions.get("window").height * 0.25}
        yAxisLabel="Rs. "
        // yAxisSuffix="k"
        yAxisInterval={2} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          //   margin: 8,
          padding: 10,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
