import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Constants from "../../../constants";
import {
  Header,
  BorderButton,
  LeaderBoardCard,
  ColorButton,
} from "../../../components";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../actions/user-actions-types";
import { openDatabase } from 'react-native-sqlite-storage';
import moment from "moment";
import { useFocusEffect } from '@react-navigation/native';

type props = {
  navigation: Object,
};

var db = openDatabase({ name: 'UserDatabase.db' });
const LiveWellScreen = ({ navigation }: props) => {
  const [catchFishData, setCatchFishData] = useState([
    // {
    //   "id": 24,
    //   "user_id": 23,
    //   "tournament_id": null,
    //   "date": "0000-00-00",
    //   "species": "Bass",
    //   "state": "Washington",
    //   "fish_length": "60",
    //   "status": "1",
    //   "created_at": "2021-01-07T12:00:14.000000Z",
    //   "updated_at": "2021-01-07T12:00:14.000000Z",
    //   "no_of_likes": 1,
    //   "no_of_comments": 0,
    //   "user_name": "Jio India",
    //   "catch_images": [
    //     {
    //       "id": 49,
    //       "catch_id": 24,
    //       "images": "https://api.reelcash.com/catch_images/4636365691610020814.jpg",
    //       "created_at": "2021-01-07T12:00:14.000000Z",
    //       "updated_at": "2021-01-07T12:00:14.000000Z"
    //     },
    //     {
    //       "id": 50,
    //       "catch_id": 24,
    //       "images": "https://api.reelcash.com/catch_images/12931659951610020814.jpg",
    //       "created_at": "2021-01-07T12:00:14.000000Z",
    //       "updated_at": "2021-01-07T12:00:14.000000Z"
    //     }
    //   ]
    // },
    // {
    //   "id": 25,
    //   "user_id": 23,
    //   "tournament_id": null,
    //   "date": "0000-00-00",
    //   "species": "Bass",
    //   "state": "Washington",
    //   "fish_length": "60",
    //   "status": "1",
    //   "created_at": "2021-01-07T12:00:14.000000Z",
    //   "updated_at": "2021-01-07T12:00:14.000000Z",
    //   "no_of_likes": 1,
    //   "no_of_comments": 0,
    //   "user_name": "Jio India",
    //   "catch_images": [
    //     {
    //       "id": 49,
    //       "catch_id": 24,
    //       "images": "https://api.reelcash.com/catch_images/4636365691610020814.jpg",
    //       "created_at": "2021-01-07T12:00:14.000000Z",
    //       "updated_at": "2021-01-07T12:00:14.000000Z"
    //     },
    //     {
    //       "id": 50,
    //       "catch_id": 24,
    //       "images": "https://api.reelcash.com/catch_images/12931659951610020814.jpg",
    //       "created_at": "2021-01-07T12:00:14.000000Z",
    //       "updated_at": "2021-01-07T12:00:14.000000Z"
    //     }
    //   ]
    // },
  ]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useFocusEffect(React.useCallback(() => {
    createUserInfoTable();
    apiCallingFunction();
  }, []))

  // useEffect(()=>{
  //   createUserInfoTable();
  //   apiCallingFunction();
  // },[])

  const createUserInfoTable = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='clicked_images'",
        [],
        function (tx, res) {
          // console.warn('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS clicked_images(id INTEGER(10) PRIMARY KEY, type VARCHAR(4), imageData VARCHAR)',
              [],
            );
            // txn.executeSql(
            //   'CREATE TABLE IF NOT EXISTS offline_livewell(user_id VARCHAR(10) PRIMARY KEY, tournament_id VARCHAR(20), species VARCHAR(20), state VARCHAR(20), fish_length VARCHAR(10), date VARCHAR(10), images TEXT)',
            //   [],
            // );
          }
        },
      );
    });
  }

  const apiCallingFunction = () => {
    const { userData } = user;
    const data = {
      user_id: userData.id,
    }
    dispatch(
      userActions.getLiveWellList({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              const { catchList } = result.data;
              setCatchFishData(catchList.data);
            }
          }
        }
      })
    )
  }

  const priceButton = () => {
    navigation.navigate("MyStatisticsScreen");
  };

  const profileIconPress = () => {
    navigation.navigate("ProfileScreen", { otherUserView: false });
  };

  const addButton = () => {
    navigation.navigate("UploadImageScreen");
  };

  const onPressLike = (id) => {
    const { userData } = user;
    const data = {
      user_id: userData.id,
      catch_id: id,
    };
    dispatch(
      userActions.catchLike({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              apiCallingFunction();
            }
          }
        }
      })
    )
  }

  const renderItems = ({ item, index }) => {
    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate("FishDetailScreen", { fishName: item.species, fishData: item.id })
          }
        >
          <View style={styles.cardImageWrapper}>
            <Image
              resizeMode={"cover"}
              style={styles.cardImageStyle}
              source={{ uri: item.catch_images[0].images }}
            />
          </View>
          <View style={styles.cardDetailWrapper}>
            <Text numberOfLines={1} style={styles.contestNameTest}>{item.species}</Text>
            <Text
              style={styles.detailTextStyle}
            >{`Length: ${item.fish_length} inch`}</Text>
            <Text numberOfLines={1} style={styles.detailTextStyle}>{`State: ${item.state}`}</Text>
            <Text
              numberOfLines={1}
              style={styles.detailTextStyle}
            >{`Points: ${item.points} pts`}</Text>
            <Text
              style={styles.detailTextStyle}
            >{`Date: ${moment(item.date).format('DD MMM YYYY')}`}</Text>
            {item.catch_tournament.length > 0 ? (
              <Text
                numberOfLines={1}
                style={styles.detailTextStyle}
              >{`Entered: ${item.catch_tournament.length} Tournaments`}</Text>
            ) : (
                <Text style={styles.detailTextStyle}>{`   `}</Text>
              )}
          </View>
        </TouchableOpacity>
        <View style={styles.bottomButtonWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPressLike(item.id)}
          >
            <View style={styles.likeCommentWrapper}>
              <ImageBackground
                source={Constants.Images.BlueRoundShadow}
                style={styles.likeButtonWrapper}
              >
                <Image source={Constants.Images.HeartIcon} />
              </ImageBackground>
              <Text style={styles.likeTextStyle}>{item.no_of_likes}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("CommentsScreen", { catch_id: item.id, fish_img: item.catch_images[0].images, species_name: item.species })}
          >
            <View style={styles.likeCommentWrapper}>
              <ImageBackground
                style={styles.likeButtonWrapper}
                source={Constants.Images.BlueRoundShadow}
              >
                <Image source={Constants.Images.MsgWhiteIcon} />
              </ImageBackground>
              <Text style={styles.commentTextStyle}>{item.no_of_comments}</Text>
              <View style={styles.bluePointStyle} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const EmptyListComponet = () => {
    return (
      <View style={{ height: '100%', alignSelf: 'center', marginTop: '50%' }}>
        {/* <Text style={[styles.noDataTextStyle, { textAlign: 'center' }]}>Sorry!</Text> */}
        <Text style={styles.noDataTextStyle}>Want to see how you stack up in the Fantasy Rankings? Just add your catches here!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header
          pressLeftButton={priceButton}
          profileIconPress={profileIconPress}
        />
        <View style={styles.container1}>
          <LeaderBoardCard navigation={navigation} />
          <View style={styles.contestWrapper}>
            <FlatList
              data={catchFishData}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              renderItem={renderItems}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={EmptyListComponet}
            />
          </View>
          <View style={styles.addButtonWrapper}>
            <ColorButton
              ButtonWidth={164}
              OnPressButton={addButton}
              ButtonText={"+ Add Catch"}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LiveWellScreen;
