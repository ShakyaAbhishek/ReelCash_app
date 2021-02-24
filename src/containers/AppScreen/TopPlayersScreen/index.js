import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import Constants from "../../../constants";
import {
  HeaderWithTitle,
  CardShdowWrapper,
  TabBarRank,
  TabBar,
} from "../../../components";
import ScrollableTabView from "react-native-scrollable-tab-view";
import styles from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";

type props = {
  navigation: Object,
};

const headerList = [
  {
    id: 0,
    lable: "World",
  },
  {
    id: 1,
    lable: "State/prov",
  },
];
const headerList1 = [
  {
    id: 0,
    lable: "Official Rank",
  },
  {
    id: 1,
    lable: "Fantasy Rank",
  },
];
const headerList2 = [
  {
    id: 0,
    lable: "Master",
  },
  {
    id: 1,
    lable: "Superfish",
  },
];

const TopPlayersScreen = ({ navigation }: props) => {
  const [rankingData, setRankingData] = useState([
    { position: 4, playerName: "skyforcoding", points: 950, id: 1 },
    { position: 5, playerName: "skyforcoding", points: 930, id: 2 },
    { position: 6, playerName: "skyforcoding", points: 920, id: 3 },
    { position: 7, playerName: "skyforcoding", points: 910, id: 4 },
    { position: 8, playerName: "skyforcoding", points: 850, id: 5 },
    { position: 9, playerName: "skyforcoding", points: 650, id: 6 },
    { position: 10, playerName: "skyforcoding", points: 550, id: 7 },
    { position: 11, playerName: "skyforcoding", points: 450, id: 8 },
  ]);
  const backPress = () => {
    navigation.goBack();
  };

  const renderItems = ({ item, index }) => {
    return (
      <View style={styles.listingCardWrapper}>
        <View style={styles.flexCenter}>
          <View style={styles.rankCircleWrapper}>
            <Text style={styles.rankTextStyle}>{item.position}</Text>
          </View>
        </View>
        <View style={styles.flex3Center}>
          <CardShdowWrapper>
            <TouchableOpacity
              style={styles.buttonWrapper}
              activeOpacity={0.8}
              onPress={rankUserClick}
            >
              <View style={styles.listCardWrapper}>
                <View style={styles.flex1}>
                  <Text style={styles.rankerNameTextStyle}>skyforcoding</Text>
                </View>
                <View style={styles.flexCenter}>
                  <Text style={styles.rankNumberTextStyle}>{item.points}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </CardShdowWrapper>
        </View>
      </View>
    );
  };

  const rankUserClick = () => {
    navigation.navigate("ProfileScreen", { otherUserView: true });
  };

  const listHeader = () => {
    return (
      <>
        <View style={styles.paddingTop20}>
          <View style={styles.selectorWrapper}>
            <Text style={styles.selectorTextStyle}>Masters</Text>
            <Image source={Constants.Images.ArrowDownGreenIcon} />
          </View>
        </View>
        {/* <Text style={styles.myStaticsTextStyle}>My Statistics</Text> */}
        <CardShdowWrapper>
          <View style={styles.userRankCard}>
            <View style={styles.userImageNameWrapper}>
              <View style={styles.userImageWrapper}>
                <Image
                  style={styles.userImageStyle}
                  source={Constants.Images.DummyImage}
                />
              </View>
              <Text style={styles.userRankTextStyle}>#13</Text>
            </View>
            <View style={styles.flexCenter}>
              <Text style={styles.rankerNameTextStyle}>skyforcoding</Text>
            </View>
            <View style={styles.flexCenter}>
              <Text style={styles.rankNumberTextStyle}>790 Pts.</Text>
            </View>
          </View>
        </CardShdowWrapper>
        <View style={styles.rankTitleWrapper}>
          <View style={styles.flexCenter}>
            <Text style={styles.rankTitleText1}>Position</Text>
          </View>
          <View style={styles.flex3row}>
            <View style={styles.flex1}>
              <Text style={styles.rankTitleText1}>Player Name</Text>
            </View>
            <View style={styles.flexCenter}>
              <Text style={styles.rankTitleText2}>Points</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"Reel Cash Rankings"}
        backArrow={true}
        forwordArrow={false}
        backPress={backPress}
      />
      <SafeAreaView style={styles.container1}>
        <CardShdowWrapper>
          <View style={styles.topRankingCard}>
            <View style={styles.topRankingCard1}>
              <View style={styles.flexCenter}>
                <TouchableOpacity
                  onPress={rankUserClick}
                  activeOpacity={0.8}
                  style={styles.secondPersonImageWrapper}
                >
                  <Image
                    resizeMethod={"auto"}
                    style={styles.secondThirdImageStyle}
                    source={Constants.Images.DummyImage}
                  />
                  <Image
                    style={styles.secondThirdrankTag}
                    source={Constants.Images.RankTwoTag}
                  />
                </TouchableOpacity>
                {/* <Text style={[styles.rankerNameTextStyle, styles.marginTop15]}>
                skyforcoding
              </Text>
              <Text style={styles.rankNumberTextStyle}>1020</Text> */}
              </View>
              <View style={styles.flexCenter}>
                <TouchableOpacity
                  onPress={rankUserClick}
                  activeOpacity={0.8}
                  style={styles.firstRankerImageWrapper}
                >
                  <Image
                    resizeMethod={"auto"}
                    style={styles.firstRankerImageStyle}
                    source={Constants.Images.DummyImage}
                  />
                  <Image
                    style={styles.firstRankTagStyle}
                    source={Constants.Images.RankOneTag}
                  />
                </TouchableOpacity>
                {/* <Text style={[styles.rankerNameTextStyle, styles.marginTop15]}>
                skyforcoding
              </Text>
              <Text style={styles.rankNumberTextStyle}>1020</Text> */}
              </View>
              <View style={styles.flexCenter}>
                <TouchableOpacity
                  onPress={rankUserClick}
                  activeOpacity={0.8}
                  style={styles.thirdRankerImageWrapper}
                >
                  <Image
                    resizeMethod={"auto"}
                    style={styles.secondThirdImageStyle}
                    source={Constants.Images.DummyImage}
                  />
                  <Image
                    style={styles.secondThirdrankTag}
                    source={Constants.Images.RankThirdTag}
                  />
                </TouchableOpacity>
                {/* <Text style={[styles.rankerNameTextStyle, styles.marginTop15]}>
                skyforcoding
              </Text>
              <Text style={styles.rankNumberTextStyle}>1020</Text> */}
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.rankerNameTextStyle, styles.marginTop15]}>
                  skyforcoding
                </Text>
                <Text style={styles.rankNumberTextStyle}>1020</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.rankerNameTextStyle, styles.marginTop15]}>
                  skyforcoding
                </Text>
                <Text style={styles.rankNumberTextStyle}>1020</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.rankerNameTextStyle, styles.marginTop15]}>
                  skyforcoding
                </Text>
                <Text style={styles.rankNumberTextStyle}>1020</Text>
              </View>
            </View>
          </View>
        </CardShdowWrapper>
        <View style={styles.listingWrapper}>
          <ScrollableTabView
            renderTabBar={() => <TabBarRank />}//<TabBar headerList={headerList} />}
            style={styles.ScrollableTabStyle}
            prerenderingSiblingsNumber={4}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={listHeader}
              keyExtractor={(item) => item.id}
              data={rankingData}
              renderItem={renderItems}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={listHeader}
              keyExtractor={(item) => item.id}
              data={rankingData}
              renderItem={renderItems}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={listHeader}
              keyExtractor={(item) => item.id}
              data={rankingData}
              renderItem={renderItems}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={listHeader}
              keyExtractor={(item) => item.id}
              data={rankingData}
              renderItem={renderItems}
            />
            {/* <View style={{ flex: 1 }}>
              <ScrollableTabView
                renderTabBar={() => <TabBar headerList={headerList1} />}
                style={styles.ScrollableTabStyle}
                prerenderingSiblingsNumber={4}
              >
                <View style={{ flex: 1 }}>
                  <ScrollableTabView
                    renderTabBar={() => <TabBar headerList={headerList2} />}
                    style={styles.ScrollableTabStyle}
                    prerenderingSiblingsNumber={4}
                  >
                    <View style={{ flex: 1 }}>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={listHeader}
                        keyExtractor={(item) => item.id}
                        data={rankingData}
                        renderItem={renderItems}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={listHeader}
                        keyExtractor={(item) => item.id}
                        data={rankingData}
                        renderItem={renderItems}
                      />
                    </View>
                  </ScrollableTabView>
                </View>
                <View style={{ flex: 1 }}>
                  <ScrollableTabView
                    renderTabBar={() => <TabBar headerList={headerList2} />}
                    style={styles.ScrollableTabStyle}
                    prerenderingSiblingsNumber={4}
                  >
                    <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={listHeader}
                        keyExtractor={(item) => item.id}
                        data={rankingData}
                        renderItem={renderItems}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={listHeader}
                        keyExtractor={(item) => item.id}
                        data={rankingData}
                        renderItem={renderItems}
                      />
                    </View>
                  </ScrollableTabView>
                </View>
              </ScrollableTabView>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollableTabView
                renderTabBar={() => <TabBar headerList={headerList1} />}
                style={styles.ScrollableTabStyle}
                prerenderingSiblingsNumber={4}
              >
                <View style={{ flex: 1 }}>
                  <ScrollableTabView
                    renderTabBar={() => <TabBar headerList={headerList2} />}
                    style={styles.ScrollableTabStyle}
                    prerenderingSiblingsNumber={4}
                  >
                    <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={listHeader}
                        keyExtractor={(item) => item.id}
                        data={rankingData}
                        renderItem={renderItems}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={listHeader}
                        keyExtractor={(item) => item.id}
                        data={rankingData}
                        renderItem={renderItems}
                      />
                    </View>
                  </ScrollableTabView>
                </View>
                <View style={{ flex: 1 }}>
                  <ScrollableTabView
                    renderTabBar={() => <TabBar headerList={headerList2} />}
                    style={styles.ScrollableTabStyle}
                    prerenderingSiblingsNumber={4}
                  >
                    <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={listHeader}
                        keyExtractor={(item) => item.id}
                        data={rankingData}
                        renderItem={renderItems}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={listHeader}
                        keyExtractor={(item) => item.id}
                        data={rankingData}
                        renderItem={renderItems}
                      />
                    </View>
                  </ScrollableTabView>
                </View>
              </ScrollableTabView>
            </View> */}
          </ScrollableTabView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TopPlayersScreen;


