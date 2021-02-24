import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Constants from "../../../constants";
import { Header } from "../../../components";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../actions/user-actions-types";
import {
  Calendar,
  CalendarList,
  Agenda,
  Calander,
} from "react-native-calendars";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from '@react-navigation/native';

type props = {
  navigation: Object,
};

const currentDate = moment();

// const eventsData = {
//   "2021-01-16": {
//     selected: false,
//     marked: true,
//     customStyles: {
//       container: styles.eventDayBlueStyle,
//     },
//   },
//   "2021-01-17": {
//     marked: true,
//     customStyles: { container: styles.eventDayGreenStyle },
//   },
//   "2021-01-18": {
//     marked: true,
//     customStyles: {
//       container: styles.eventDayBlueStyle,
//     },
//   },
//   "2021-01-19": { disabled: true, disableTouchEvent: true },
//   "2021-02-16": {
//     selected: false,
//     marked: true,
//     customStyles: {
//       container: styles.eventDayBlueStyle,
//     },
//   },
//   "2021-02-17": {
//     marked: true,
//     customStyles: { container: styles.eventDayGreenStyle },
//   },
//   "2021-02-18": {
//     marked: true,
//     customStyles: {
//       container: styles.eventDayBlueStyle,
//     },
//   },
//   "2021-02-19": { disabled: true, disableTouchEvent: true },
// };

const EventsCalanderScreen = ({ navigation }: props) => {
  const [calendarDate, setCalendarDate] = useState('');
  const [eventsDates, setEventsDates] = useState([])
  const [calandarEvents, setCalendarEvents] = useState({});
  const [usersToken, setUsersToken] = useState("");
  const [apiResult, setApiResult] = useState(false);

  const user = useSelector((state) => state.user);
  const { userData } = user;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   let finalDate = moment(new Date).format('YYYY-MM-DD');
  //   setCalendarDate(finalDate);
  //   // setCalendarEvents(eventsDates);
  //   apiCallingFunction('');
  //   getUserToken();
  // }, [user]);

  useFocusEffect(React.useCallback(() => {
    let finalDate = moment(new Date).format('YYYY-MM-DD');
    setCalendarDate(finalDate);
    // setCalendarEvents(eventsDates);
    apiCallingFunction('');
    getUserToken();
  }, [user]))

  const apiCallingFunction = (date) => {
    console.warn(date);
    setApiResult(false);
    const data = {
      id: userData.id,
      date: date,
    };
    // console.warn(data);
    dispatch(
      userActions.getUserJoinedTournament({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result.success) {
              console.warn('result', JSON.stringify(result, undefined, 2));
              const { events } = result.data;
              const dummyData = [];
              events.map(item => {
                // console.warn('current date'+ calendarDate +"events date"+moment(item.start_time).format('YYYY-MM-DD'))
                const obj = {
                  date: moment(item.start_time).format('YYYY-MM-DD'),
                  id: item.id,
                  operatorId: item.operator_id,
                  joinedStatus: item.joined_status,
                  //marked: true,
                  customStyles: {
                    container: moment(new Date()).format('YYYY-MM-DD') === moment(item.start_time).format('YYYY-MM-DD') ? styles.eventDayGreenStyle : styles.eventDayBlueStyle,
                  }
                }
                dummyData.push(obj);
              });
              const finalData = convertArrayToObject(dummyData, 'date');
              setApiResult(true);
              if (date === "") {
                setCalendarEvents({ ...finalData });
              }
              setEventsDates(events);
            }
          }
        }
      })
    );
  }

  const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };

  const getUserToken = async () => {
    const { userToken } = user;
    if (userToken != "") {
      setUsersToken(userToken);
    } else {
      setUsersToken("");
    }
  };

  const priceButton = () => {
    if (usersToken == "") {
      navigation.navigate("LoginScreen");
    } else {
      navigation.navigate("MyStatisticsScreen");
    }
  };

  const profileIconPress = () => {
    if (usersToken == "") {
      navigation.navigate("LoginScreen");
    } else {
      navigation.navigate("ProfileScreen", { otherUserView: false });
    }
  };

  const backMonth = () => {
    const updatedBackMonth = currentDate.add(-1, "month");
    updateCalendarDate(updatedBackMonth);
  };

  const nextMonth = () => {
    const updatedNextMonth = currentDate.add(1, "month");
    updateCalendarDate(updatedNextMonth);
  };

  const updateCalendarDate = (date) => {
    setCalendarDate(date.format("YYYY-MM-DD"));
  };

  const onPressEvents = (id) => {
    if (usersToken == "") {
      navigation.navigate("LoginScreen");
    } else {
      navigation.navigate("TournamentDetailScreen", {
        upComingScreen: false,
        TournamentId: id,
      });
    }
  };

  const listEmpty = () => {
    return (
      <>
        {apiResult && <View style={{ height: 400, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          {/* <Text style={[styles.noDataTextStyle, { textAlign: 'center' }]}>Sorry!</Text> */}
          <Text style={styles.noDataTextStyle}>Nothing here yet, stay tuned</Text>
        </View>}
      </>
    )
  }

  const renderEventsList = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => onPressEvents(item.id)}>
        <View style={styles.contestImageContainer}>
          <Image
            resizeMethod={"auto"}
            resizeMode={"cover"}
            style={styles.imageStyle}
            source={{ uri: item.cover_img }}
          />
        </View>
        <View style={styles.contestDetailWrapper}>
          <Image source={Constants.Images.BlueFishIcon} />
          <View style={styles.contestNameTimeWrapper}>
            <Text style={styles.contestNameText}>
              {item.title}
            </Text>
            <Text style={styles.contestTimeText}>{`${moment(item.start_time).format("YYYY-MM-DD")} @ ${moment(item.start_time).format("HH:mm")}`}</Text>
          </View>
        </View>
        <View style={styles.locationPriceWrapper}>
          <View style={{ flex: 1.5, flexDirection: "row" }}>
            <Image source={Constants.Images.CoinWhiteIcon} />
            <View style={styles.marginLeft10}>
              <Text style={styles.locationWhiteText}>{item.wPrize}</Text>
              <Text style={styles.locationGreenText}>Prize</Text>
            </View>
            <View />
          </View>
          <View style={{ flex: 2, flexDirection: "row" }}>
            <Image source={Constants.Images.LocationWhiteIcon} />
            <View style={styles.marginLeft10}>
              <Text numberOfLines={1} style={styles.locationWhiteText}>
                {item.locations}
              </Text>
              <Text style={styles.locationGreenText}>Location</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header
          pressLeftButton={priceButton}
          profileIconPress={profileIconPress}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={backMonth}>
                <Image
                  style={{ transform: [{ rotate: "180deg" }] }}
                  source={Constants.Images.ForwardGreenArrowIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.calanderWrapperStyle}>
              <CalendarList
                current={calendarDate}
                style={styles.calanderStyle}
                markingType={"custom"}
                theme={{
                  // backgroundColor: "rgb(31,35,43)",
                  calendarBackground: "rgb(31,35,43)",
                  textSectionTitleColor: "#ffffff",
                  textSectionTitleDisabledColor: "#ffffff",
                  selectedDayBackgroundColor: "#ffffff",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#ffffff",
                  dayTextColor: "#ffffff",
                  textDisabledColor: "#d9e1e8",
                  dotColor: "#00adf5",
                  selectedDotColor: "#ffffff",
                  arrowColor: "rgb(101,180,84)",
                  // disabledArrowColor: 'red',
                  monthTextColor: "#ffffff",
                  indicatorColor: "blue",
                  textDayFontFamily: "ProximaNova-Regular",
                  textMonthFontFamily: "ProximaNova-Regular",
                  textDayHeaderFontFamily: "ProximaNova-Regular",
                  textDayFontWeight: "400",
                  textMonthFontWeight: "bold",
                  textDayHeaderFontWeight: "200",
                  textDayFontSize: 15,
                  textMonthFontSize: 15,
                  textDayHeaderFontSize: 11,
                }}
                horizontal={true}
                onDayPress={(day) => apiCallingFunction(day.dateString)}
                calendarWidth={300}
                markedDates={calandarEvents}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={nextMonth}>
                <Image source={Constants.Images.ForwardGreenArrowIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={eventsDates}
            extraData={eventsDates}
            renderItem={renderEventsList}
            ListEmptyComponent={listEmpty}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default EventsCalanderScreen;
