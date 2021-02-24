import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { HeaderWithTitle, CardShdowWrapper } from "../../../components";
import Constants from "../../../constants";
import styles from "./style";

type props = {
  navigation: Object,
};

const MyStatisticsScreen = ({ navigation }: props) => {
  const [winningData, setWinningData] = useState([
    {
      id: 1,
      tournamentName: "Bethel Park",
      playedTime: "Played on 24 Feb 2020",
      points: 421,
      winningAmount: "$800,000",
    },
    {
      id: 2,
      tournamentName: "Lake Fresh",
      playedTime: "Played on 24 Feb 2020",
      points: 400,
      winningAmount: "$100,000",
    },
    {
      id: 3,
      tournamentName: "Mater Classic",
      playedTime: "Played on 24 Feb 2020",
      points: 213,
      winningAmount: "$0",
    },
    {
      id: 4,
      tournamentName: "Superfish",
      playedTime: "Played on 24 Feb 2020",
      points: 124,
      winningAmount: "$500",
    },
  ]);
  const renderItems = ({ item, index }) => {
    return (
      <>
        <View style={styles.listItemWrapper}>
          <View style={styles.srNoWrapper}>
            <Text style={styles.srNoTextStyle}>{item.id}</Text>
          </View>
          <View style={styles.itemTPWWrapper}>
            <CardShdowWrapper>
              <View style={styles.tpwShadowWrapper}>
                <View style={styles.tournamentWrapper}>
                  <Text style={styles.tournamentNameText}>
                    {item.tournamentName}
                  </Text>
                  <Text style={styles.tournamentTimeText}>
                    {item.playedTime}
                  </Text>
                </View>
                <View style={styles.pointsWrapper}>
                  <Text style={styles.pointsTextStyle}>{item.points}</Text>
                </View>
                <View style={styles.winningWrapper1}>
                  <Text style={styles.amountTextStyle}>
                    {item.winningAmount}
                  </Text>
                </View>
              </View>
            </CardShdowWrapper>
          </View>
        </View>
      </>
    );
  };
  const backPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"My Statistics       "}
        backArrow={true}
        forwordArrow={false}
        backPress={backPress}
      />
      <SafeAreaView style={styles.container1}>
        <View style={styles.headerCardWrapper}>
          <CardShdowWrapper>
            <TouchableOpacity
              onPress={() => navigation.navigate("TopPlayersScreen")}
              activeOpacity={0.8}
            >
              <View style={styles.smallCardWrapper}>
                <Text style={styles.headingWhiteText}>#4</Text>
                <Text style={styles.headerCardTitle}>My position</Text>
              </View>
            </TouchableOpacity>
          </CardShdowWrapper>
          <CardShdowWrapper>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("TransactionScreen")}
            >
              <View style={styles.smallCardWrapper}>
                <Text style={styles.headingWhiteText}>$305</Text>
                <Text style={styles.headerCardTitle}>Total Winnings</Text>
              </View>
            </TouchableOpacity>
          </CardShdowWrapper>
        </View>
        <View style={styles.titleWrapper}>
          <View style={styles.flexRow}>
            <View style={styles.SrWrapper}>
              <Text style={styles.titleTextStyle}>#</Text>
            </View>
            <View style={styles.tpwWrapper}>
              <View style={styles.tournamentWrapper}>
                <Text style={styles.titleTextStyle}>Tournament</Text>
              </View>
              <View style={styles.pointsWrapper}>
                <Text style={styles.titleTextStyle}>Points</Text>
              </View>
              <View style={styles.winningWrapper}>
                <Text style={styles.titleWonText}>Won</Text>
              </View>
            </View>
          </View>
        </View>
        <FlatList
          data={winningData}
          renderItem={renderItems}
          keyExtractor={(item) => {
            item.id;
          }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default MyStatisticsScreen;
