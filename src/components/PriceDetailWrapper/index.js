import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import Constants from "../../constants";
import styles from "./style";

type props = {
  Icon: String,
  firstText: String,
  secondText: String,
  leftWhite: Boolean,
  rightGreen: Boolean,
};

const PriceDetailWrapper = ({
  Icon,
  firstText,
  secondText,
  leftWhite,
  rightGreen,
}: props) => {
  return (
    <View style={styles.container}>
      <View style={leftWhite ? styles.leftColorWrapper : styles.borderWrapper}>
        <Image source={Icon} />
      </View>
      <View
        style={rightGreen ? styles.greenRightWrapper : styles.blackRightWrapper}
      >
        <Text style={styles.locationWhiteText}>
          {firstText} <Text style={styles.secondTextStyle}>$ {secondText}</Text>
        </Text>
      </View>
    </View>
  );
};

export default PriceDetailWrapper;
