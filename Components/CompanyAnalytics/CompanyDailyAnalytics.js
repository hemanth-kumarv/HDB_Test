import React, { useState, useEffect } from "react";
import { Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default (props) => {
  const colors = [
    "#18B9DF",
    "#B078E2",
    "#8CFB76",
    "#EC02EA",
    "#EFB746",
    "#E32350",
    "#536A65",
    "#63F0D9",
    "#FD4254",
  ];
  const newdata = props.data.Data.Data.filter(
    (obj) => obj.Date === props.currentDate
  );
  let chartData = [],
    index = 0;
  if (newdata.length)
    newdata[0].Details.forEach((ad) => {
      console.log(ad);
      ad.Count.forEach((location) =>
        chartData.push({
          name: ad.AdTitle + "\n" + location.Location,
          count: location.Count,
          color: colors[index++],
          legendFontColor: "#9F9F9F",
          legendFontSize: 15,
        })
      );
    });

  console.log(chartData);
  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    propsForLabels: { inlineSize: 1 },
  };
  return (
    <>
      {chartData.length ? (
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width * 0.9}
          height={Dimensions.get("window").height * 0.25}
          chartConfig={chartConfig}
          accessor={"count"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[0, -20]}
          absolute
        />
      ) : (
        <Text style={{ color: "#fff", fontSize: 25, textAlign: "center" }}>
          No ads were displayed on {"\n" + props.currentDate}
        </Text>
      )}
    </>
  );
};
