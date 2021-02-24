import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, Image, Animated, Dimensions } from "react-native";
import { ColorButton, BorderButton, ContestOngoingCardDetail } from "../../components";
import * as userActions from '../../actions/user-actions-types';
import { useSelector, useDispatch } from 'react-redux';
import Constants from "../../constants";
import styles from "./style";
import Toast from 'react-native-toast-message';
import moment from "moment";
import { numWithComma } from '../../utilities/validation';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type props = {
  contestName: String,
  dateTime: String,
  upcoming: Boolean,
  onScreenMove: Object,
  cardImage: String,
  dPricePool: String,
  dFirstPrice: String,
  dEntryFee: String,
  dType: String,
  dSpecies: String,
  APIResult: Boolean,
  privateTournament: String,
  tournamentCreateTime: String,
  onPressLeaderBoard: Object,
  showLeaderBoard: Boolean,
  contestId: Number,
  is_joined_Status: Number,
};

const calculateTimeLeft = (time) => {
  const timeStamp = moment(time).valueOf();

  const difference = timeStamp - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  // console.warn('time ', timeLeft.days)
  return timeLeft.days;
};
const calculateDaysLeft = (startTime, finshTime) => {
  console.warn(finshTime);
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

const ContestCard = ({
  contestName,
  dateTime,
  upcoming,
  onScreenMove,
  cardImage,
  dPricePool,
  dFirstPrice,
  dEntryFee,
  dType,
  dSpecies,
  APIResult,
  privateTournament,
  tournamentCreateTime,
  onPressLeaderBoard,
  showLeaderBoard,
  contestId,
  is_joined_Status,
  no_of_catches,
  item,
  id
}: props) => {
  const { type } = item
  const navigation = useNavigation()
  const [showDetail, setShowDetail] = useState(false);
  const [showOngoingDetails, setShowOngoingDetails] = useState(false);
  const [rankingList, setRankingList] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { userData, userToken } = user;
  // const beforeMaxComputation=useMemo(()=>maxComputation(),[])
  const daysDiffrence = useMemo(() => calculateDaysLeft(tournamentCreateTime, dateTime), []);
  const dyasLeft = useMemo(() => calculateTimeLeft(dateTime), []);

  const onSuperFish = (type) => {
    if (type == 'Submit') {
      navigation.navigate('UploadImageScreen')
    } else {
      // navigation.navigate('ViewSubmission', { id: item.id })
    }
  }

  const onMasterButtonClick = (type) => {
    if (type == 'Submit') {
      navigation.navigate('UploadImageScreen')
    } else if (Number(type)) {
      // navigation.navigate('ViewSubmission', { id: item.id })
    }
  }

  const getRankingFunction = (tournament_Id) => {
    if (userToken != '') {
      const data = {
        id: tournament_Id,
      };
      dispatch(
        userActions.getOngoingRankingList({
          data,
          callback: ({ result, error }) => {
            if (!error) {
              if (result.success === true) {
                const { ongoing_catch_details } = result.data;
                const dummy_Data = [];
                ongoing_catch_details.map(i => {
                  const obj = {
                    ...i[0],
                  }
                  dummy_Data.push(obj);

                });
                setRankingList([...dummy_Data]);
                setShowOngoingDetails(true);
              }
            }
          },
        })
      );
    }
    else {
      Toast.show({
        type: "info",
        text1: "Info Message",
        text2: 'User not login',
      });
    }
  }

  let progressPercentage = 0;
  progressPercentage = Math.ceil((dyasLeft / daysDiffrence) * 100);
  progressPercentage = `${100 - progressPercentage}%`;
  return (
    <View >
      <View style={styles.container}>
        {showOngoingDetails !== true ? <TouchableOpacity activeOpacity={0.5} onPress={onScreenMove} style={styles.contestImageWrapper}>
          <Image
            resizeMode={"cover"}
            style={styles.contestImageStyle}
            source={{ uri: cardImage }}
          />
          {privateTournament === 'yes' && <View style={{ position: 'absolute', zIndex: 1, top: 5, right: 5 }}><Text style={[styles.cardDetailText, { color: Constants.Colors.BlueColor }]}>Private</Text></View>}
        </TouchableOpacity> : null}
        <View style={styles.contestNameWrapper}>
          <View style={styles.fishImageWrapper}>
            <Image
              style={styles.fishImageStyle}
              source={Constants.Images.BlueFishIcon}
            />
          </View>
          <View style={styles.nameTimeWrapper}>
            <Text style={styles.contestNameTextStyle}>{contestName}</Text>
            <Text style={styles.dateTimeTextStyle}>{`${moment(dateTime).format("DD MMM YYYY")} @ ${moment(dateTime).format("HH:mm")}`}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={onScreenMove}>
            {showOngoingDetails !== true ?
              <View style={styles.plusIconWrapper}>
                <Image source={Constants.Images.WhitePlusIcon} />
              </View>
              : <TouchableOpacity activeOpacity={0.8} onPress={() => setShowOngoingDetails(false)} style={styles.plusIconWrapper}>
                <Text style={{ color: 'white', fontSize: 28, marginBottom: 10 }}>{'-'}</Text>
              </TouchableOpacity>}
          </TouchableOpacity>
        </View>
        {upcoming === true ? (
          <View style={styles.upcomingContainer}>
            <View style={styles.marginHorizontal20}>
              <View style={styles.progressBarWrapper}>
                <View style={styles.progressBarLinestyle} />
                <View style={[styles.completeLineStyle, { width: progressPercentage }]} />
              </View>
              <Text style={styles.daysLeftTextStyle}>{`${calculateTimeLeft(dateTime) === 0 ? "few hours left" : calculateTimeLeft(dateTime) === undefined ? "few hours left" : `${calculateTimeLeft(dateTime)} days left`}`}</Text>
            </View>
            <View style={styles.flexRow}>
              <View style={styles.detailsLineStyle}>
                <View style={styles.detailLine} />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowDetail(!showDetail)}
                style={styles.detailsButtonStyle}
              >
                <Text style={styles.detailButtonTextStyle}>Details</Text>
                <Image
                  style={{
                    transform: [{ rotate: showDetail ? "180deg" : "0deg" }],
                  }}
                  source={Constants.Images.DownArrowWhite}
                />
              </TouchableOpacity>
            </View>
            {showDetail && (
              <View style={styles.contestDetailWrapper}>
                <View style={styles.upperTextWrapper}>
                  <View style={styles.flexWithCenter}>
                    <Text style={styles.whiteHeadingText}>Prize Pool</Text>
                    <Text style={styles.greenHeadingText}>{`$ ${numWithComma(dPricePool)}`}</Text>
                  </View>
                  <View style={styles.flexWithCenter}>
                    <Text style={styles.whiteHeadingText}>First Prize</Text>
                    <Text style={styles.greenHeadingText}>{`$ ${numWithComma(dFirstPrice)}`}</Text>
                  </View>
                  <View style={styles.flexWithCenter}>
                    <Text style={styles.whiteHeadingText}>Entry Fee</Text>
                    <Text style={styles.greenHeadingText}>{`$ ${numWithComma(dEntryFee)}`}</Text>
                  </View>
                </View>
                <View style={styles.bottomTextWrapper}>
                  <View style={styles.flexWithCenter}>
                    <Text style={styles.whiteHeadingText}>Type</Text>
                    <Text style={styles.greenHeadingText}>{`${dType}`}</Text>
                  </View>
                  <View style={styles.flexWithCenter}>
                    <Text style={styles.whiteHeadingText}>Location</Text>
                    <Text style={styles.greenHeadingText}>All</Text>
                  </View>
                  <View style={styles.flexWithCenter}>
                    <Text style={styles.whiteHeadingText}>Species</Text>
                    <Text style={styles.greenHeadingText}>{`${dSpecies}`}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        ) : (
            <View>
              {showOngoingDetails !== true ? <View style={styles.buttonsWrapper}>
                <ColorButton
                  ButtonWidth={165}
                  OnPressButton={() => getRankingFunction(contestId)}
                  ButtonText={"Leaderboard"}
                />
                {type != 'Superfish' && <TouchableOpacity disabled={is_joined_Status == 0 ? true : false}
                  onPress={() => onMasterButtonClick(no_of_catches == 0 ? 'Submit' : no_of_catches)}>
                  <BorderButton ButtonWidth={165} ButtonTitle={is_joined_Status == 0 ? "Not Joined" : no_of_catches == 0 ? 'Submit Catch' : `${no_of_catches} of 5 Submitted`} />
                </TouchableOpacity>}
                {type == 'Superfish' && <TouchableOpacity onPress={() => onSuperFish(no_of_catches > 0 ? "View" : "Submit")}>
                  <BorderButton ButtonWidth={165} ButtonTitle={no_of_catches > 0 ? "View Submission" : "Submit Catch"} />
                </TouchableOpacity>}
              </View> : null}
              {showOngoingDetails === true && <View style={styles.detailsContainer}>
                <ContestOngoingCardDetail tournamentImage={cardImage} data={rankingList} />
              </View>}
            </View>
          )}
      </View>
    </View>
  );
};

export default React.memo(ContestCard);
