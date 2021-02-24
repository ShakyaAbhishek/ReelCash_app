import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Linking,
} from "react-native";
import Constants from "../../../constants";
import Carousel from "react-native-snap-carousel";
import {
  Header,
  CardShdowWrapper,
  HomeOperatorCard,
} from "../../../components";
import CalendarStrip from "react-native-calendar-strip";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../actions/user-actions-types";
import Toast from "react-native-toast-message";
import moment from "moment";
const { width: screenWidth } = Dimensions.get("window");

type props = {
  navigation: Object,
  route: Object,
};

const swipeDatas = [
  {
    img_id: 3,
    img_action: "",
    image_name: "",
    image: "",
    date_created: "",
  },
  {
    img_id: 2,
    img_action: "",
    image_name: "",
    image: "",
    date_created: "",
  },
];

const operatorDummyData = [
  {
    operator_id: 1,
    operator_name: "",
    no_of_tournaments: '',
    operator_logo: ""
  },
  {
    operator_id: 2,
    operator_name: "",
    no_of_tournaments: '',
    operator_logo: ""
  },
];

const eventsData = [
  {
    startDate: '2021-01-28',
    dateContainerStyle: styles.eventDayBlueStyle
  },
  {
    startDate: '2021-01-30',
    dateContainerStyle: styles.eventDayGreenStyle
  },
];

const HomeScreen = ({ navigation, route }: props) => {
  const [swipeData, setSwipeData] = useState([]);
  const [usersToken, setUsersToken] = useState("");
  const [operatorData, setOperatorData] = useState([]);
  const [eventsDateList, setEventsDateList] = useState([]);
  const [apiResponse, setApiResponse] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userData, userToken } = user;

  useEffect(() => {
    setSwipeData(swipeDatas);
    setOperatorData(operatorDummyData);
    apiCallingFunction();
    const { userToken } = user;
    if (userToken != "") {
      setUsersToken(userToken);
    } else {
      setUsersToken('');
    }
  }, [user]);

  const apiCallingFunction = () => {
    fetch(userToken != '' ? `https://api.reelcash.com/api/index?id=${userData.id}` : 'https://api.reelcash.com/api/index', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then(processResponse)
      .then(async (res) => {
        const { statusCode, data } = res;
        // console.warn(JSON.stringify(data, undefined, 2));
        if (statusCode === 200) {
          setSwipeData(data.data.home_page_image);
          setOperatorData(data.data.operator_list.data);
          const selectedDate = [];
          const dateData = [...data.data.events.data];
          dateData.map(item => {
            const obj = {
              startDate: moment(item.start_time).format('YYYY-MM-DD'),
              dateContainerStyle: moment(item.start_time).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD') ? styles.eventDayGreenStyle : styles.eventDayBlueStyle
            };
            selectedDate.push(obj);
          });
          setEventsDateList(selectedDate);
          // console.warn("events date",JSON.stringify(dateData, undefined, 2));
          setApiResponse(true);
        } else {
          // console.warn(data.message);
        }
      })
      .catch((error) => {
        return { name: "network error", description: "" };
      });
  };

  function processResponse(response) {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then((res) => ({
      statusCode: res[0],
      data: res[1],
    }));
  }

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

  const onPressOperatorCard = (operator_id) => {
    // if (usersToken == "") {
    //   navigation.navigate("LoginScreen");
    // } else {
    //   navigation.navigate("OperatorScreen", { operatorId: operator_id });
    // }
    navigation.navigate("OperatorScreen", { operatorId: operator_id });
  };

  const onPressRenderItems = (item) => {
    if (usersToken == "") {
      navigation.navigate("LoginScreen");
    } else {
      if (item.img_action === "Tournament") {
        navigation.navigate("TournamentDetailScreen", { upComingScreen: true, TournamentId: item.tournament_id });
      }
      if (item.img_action === "Operator") {
        navigation.navigate("OperatorScreen", { operatorId: item.operator_id });
      }
    }
  };

  const onPressNotification = () => {
    if (usersToken == "") {
      navigation.navigate("LoginScreen");
    } else {
      navigation.navigate("TournamentDetailScreen", {
        upComingScreen: false,
      });
    }
  };

  const onPressRanking = () => {
    if (usersToken == "") {
      navigation.navigate("LoginScreen");
    } else {
      navigation.navigate("TopPlayersScreen");
    }
  };

  const openLink = () => {
    Linking.openURL("http://operator.reelcash.com/login");
  }

  const OperatorRender = ({ item, index }) => {
    return (
      <HomeOperatorCard loaderShow={apiResponse} data={item} onPressOperatorCard={(operator_id) => onPressOperatorCard(operator_id)} />
    );
  };

  const operatorListEmptyRender = ({ }) => {
    return (
      <View style={styles.emptyOperatorStyle}>
        <Text style={styles.rankingTextStyle}>No Operators Found...</Text>
      </View>
    )
  }

  const renderItems = ({ item, index }, parallaxProps) => {
    return (
      <>
        {item.image == "" ? (
          <View style={[styles.item, styles.blankItem]}>
            <ActivityIndicator
              size={"large"}
              color={Constants.Colors.GreenColor}
            />
          </View>
        ) : (
            <TouchableOpacity
              onPress={() => onPressRenderItems(item)}
              activeOpacity={0.8}
              style={styles.item}
            >
              <Image
                loadingIndicatorSource={<ActivityIndicator />}
                source={{ uri: item.image }}
                style={styles.sliderImage}
              />
            </TouchableOpacity>
          )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header
          pressLeftButton={priceButton}
          profileIconPress={profileIconPress}
        />
        <View style={styles.flex1}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.notificationWrapper}>
              <View style={styles.flexCenter}>
                <Image source={Constants.Images.NotificationGreenIcon} />
              </View>
              <View style={styles.notiDetailWrapper}>
                <Text style={styles.notificationHeadingText}>
                  Bethel Park Tournament
                </Text>
                <Text style={styles.notificationTimeText}>
                  Starts Tomorrow @ 10:00
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                // onPress={onPressNotification}
                style={styles.flexCenter}
              >
                <Image source={Constants.Images.ForwardArrowIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.paddingVertical25}>
              <Carousel
                data={swipeData}
                renderItem={renderItems}
                sliderWidth={screenWidth}
                itemWidth={screenWidth - 60}
                inactiveSlideScale={0.95}
                inactiveSlideOpacity={1}
                enableMomentum={true}
                activeSlideAlignment={"start"}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                activeAnimationType={"spring"}
                activeAnimationOptions={{
                  friction: 4,
                  tension: 40,
                }}
                loop={true}
                autoplay={true}
                autoplayDelay={2000}
                autoplayInterval={3000}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressRanking}
              style={styles.rankingButtonWrapper}
            >
              <Image source={Constants.Images.BadgeGreenIcon} />
              <Text style={styles.rankingTextStyle}>Rankings</Text>
            </TouchableOpacity>
            <View style={styles.haveAccountWrapper}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.dontHaveAccountStyle}>
                  {`Want to create your own Tournament?`}
                </Text><TouchableOpacity
                  onPress={openLink}
                  activeOpacity={0.8}
                >
                  <Text style={styles.registerTextStyle}>{` Click here`}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.dividerWrapper}>
              <View style={styles.flex1_2}>
                <Text style={styles.dividerTextStyle}>Operators</Text>
              </View>
              <View style={styles.flex3}>
                <View style={styles.divideLine} />
              </View>
            </View>
            <View style={styles.operatorWrapper}>
              <FlatList
                data={operatorData}
                showsVerticalScrollIndicator={false}
                renderItem={OperatorRender}
                ListEmptyComponent={operatorListEmptyRender}
              />
            </View>
            <View style={styles.dividerWrapper}>
              <View style={styles.flex1_2}>
                <Text style={styles.dividerTextStyle}>My Calendar</Text>
              </View>
              <View style={styles.flex2}>
                <View style={styles.divideLine} />
              </View>
            </View>
            <View style={styles.paddingVertical20}>
              <CardShdowWrapper>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Events')}
                  activeOpacity={0.9}
                  style={styles.calendarWrapper}
                >
                  <CalendarStrip
                    showMonth={false}
                    scrollable={false}
                    iconLeft={{ uri: null }}
                    iconRight={{ uri: null }}
                    style={styles.calendarStyle}
                    highlightDateNumberStyle={{ color: "white" }}
                    highlightDateNameStyle={{ color: "white" }}
                    calendarColor={Constants.Colors.DarkGrayColor}
                    calendarHeaderStyle={{ color: "white" }}
                    onDateSelected={() => navigation.navigate('Events')}
                    dateNumberStyle={{ fontSize: 14, color: "white" }}
                    dateNameStyle={{
                      fontSize: 11,
                      fontWeight: "200",
                      color: "white",
                      paddingBottom: 0,
                    }}
                    customDatesStyles={eventsDateList}
                  />
                </TouchableOpacity>
              </CardShdowWrapper>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
