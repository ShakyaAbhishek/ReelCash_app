import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import Constants from "../../constants";

type props = {
    onFloatButtonPress:Object,
}

const FloatRoundButton = ({onFloatButtonPress}:props) => {
    return(
      <TouchableOpacity onPress={onFloatButtonPress} activeOpacity={0.6} style={styles.buttonWrapper}>
        <Image style={styles.cameraImageStyle} source={Constants.Images.CameraIcon} />
      </TouchableOpacity>
    )
  }
export default FloatRoundButton;
