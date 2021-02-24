import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageBackground, FlatList } from "react-native";
import Constants from "../../constants";
import { useSelector } from "react-redux";
import PriceDetailWrapper from "../PriceDetailWrapper";
import styles from "./style";

type props = {
  data: Array,
  tournamentImage: String,
  fistUserData: Object,
};

const ContestOngoingCardDetail = ({ data, tournamentImage }: props) => {
  const [winnerListData, setWinnerListData] = useState([]);
  const [firstRankUserData, setFirstRankUserData] = useState({});

  const user = useSelector((state) => state.user);
  const { userData } = user;

  useEffect(() => {
    const rankingList = [...data];
    const FirstrankiUser = data[0];
    console.warn("j----------------_>sdsddsd---->",JSON.stringify(FirstrankiUser,undefined,2));
    setFirstRankUserData({...FirstrankiUser});
    const listData = rankingList.shift();
    setWinnerListData(rankingList);
  }, []);

  const renderItems = ({ item, index }) => {
    return (
      <View style={styles.listItemWrapper}>
        <View
          style={[
            item.icon ? styles.topPosWrapper : { flex: 1, paddingLeft: 7 },
          ]}
        >
          <Text
            style={[
              styles.greenPosText,
              item.user_id === userData.id && styles.textColorBlue,
            ]}
          >
            {index + 2 < 10 ? `0${index + 2}` : `${index + 2}`}
          </Text>
          {item.icon && <Image source={Constants.Images.FishBadgeGreenIcon} />}
        </View>
        <View style={styles.flex1half}>
          <Text
            style={[
              styles.listItemTextWhite,
              item.user_id === userData.id && styles.textColorBlue,
            ]}
          >
            {item.user_name}
          </Text>
        </View>
        <View style={styles.flex1}>
          <Text
            style={[
              styles.listItemTextWhite,
              item.user_id === userData.id && styles.textColorBlue,
            ]}
          >
            {item.points}
          </Text>
        </View>
        <View style={styles.flex1half}>
          <Text
            style={[
              styles.listItemTextWhite,
              item.user_id === userData.id && styles.textColorBlue,
            ]}
          >
            {item.species}
          </Text>
        </View>
        <View style={styles.flex1}>
          <Text
            style={[
              styles.listItemTextWhite,
              item.user_id === userData.id && styles.textColorBlue,
            ]}
          >
            {`${item.fish_length} in`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.tournamentImageWrapper}>
        <ImageBackground
          style={styles.tImageHeightWidth}
          imageStyle={styles.tImageStyle}
          source={{ uri: tournamentImage }}
        ></ImageBackground>
      </View>
      <View style={styles.winnerTagWrapper}>
        <PriceDetailWrapper
          leftWhite={true}
          rightGreen={true}
          Icon={Constants.Images.BadgeBlackIcon}
          firstText={"Winner"}
        />
      </View>
      {Object.keys(firstRankUserData).length !==0 ? <>
      <View style={styles.listHeadingWrapper}>
        <View style={styles.flex1}>
          <Text style={styles.listHeadingTextStyle}>Pos.</Text>
        </View>
        <View style={styles.flex1half}>
          <Text style={styles.listHeadingTextStyle}>Name</Text>
        </View>
        <View style={styles.flex1}>
          <Text style={styles.listHeadingTextStyle}>Points</Text>
        </View>
        <View style={styles.flex1half}>
          <Text style={styles.listHeadingTextStyle}>Fish</Text>
        </View>
        <View style={styles.flex1}>
          <Text style={styles.listHeadingTextStyle}>Length</Text>
        </View>
      </View>
      <View style={styles.listItemWrapper}>
        <View style={styles.topPosWrapper}>
          <Text style={styles.greenPosText}>01</Text>
          <Image source={Constants.Images.FishBadgeGreenIcon} />
        </View>
        <View style={styles.flex1half}>
          <Text style={styles.listItemTextWhite}>{firstRankUserData.user_name}</Text>
        </View>
        <View style={styles.flex1}>
          <Text style={styles.listItemTextWhite}>{firstRankUserData.points}</Text>
        </View>
        <View style={styles.flex1half}>
          <Text style={styles.listItemTextWhite}>{firstRankUserData.species}</Text>
        </View>
        <View style={styles.flex1}>
          <Text style={styles.listItemTextWhite}>{firstRankUserData.fish_length} in</Text>
        </View>
      </View>
      </>: null}
      {winnerListData.length !== 0 && <View>
        <View style={styles.runnerUpWrapper}>
          <PriceDetailWrapper
            leftWhite={false}
            rightGreen={false}
            Icon={Constants.Images.MadleWhiteIcon}
            firstText={"Runner Ups"}
          />
        </View>
        <View style={styles.listHeadingWrapper1}>
          <View style={styles.flex1}>
            <Text style={styles.listHeadingTextStyle}>Pos.</Text>
          </View>
          <View style={styles.flex1half}>
            <Text style={styles.listHeadingTextStyle}>Name</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.listHeadingTextStyle}>Points</Text>
          </View>
          <View style={styles.flex1half}>
            <Text style={styles.listHeadingTextStyle}>Fish</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.listHeadingTextStyle}>Length</Text>
          </View>
        </View>
        {/* <Text style={{color: '#ffffff'}}>{winnerListData.length}</Text> */}
        <FlatList
          style={styles.flatlistStyle}
          data={winnerListData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
        />
      </View>}
    </View>
  );
};

export default React.memo(ContestOngoingCardDetail);
