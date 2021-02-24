import React from "react";
import { TouchableOpacity, Image } from "react-native";
import styles from "./style";
import Constants from "../../constants";

type props = {
  OnBackPress: Object,
};

const BackButton = ({ OnBackPress }: props) => {
  return (
    <TouchableOpacity
      onPress={OnBackPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Image
        style={styles.imageStyle}
        resizeMode={"contain"}
        source={Constants.Images.BackIcon}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
