import React, { useState, useEffect } from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { styles } from "./AnalyticsStyles";

export default (props) => {
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    propsForLabels: { inlineSize: 1 },
  };
  const label = (color, title, value, id) => (
    <TouchableOpacity
      onPress={() => props.setCurrentAd(id)}
      key={id}
      style={[
        styles.labelContainer,
        props.currentAd === id
          ? {
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 7,
            }
          : {},
      ]}
    >
      <View
        style={[
          styles.labelColor,
          {
            backgroundColor: color,
          },
        ]}
      />
      <Text style={styles.labelText}>{value} -</Text>
      <Text style={{ color: "#fff" }}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <PieChart
        data={props.chartData}
        width={Dimensions.get("window").width * 0.9}
        height={Dimensions.get("window").height * 0.25}
        chartConfig={chartConfig}
        accessor={"count"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[0, 0]}
        absolute
        hasLegend={false}
      />
      <View style={styles.labels}>
        {props.chartData.map((obj) =>
          label(obj.color, obj.name, obj.count, obj.index)
        )}
      </View>
    </View>
  );
};
