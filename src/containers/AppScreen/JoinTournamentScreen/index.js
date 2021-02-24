import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import {
  HeaderWithTitle,
  CardShdowWrapper,
  ColorButton,
} from "../../../components";
import Constants from "../../../constants";
import styles from "./style";
import * as userActions from '../../../actions/user-actions-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {numWithComma} from '../../../utilities/validation';

type props = {
  navigation: Object,
  route: Object,
};

const JoinTournamentScreen = ({ navigation, route }: props) => {
  const [tournamentDetailsData, setTournamentDetailsData] = useState({});
  const [subEventView, setSubEventView] = useState(false);
  const [subEventData, setSubEventdata] = useState([]);
  const { tounamentData, subEventsData } = route.params;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // const { userData } = user;
    setTournamentDetailsData(tounamentData);
    // console.warn("this is the torunament Data---->", JSON.stringify(tounamentData, undefined, 2));

    modifySubEventData(subEventsData);
  }, [])

  const modifySubEventData = (data) => {
    // console.warn("this is the subEvents Data---->", JSON.stringify(data, undefined, 2));
    const dummyData = [];
    data && data.map((i) => {
      const obj = {
        ...i,
        isSelected: false
      }
      dummyData.push(obj);
    })
    setSubEventdata(dummyData);
    // console.warn("this is the subEvents Data---->", JSON.stringify(dummyData, undefined, 2));
  }

  const backPress = () => {
    navigation.goBack();
  };

  const onJoinButtonPress = (tId) => {
    // navigation.navigate("TournamentDetailScreen", {
    //   upComingScreen: false,
    // })
    const { userData } = user;
    const data = {
      user_id: userData.id,
      tournament_id: tId,
    };
    dispatch(
      userActions.joinTournamentCall({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              navigation.pop(3);
              // console.warn('this is the jointournament detail--->', JSON.stringify(result, undefined, 2));
            }
          }
        }
      })
    )
  }

  const onPressSubEvents = (item, index) => {
    const elementsIndex = subEventData.findIndex(
      (element) => element.id === item.id
    );
    let newArray = [...subEventData];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      isSelected: !newArray[elementsIndex].isSelected,
    };
    setSubEventdata(newArray);
  }

  const renderSubEventList = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => onPressSubEvents(item, index)} style={styles.subEventsCardStyle}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bottomTextLableStyle1}>{item.subTitle}</Text>
          <Text style={styles.bottomTextLableStyle}>{item.subType}</Text>
          <Text style={styles.smallLableTextStyle}>{`${moment(item.subStartTime).format("DD MMM YYYY")} @ ${moment(item.subStartTime).format("HH:mm")} - ${moment(item.subEndTime).format("DD MMM YYYY")} @ ${moment(item.subEndTime).format("HH:MM")}`}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => onPressSubEvents(item, index)} style={styles.selectRoundWrapperStyle}>
            {item.isSelected && <View style={styles.selectRoundInnerStyle}></View>}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"Join Tournament    "}
        backArrow={true}
        forwordArrow={false}
        backPress={backPress}
      />
      <SafeAreaView style={styles.container1}>
        <View style={styles.contestNameWrapper}>
          <View style={styles.fishImageWrapper}>
            <Image
              style={styles.fishImageStyle}
              source={Constants.Images.BlueFishIcon}
            />
          </View>
          <View style={styles.nameTimeWrapper}>
            <Text style={styles.contestNameTextStyle}>
              {tournamentDetailsData.title}
            </Text>
            <Text style={styles.dateTimeTextStyle}>{`${moment(tournamentDetailsData.start_time).format("DD MMM YYYY")} @ ${moment(tournamentDetailsData.start_time).format("HH:mm")}`}</Text>
          </View>
          {/* <View style={styles.plusIconWrapper}>
            <Image source={Constants.Images.WhitePlusIcon} />
          </View> */}
        </View>
        <CardShdowWrapper>
          <View style={styles.amountDetailWrapper}>
            <View style={styles.flex1Center}>
              <Text style={styles.bigHeadingTextStyle}>$ {numWithComma(tournamentDetailsData.entry_fee)}</Text>
              <Text style={styles.smallLableTextStyle}>Cost</Text>
            </View>
            <View style={styles.flex1Center}>
              <Text style={styles.bigHeadingTextStyle}>$ 0</Text>
              <Text style={styles.smallLableTextStyle}>Deposited</Text>
            </View>
            <View style={styles.flex1Center}>
              <Text style={styles.bigHeadingTextStyle}>$ 0</Text>
              <Text style={styles.smallLableTextStyle}>Winning</Text>
            </View>
          </View>
        </CardShdowWrapper>
        <View style={styles.winningPriceDetailWrapper}>
          <View style={styles.flex1Center}>
            <Text style={styles.upTextLableStyle}>First Prize</Text>
            <Text style={styles.bottomTextLableStyle}>$ {numWithComma(tournamentDetailsData.fRunnerUp)}</Text>
          </View>
          <View style={styles.flex1Center}>
            <Text style={styles.upTextLableStyle}>Second Prize</Text>
            <Text style={styles.bottomTextLableStyle}>$ {numWithComma(tournamentDetailsData.sRunnerUp)}</Text>
          </View>
          <View style={styles.flex1Center}>
            <Text style={styles.upTextLableStyle}>Entry Fee</Text>
            <Text style={styles.bottomTextLableStyle}>$ {numWithComma(tournamentDetailsData.entry_fee)}</Text>
          </View>
        </View>
        {subEventsData.length == 0 ? null : <View style={{ paddingHorizontal: 25 }}>
          <Text style={styles.bottomTextLableStyle1}>This Tournament has sub-events you can join. There will be a leaderboard for each sub-event and an Overall Leaderboard for the entire Tournament.</Text>
          <Text style={[styles.bottomTextLableStyle1, { marginTop: 10 }]}>Select the sub-event you want to join. You can join as many as you'd like, however, it must be before the start date and time for each event.</Text>
          <TouchableOpacity onPress={() => setSubEventView(!subEventView)} activeOpacity={0.8} style={{ flexDirection: 'row', marginTop: 10, height: 40, width: '100%', borderBottomColor: Constants.Colors.TextGrayColor, borderBottomWidth: 2 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text numberOfLines={1} style={styles.contestNameTextStyle1}>{`${moment(tournamentDetailsData.start_time).format("DD MMM YYYY")}  - ${moment(tournamentDetailsData.finish_time).format("DD MMM YYYY")}`}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ transform: [{ rotate: subEventView ? '0deg' : '270deg' }] }} source={Constants.Images.ArrowDownGreenIcon} />
            </View>
          </TouchableOpacity>
          {subEventView && <View style={{ width: '100%' }}>
            <FlatList data={subEventData} renderItem={renderSubEventList} />
          </View>}
        </View>}
        <View style={styles.joinButtonWrapper}>
          <ColorButton
            ButtonWidth={165}
            OnPressButton={() => onJoinButtonPress(tournamentDetailsData.id)}
            ButtonText={"Join Now"}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default JoinTournamentScreen;
