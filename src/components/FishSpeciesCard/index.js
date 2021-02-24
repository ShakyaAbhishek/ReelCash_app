import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import styles from "./style";
import Constants from "../../constants";
import CardShdowWrapper from "../CardShdowWrapper";

type props = {
  name: String,
  image: Object,
};
const FishSpeciesCard = ({ name, image }: props) => {
  return (
    <CardShdowWrapper>
      <View style={styles.cardWrapper}>
        <View style={styles.cardImageWrapper}>
          <Image style={styles.cardImageStyle} source={image} />
        </View>
        <View style={styles.cardDetailWrapper}>
          <View style={styles.flex1}>
            <Text style={styles.cardTextStyle}>{name}</Text>
          </View>
          <Image source={Constants.Images.InfoGreenIcon} />
        </View>
      </View>
    </CardShdowWrapper>
  );
};
export default FishSpeciesCard;
