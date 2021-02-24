//import liraries
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, Animated, TouchableHighlight, FlatList, Share, ActivityIndicator } from "react-native";
import {
  HeaderWithTitle,
  ColorButton,
  BorderButton,
  CollapsTournamentButton,
  PriceDetailWrapper,
  Counter,
} from "../../../components";
import Constants from "../../../constants";
import styles from "./style";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as userActions from '../../../actions/user-actions-types';
import { useSelector, useDispatch } from 'react-redux';
import HTML from "react-native-render-html";
import moment from "moment";
import Tooltip from 'react-native-walkthrough-tooltip';
import Toast from "react-native-toast-message";
import { numWithComma } from '../../../utilities/validation';

type props = {
  navigation: Object,
  route: Object,
};

const calculateTimeLeft = (startTime, finshTime) => {
  // console.warn(finshTime);
  const timeStamp = moment(startTime).valueOf();
  const fTimeStamp = moment(finshTime).valueOf();
  const difference = fTimeStamp - timeStamp;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft.days;
};


const TournamentDetailScreen = ({ navigation, route }: props) => {
  const [showUpcomingDetail, setShowUpcomingDetail] = useState(false);
  const [tounamentDetails, setTournamentdetails] = useState({});
  const [tounamentSubEvent, setTournamentSubEvent] = useState([]);
  const [tournamentSponsor, setTournamentSponsor] = useState([]);
  const [tournamentSpecies, setTournamentSpecies] = useState([]);
  const [torunamentLocation, setTournamentLocation] = useState([]);
  const [tournamentProof, setTournamentProof] = useState([]);
  const [apiResult, setApiResult] = useState(false);
  const [speciesToolTip, setSpeciesToolTip] = useState(false);
  const [loactionToolTip, setLocationToolTip] = useState(false);
  const [tStartTime, setTStartTime] = useState('');
  const [tFinishTime, setTFinishTime] = useState('2021-01-20 00:00:00');

  const [showOverView, setShowOverView] = useState(false);
  const [showESpecies, setShowESpecies] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [viewToolTip, setViewToolTip] = useState(false);

  const { upComingScreen, TournamentId } = route.params;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userData, userToken } = user;
  useEffect(() => {
    const { userData } = user;
    apiCallingFunction(TournamentId, userData.id);
  }, []);

  const apiCallingFunction = (item, userId) => {
    const data = {
      id: item,
      my_id: userId,
    };
    dispatch(
      userActions.getOperatorDetails({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              const { tournament } = result.data;
              setApiResult(true);
              setTournamentdetails(tournament.tournament_details);
              setTStartTime(tournament.tournament_details.start_time);
              setTFinishTime(tournament.tournament_details.finish_time);
              setTournamentLocation(tournament.tournaments_location);
              setTournamentSpecies(tournament.tournaments_species);
              setTournamentSponsor(tournament.tournaments_sponsors);
              setTournamentSubEvent(tournament.tournaments_sub_events);
              setTournamentProof(tournament.tournaments_proof);
              // console.warn('this is the tur?namnent operator details screen--->', JSON.stringify(result, undefined, 2));
            }
            else {
              setApiResult(true);
            }
          }
        }
      })
    )
  }

  const shareButtonPress = async () => {
    Share.share({
      message: 'share',
    })
      .then((result) => console.warn(result))
      .catch((errorMsg) => console.earn(errorMsg));
  }

  const onPressJoinButton = () => {
    if (userToken !== "") {
      if (tounamentDetails.join_enable === "no") {
        Toast.show({
          type: "info",
          text1: "Info Massage",
          text2: "Tournament has already started.",
        });
      }
      else {
        navigation.navigate("JoinTournamentScreen", { tounamentData: tounamentDetails, subEventsData: tounamentSubEvent });
      }
    } else {
      navigation.navigate('LoginScreen');
    }
  }

  const backPress = () => {
    navigation.goBack();
  };

  const renderSponsorList = ({ item, index }) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.sponsorImageStyle}>
            <Image style={{ height: '100%', width: '100%', resizeMode: 'contain' }} source={{ uri: item.images }} />
          </View>
        </View>
        {item.title != "" && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text numberOfLines={1} style={styles.sapratorTextStyle} >{item.title}</Text></View>}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"Tournament Details"}
        backArrow={true}
        forwordArrow={false}
        backPress={backPress}
      />
      <SafeAreaView style={styles.container1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {
              apiResult === false ?

                <View>
                  {/* <ActivityIndicator size={'large'} color={Constants.Colors.GreenColor} /> */}
                </View>
                :
                <View style={styles.mainWrapper}>
                  <View style={styles.tImageWrapper}>
                    <Image
                      resizeMethod={"auto"}
                      style={styles.tImageStyle}
                      // source={Constants.Images.DummyImage}
                      source={{ uri: tounamentDetails.cover_img }}
                    />
                  </View>
                  <View style={styles.tournamentNameTimeWrapper}>
                    <View style={{ width: "80%" }}>
                      <Text style={styles.tNameStyle}>{tounamentDetails.title}</Text>
                      <View style={styles.shareButtonWrapper}>
                        <TouchableOpacity onPress={() => shareButtonPress()} activeOpacity={0.8}>
                          <Image
                            resizeMode={"cover"}
                            // style={styles.shareImageStyle}
                            source={Constants.Images.ShareIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.tTimeStyle}>
                      {`${moment(tStartTime).format("DD MMM YYYY")} @ ${moment(tStartTime).format("HH:mm")} - ${moment(tFinishTime).format("DD MMM YYYY")} @ ${moment(tFinishTime).format("HH:mm")}`}
                    </Text>
                  </View>
                  <View style={styles.locationPriceWrapper}>
                    <View style={styles.dollarWrapper}>
                      <Image source={Constants.Images.CoinWhiteIcon} />
                      <View style={styles.marginLeft10}>
                        <Text style={styles.locationWhiteText}>${numWithComma(tounamentDetails.wPrize)}</Text>
                        <Text style={styles.locationGreenText}>Prize</Text>
                      </View>
                      <View />
                    </View>
                    <View style={styles.locationWrapper}>
                      <Image source={Constants.Images.LocationWhiteIcon} />
                      <View style={styles.marginLeft10}>
                        <Text style={styles.locationWhiteText}>
                          {torunamentLocation && torunamentLocation.length > 0 && torunamentLocation[0].value}
                        </Text>
                        <Tooltip
                          isVisible={loactionToolTip}
                          useReactNativeModal={true}
                          contentStyle={{ backgroundColor: Constants.Colors.DarkGrayColor }}
                          content={<View>
                            <Text style={styles.detailGreenHeadingStyle1}>{'Location'}</Text>
                            <FlatList data={torunamentLocation} keyExtractor={item => item.value} renderItem={({ item, index }) => {
                              return (
                                <View style={{ paddingVertical: 5, borderColor: Constants.Colors.GreenColor, borderBottomWidth: 1, }}>
                                  <Text style={styles.detailGreenHeadingStyle}>{item.value}</Text>
                                </View>
                              )
                            }} />
                          </View>}
                          placement="top"
                          onClose={() => setLocationToolTip(!loactionToolTip)}
                        >
                          <TouchableOpacity activeOpacity={0.8} onPress={() => setLocationToolTip(true)} style={styles.touchable}>
                            <Text style={styles.locationGreenText}>Location</Text>
                          </TouchableOpacity>
                        </Tooltip>

                      </View>
                    </View>
                  </View>
                  {tounamentDetails.joined_status === 0 && tounamentDetails.join_enable === 'yes' ? (
                    <View style={styles.upComingWrapper}>
                      <View style={styles.tAllDetailWrapper}>
                        <View style={styles.flexCenter}>
                          <Text style={styles.detailHeadingStyle}>Type</Text>

                          <Tooltip
                            isVisible={viewToolTip}
                            useReactNativeModal={true}
                            contentStyle={{ backgroundColor: Constants.Colors.DarkGrayColor }}
                            content={<View><Text style={styles.detailGreenHeadingStyle1}>{'Type'}</Text><Text style={styles.detailGreenHeadingStyle}>{tounamentDetails.type}</Text></View>}
                            placement="top"
                            onClose={() => setViewToolTip(!viewToolTip)}
                          >
                            <TouchableOpacity activeOpacity={0.8} onPress={() => setViewToolTip(true)} style={styles.touchable}>
                              <Text style={styles.detailGreenHeadingStyle}>{tounamentDetails.type}</Text>
                            </TouchableOpacity>
                          </Tooltip>
                        </View>
                        <View style={styles.flexCenter}>
                          <Text style={styles.detailHeadingStyle}>First Prize</Text>
                          <Text style={styles.detailGreenHeadingStyle}>${numWithComma(tounamentDetails.fRunnerUp)}</Text>
                        </View>
                        <View style={styles.flexCenter}>
                          <Text style={styles.detailHeadingStyle}>Species</Text>
                          {/* <Text style={styles.detailGreenHeadingStyle}>{tounamentDetails.no_of_species}</Text> */}
                          <Tooltip
                            isVisible={speciesToolTip}
                            useReactNativeModal={true}
                            contentStyle={{ backgroundColor: Constants.Colors.DarkGrayColor }}
                            content={<View>
                              <Text style={styles.detailGreenHeadingStyle1}>{'Species'}</Text>
                              <FlatList data={tournamentSpecies} keyExtractor={item => item.value} renderItem={({ item, index }) => {
                                return (
                                  <View style={{ paddingVertical: 5, borderColor: Constants.Colors.GreenColor, borderBottomWidth: 1, }}>
                                    <Text style={styles.detailGreenHeadingStyle}>{item.value}</Text>
                                  </View>
                                )
                              }} />
                            </View>}
                            placement="top"
                            onClose={() => setSpeciesToolTip(!speciesToolTip)}
                          >
                            <TouchableOpacity activeOpacity={0.8} onPress={() => setSpeciesToolTip(true)} style={styles.touchable}>
                              <Text style={styles.detailGreenHeadingStyle}>{tounamentDetails.no_of_species}</Text>
                            </TouchableOpacity>
                          </Tooltip>
                        </View>
                        <View style={styles.flexCenter}>
                          <Text style={styles.detailHeadingStyle}>Entry Fee</Text>
                          <Text style={styles.detailGreenHeadingStyle}>${numWithComma(tounamentDetails.entry_fee)}</Text>
                        </View>
                        <View style={styles.flexCenter}>
                          <Text style={styles.detailHeadingStyle}>Duration</Text>
                          <Text style={styles.detailGreenHeadingStyle}>{`${calculateTimeLeft(tStartTime, tFinishTime)} days`}</Text>
                        </View>
                      </View>
                      <View style={styles.paddingVertical20}>
                        <Text style={styles.sapratorTextStyle}>Prize Details</Text>
                      </View>
                      <View style={styles.paddingHorizontal35}>
                        <PriceDetailWrapper
                          firstText={"Total Prize:"}
                          secondText={numWithComma(tounamentDetails.wPrize)}
                          leftWhite={true}
                          rightGreen={true}
                          Icon={Constants.Images.CupDarkIcon}
                        />
                        <View style={styles.paddingVertical15}>
                          <PriceDetailWrapper
                            firstText={"Winner:"}
                            secondText={numWithComma(tounamentDetails.fRunnerUp)}
                            leftWhite={false}
                            rightGreen={false}
                            Icon={Constants.Images.BadgeWhiteIcon}
                          />
                        </View>
                        <PriceDetailWrapper
                          firstText={"Runner Up:"}
                          secondText={numWithComma(tounamentDetails.sRunnerUp)}
                          leftWhite={false}
                          rightGreen={false}
                          Icon={Constants.Images.MadleWhiteIcon}
                        />
                      </View>
                      <View style={styles.paddingVertical25}>
                        <Text style={styles.sapratorTextStyle}>About Tournament</Text>
                      </View>
                      <View style={styles.paddingHorizontal17}>
                        {tounamentDetails.tOverview !== "" && <View style={styles.paddingBottom14}>
                          <CollapsTournamentButton
                            iconPositon={showOverView}
                            onPressButton={() => setShowOverView(!showOverView)}
                            buttonTitle={"Tournament Overview"}
                          />
                          {showOverView && <View style={styles.HTMLViewStyle}>
                            <HTML
                              tagsStyles={{ p: { color: Constants.Colors.WhiteColor } }}
                              source={{ html: tounamentDetails.tOverview }} contentWidth={'100%'} />
                          </View>}
                        </View>}
                        {tounamentDetails.eSpecies !== "" && <View style={styles.paddingBottom14}>
                          <CollapsTournamentButton iconPositon={showESpecies} onPressButton={() => setShowESpecies(!showESpecies)} buttonTitle={"Eligible Species"} />
                          {showESpecies && <View style={styles.HTMLViewStyle}>
                            <HTML
                              tagsStyles={{ p: { color: Constants.Colors.WhiteColor } }}
                              source={{ html: tounamentDetails.eSpecies }} contentWidth={'100%'} />
                          </View>}
                        </View>}
                        {tounamentDetails.tRules !== "" && <View style={styles.paddingBottom14}>
                          <CollapsTournamentButton
                            iconPositon={showRules}
                            onPressButton={() => setShowRules(!showRules)}
                            buttonTitle={"Rules and Regulations"}
                          />
                          {showRules && <View style={styles.HTMLViewStyle}>
                            <HTML
                              tagsStyles={{ p: { color: Constants.Colors.WhiteColor } }}
                              source={{ html: `${tounamentDetails.tRules}` }} contentWidth={'100%'} />
                          </View>}
                        </View>}
                        {tounamentDetails.pCategories !== "" && <View>
                          <CollapsTournamentButton iconPositon={showPrice} onPressButton={() => setShowPrice(!showPrice)} buttonTitle={"Prize Categories"} />
                          {showPrice && <View style={styles.HTMLViewStyle}>
                            <HTML
                              tagsStyles={{ p: { color: Constants.Colors.WhiteColor } }}
                              source={{ html: tounamentDetails.pCategories }} contentWidth={'100%'} />
                          </View>}
                        </View>}
                      </View>
                    </View>
                  ) : (
                      <View>
                        <Text style={styles.sapratorTextStyle1}>
                          Tournament Starts In
              </Text>
                        <View>
                          <Counter time={tStartTime} />
                        </View>
                      </View>
                    )}
                  {tournamentSponsor.length !== 0 && <View>
                    <View style={[styles.paddingTop25, styles.paddingBottom10]}>
                      <Text style={styles.sapratorTextStyle}>Sponsors</Text>
                    </View>
                    <View style={[styles.locationPriceWrapper, styles.evenlyCenter]}>
                      <FlatList
                        data={tournamentSponsor}
                        renderItem={renderSponsorList}
                        numColumns={2}
                      />
                    </View></View>}
                  <>
                    {tounamentDetails.joined_status == 0 && tounamentDetails.join_enable === 'yes' ? (
                      <View style={styles.joinButtonWrapper}>
                        <ColorButton
                          ButtonWidth={165}
                          OnPressButton={onPressJoinButton}
                          ButtonText={"Join!"}
                        />
                      </View>
                    ) : (
                        <View style={styles.twoButtonWrapper}>
                          <ColorButton
                            ButtonWidth={165}
                            OnPressButton={() => console.warn("dd")}
                            ButtonText={"My Entries"}
                          />
                          <BorderButton ButtonWidth={165} ButtonTitle={"Already Joined"} />
                        </View>
                      )}
                  </>
                  {/* } */}
                </View>
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TournamentDetailScreen;
