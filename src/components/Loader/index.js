import React from "react";
import { useSelector } from "react-redux";
import { View, Image, Text, ActivityIndicator } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import constants from "../../constants";
import styles from "./style";

const CustomIndicator = () => (
  <View style={styles.container}>
    <ActivityIndicator size={"large"} color={constants.Colors.GreenColor} />
    <Text
      style={{
        fontSize: 14,
        color: "green",
        fontFamily: "ProximaNova-Regular",
      }}
    >
      Please Wait...
    </Text>
  </View>
);

const Loader = () => {
  const { loading } = useSelector((state) => state.app);

  return (
    <Spinner visible={loading}>
      <CustomIndicator />
    </Spinner>
  );
};

export default Loader;
