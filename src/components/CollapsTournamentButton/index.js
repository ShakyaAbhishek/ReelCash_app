import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./style";
import Constants from "../../constants";

type props = {
  buttonTitle: String,
  onPressButton:Object,
  iconPositon: Boolean,
};

const CollapsTournamentButton = ({ buttonTitle, onPressButton, iconPositon }: props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPressButton} style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleTextStyle}>{buttonTitle}</Text>
      </View>
      <View style={styles.downImageWrapper}>
        <Image style={{transform: [{ rotate: iconPositon===true?'180deg':'270deg'}]}} source={Constants.Images.ArrowDownGreenIcon} />
      </View>
    </TouchableOpacity>
  );
};

export default CollapsTournamentButton;
