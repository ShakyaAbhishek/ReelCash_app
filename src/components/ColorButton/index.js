import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./style";
import Constants from "../../constants";
type Props = {
  ButtonText: String,
  OnPressButton: Object,
  ButtonWidth: Number,
};

const ColorButton = ({ ButtonText, OnPressButton, ButtonWidth }: Props) => {
  return (
    <TouchableOpacity
      onPress={OnPressButton}
      activeOpacity={0.8}
      style={ButtonWidth ? styles.container1 : styles.container}
    >
      <Text style={styles.TextStyle}>{ButtonText}</Text>
    </TouchableOpacity>
  );
};

export default ColorButton;
