import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import Constants from "../../../constants";
import { HeaderWithTitle } from "../../../components";
import styles from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../actions/user-actions-types";

const region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

type props = {
  navigation: Object,
  route: Object,
};

const FishDetailScreen = ({ navigation, route }: props) => {
  const [fishDetailData, setFishDetailData] = useState({});
  const { fishName, fishData } = route.params;
  const [fishTitleImage, setFishTitleImage] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // console.warn(fishData);
    apiCallingFunction(fishData);
  }, []);

  const onPressLikeButton = () => {
    const { userData } = user;
    const data = {
      user_id: userData.id,
      catch_id: fishData,
    };
    dispatch(
      userActions.catchLike({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            // console.warn("fsdfsdlajffa---->",result);
            apiCallingFunction(fishData);
          }
        },
      })
    );
  };

  const apiCallingFunction = (catchId) => {
    const data = {
      id: catchId,
    };
    dispatch(
      userActions.addLivewellDetails({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              const { catchDetails } = result.data;
              console.warn(
                "sdhfksahf",
                JSON.stringify(catchDetails, undefined, 2)
              );
              setFishDetailData(catchDetails);
              // console.log(
              //   "this is the fish details log is here---------> Image log",
              //   JSON.stringify(catchDetails.catch_images, undefined, 2)
              // );
              setFishTitleImage([...catchDetails.catch_images]);
            }
          }
        },
      })
    );
  };

  const onPressSubmitFish = () => {
    const { id } = fishDetailData;
    const data = {
      userId: user.userData.id,
      catchId: id,
    };
    navigation.navigate("SelectTournamentScreen", {
      fishDetails: data,
      addFishDetail: false,
    });
  };

  const imageRenderItem = ({ item, index }) => {
    // alert(index);
    return (
      <View style={styles.fishImageWrapper1}>
        <Image
          resizeMode={'stretch'}
          style={[styles.fishImageStyle]}
          source={{ uri: item.images }}
          // source={fishDetailData && fishDetailData.catch_images.lenght >0?{uri: fishDetailData.catch_images[0].images}:Constants.Images.DummyImage}
        />
      </View>
    );
  };

  const backPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={`${fishName}   `}
        backArrow={true}
        forwordArrow={false}
        backPress={backPress}
      />
      <SafeAreaView style={styles.container1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.fishImageWrapper}>
            <FlatList
              horizontal
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              legacyImplementation={false}
              data={fishTitleImage}
              renderItem={imageRenderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={{}}></View>
          <View style={styles.likeCommentWrapper}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={onPressLikeButton}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <ImageBackground
                style={styles.likeButtonWrapper}
                source={Constants.Images.BlueRoundShadow}
              >
                <Image source={Constants.Images.HeartIcon} />
              </ImageBackground>
              <Text style={styles.likeCommentTextStyle}>
                {fishDetailData.no_of_likes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              activeOpacity={0.4}
              onPress={() =>
                navigation.navigate("CommentsScreen", {
                  catch_id: fishDetailData.id,
                  fish_img: fishTitleImage,
                  species_name: fishDetailData.species,
                })
              }
            >
              <ImageBackground
                style={styles.likeButtonWrapper}
                source={Constants.Images.BlueRoundShadow}
              >
                <Image source={Constants.Images.MsgWhiteIcon} />
              </ImageBackground>
              <Text style={styles.likeCommentTextStyle}>
                {fishDetailData.no_of_comments}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lableCatchWrapper}>
            <Text style={styles.lableTextStyle}>Catch Information</Text>
          </View>
          <View style={styles.catchDetailWrapper}>
            <View style={styles.catchDetailInfoIcon}>
              <View style={styles.flexHalf}>
                <Image source={Constants.Images.BlueCalenderIcon} />
              </View>
              <View style={styles.flex4}>
                <Text style={styles.catchDetailTextStyle}>
                  {fishDetailData.date}
                </Text>
              </View>
            </View>
            <View style={styles.catchDetailInfoIcon}>
              <View style={styles.flexHalf}>
                <Image source={Constants.Images.FishBlueIcon} />
              </View>
              <View style={styles.flex4}>
                <Text style={styles.catchDetailTextStyle}>
                  {fishDetailData.species}
                </Text>
              </View>
            </View>
            <View style={styles.catchDetailInfoIcon}>
              <View style={styles.flexHalf}>
                <Image source={Constants.Images.BlueLocationIcon} />
              </View>
              <View style={styles.flex4}>
                <Text style={styles.catchDetailTextStyle}>
                  {fishDetailData.state}
                </Text>
              </View>
            </View>
            <View style={styles.catchDetailInfoIcon}>
              <View style={styles.flexHalf}>
                <Image source={Constants.Images.BlueCupIcon} />
              </View>
              <View style={styles.flex4}>
                <Text style={styles.catchDetailTextStyle1}>
                  Entered into Tournament:
                </Text>
                <Text style={styles.catchDetailTextStyle1}>
                  Rainy Lake Challenge
                </Text>
              </View>
              {fishDetailData.status === "1" ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPressSubmitFish}
                  // onPress={() => navigation.navigate("SelectTournamentScreen")}
                  style={styles.plusIconWrapper}
                >
                  <Image source={Constants.Images.WhitePlusIcon} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={styles.lableStatisticWrapper}>
            <Text style={styles.lableTextStyle}>Statistics</Text>
          </View>
          <View style={styles.statisticsDetailWrapper}>
            <View style={styles.leftHeadingWrapper}>
              <Text style={styles.leftheadingTextStyle}>Length</Text>
              <Text
                style={styles.rightTextStyle}
              >{`${fishDetailData.fish_length} inches`}</Text>
            </View>
            <View style={styles.leftHeadingWrapper}>
              <Text style={styles.leftheadingTextStyle}>Points</Text>
              <Text
                style={styles.rightTextStyle}
              >{`${fishDetailData.points} pts`}</Text>
            </View>
            <View style={styles.leftHeadingWrapper}>
              <Text style={styles.leftheadingTextStyle}>State</Text>
              <Text style={styles.rightTextStyle}>{fishDetailData.state}</Text>
            </View>
            <View style={styles.leftHeadingWrapper}>
              <Text style={styles.leftheadingTextStyle}>Verified</Text>
              <View style={styles.flexRow}>
                <Image
                  style={styles.marginHorizontal5}
                  source={Constants.Images.FishBadgeGreenIcon}
                />
                <Text style={styles.catchDetailTextStyle}>
                  {fishDetailData.date}
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.locationLableWrapper}>
            <Text style={styles.lableTextStyle}>Location Details</Text>
          </View>
          <View style={styles.locationViewStyle}>
            <View style={{ flex: 1 }}>
              <MapView
                style={{ flex: 1 }}
                region={region}
                provider={PROVIDER_GOOGLE}
                onRegionChange={this.onRegionChange}
              >
                <Marker
                  coordinate={region}
                  title={"Current Location"}
                  description={"Current Location"}
                />
              </MapView>
            </View>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default FishDetailScreen;
