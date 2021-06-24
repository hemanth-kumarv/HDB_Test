import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  Easing,
  Animated,
  Image,
  Button,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { styles } from "./adQueueStyles";

const AdRow = ({ data, active }) => {
  const prevActive = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(prevActive, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(active),
      useNativeDriver: true,
    }).start();
    // updateActive(active);
  }, [active]);

  return (
    <Animated.View
      style={[
        styles.row,
        {
          transform: [
            {
              scale: prevActive.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          elevation: prevActive.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      ]}
    >
      {console.log(data, active)}
      <Image source={{ uri: data.image }} style={styles.image} />
      <Text style={styles.text}>{data.text}</Text>
    </Animated.View>
  );
};

export default AdRow;
