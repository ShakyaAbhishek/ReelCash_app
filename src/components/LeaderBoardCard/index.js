import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Constants from "../../constants";
import CardShdowWrapper from "../CardShdowWrapper";
import styles from "./style";

type props = {
  navigation: Object,
};

const LeaderBoardCard = ({ navigation }: props) => {
  return (
    <CardShdowWrapper>
      <View style={styles.leaderBoardWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("MyStatisticsScreen")}
          style={styles.flexCenter}
        >
          <Text style={styles.countPriceText}>01</Text>
          <Text style={styles.typeTextStyle}>Tournaments</Text>
        </TouchableOpacity>
        <View style={styles.leaderGreenWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("TopPlayersScreen")}
            style={styles.leaderBoardGreenButton}
          >
            <Image source={Constants.Images.BadgeGreenIcon} />
            <Text style={styles.leaderGreenText}>Rankings</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("MyStatisticsScreen")}
          style={styles.flexCenter}
        >
          <Text style={styles.countPriceText}>$200</Text>
          <Text style={styles.typeTextStyle}>Dollars Won</Text>
        </TouchableOpacity>
      </View>
    </CardShdowWrapper>
  );
};

export default LeaderBoardCard;
