import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Constants from "../../constants";
import styles from "./style";

type Props = {
  ButtonTitle: String,
  FirstLatter: String,
  ButtonWidth: Number,
  onButtonPress: Object,
  firstIcon: Boolean,
  FrontImage: Object,
};

const BorderButton = ({
  ButtonTitle,
  FirstLatter,
  ButtonWidth,
  onButtonPress,
  firstIcon,
  FrontImage,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onButtonPress}
      style={ButtonWidth ? styles.container : styles.container}
    >
      <View style={styles.flexRow}>
        {FirstLatter && firstIcon === true ? (
          <View style={styles.firstImageStyle}>
            <Image source={FrontImage} />
          </View>
        ) : (
          // <Text style={styles.TextStyle1}>{FirstLatter}</Text>
          null
        )}
        <Text style={styles.TextStyle}>{ButtonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BorderButton;
