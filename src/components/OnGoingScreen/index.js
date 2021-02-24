import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import { ContestCard, ContestOngoingCardDetail } from "../../components";
import * as userActions from "../../actions/user-actions-types";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style";
import constants from "../../constants";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
type props = {
  onScreenMove: Object,
  operator: String,
};

const DummyData = [
  {
    id: 19,
    title: "",
    operator_id: "",
    op_logo: "",
    start_time: "",
    finish_time: "",
    cover_img: "",
    type: "",
    wPrize: "",
    fRunnerUp: "",
    sRunnerUp: "",
    entry_fee: "",
    tOverview: "",
    eSpecies: "",
    tRules: "",
    pCategories: "",
    sponsors: "",
    proof_prize_pool: "",
    is_private: "",
    is_subevent: "",
    p_password: "",
    singleSub: "",
    t_status: "",
    entrants: "",
    status: "",
    created_at: "",
    updated_at: "",
    no_of_joined_participants: "",
    no_of_species: "",
    joined_status: "",
  },
  {
    id: 20,
    title: "",
    operator_id: "",
    op_logo: "",
    start_time: "",
    finish_time: "",
    cover_img: "",
    type: "",
    wPrize: "",
    fRunnerUp: "",
    sRunnerUp: "",
    entry_fee: "",
    tOverview: "",
    eSpecies: "",
    tRules: "",
    pCategories: "",
    sponsors: "",
    proof_prize_pool: "",
    is_private: "",
    is_subevent: "",
    p_password: "",
    singleSub: "",
    t_status: "",
    entrants: "",
    status: "",
    created_at: "",
    updated_at: "",
    no_of_joined_participants: "",
    no_of_species: "",
    joined_status: "",
  },
];

const OnGoingScreen = ({ onScreenMove, operator }: props) => {
  const [OngoingData, SetOngoingData] = useState([]);
  const [apiResult, setApiResult] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userData } = user;
  useEffect(() => {
    apiCallingFunction(operator, userData.id);
  }, []);

  const apiCallingFunction = (operator, userId) => {
    const data = {
      user_id: operator,
      my_id: userId,
    };
    console.log('abc', data)
    dispatch(
      userActions.getOngoingTournamentData({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              const { tournament_list } = result.data;
              console.warn(
                "this is the ongoing tournament data -------->",
                JSON.stringify(tournament_list, undefined, 2)
              );
              SetOngoingData([...tournament_list.data]);
              setApiResult(true);
              setRefreshing(false);
              setLoadMoreLoader(false);
            } else {
              setApiResult(true);
              setRefreshing(false);
              setLoadMoreLoader(false);
            }
          }
        },
      })
    );
  };

  const handleRefresh = () => {
    apiCallingFunction(operator, userData.id);
    setRefreshing(true);
  };

  const handleLoadMore = () => {
    setLoadMoreLoader(true);
    apiCallingFunction(operator, userData.id);
  };

  const EmptyListComponet = () => {
    return (
      <>
        {apiResult ? (
          <View
            style={{ height: windowHeight / 1.5, alignSelf: 'center', justifyContent: 'center' }}
          >
            {/* <Text style={[styles.noDataTextStyle, { textAlign: "center" }]}>
              Sorry!
            </Text> */}
            <Text style={styles.noDataTextStyle}>
              Nothing here yet, stay tuned
            </Text>
          </View>
        ) : (
            <View
              style={{
                height: windowHeight,
                width: windowWidth,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                size={"large"}
                color={constants.Colors.GreenColor}
              />
            </View>
          )}
      </>
    );
  };

  const renderItems = ({ item, index }) => {
    const {
      title,
      id,
      cover_img,
      start_time,
      finish_time,
      is_private,
      joined_status,
      p_password,
      no_of_catches,
    } = item;
    return (
      <>
        <ContestCard
          item={item}
          cardImage={cover_img}
          contestId={id}
          contestName={title}
          dateTime={start_time}
          no_of_catches={no_of_catches}
          APIResult={apiResult}
          is_joined_Status={joined_status}
          onScreenMove={() =>
            onScreenMove(id, joined_status, is_private, p_password)
          }
          privateTournament={is_private}
          // onPressLeaderBoard={() => onPressLeaderBoardButton(id, item)}
          showLeaderBoard={showLeaderBoard}
        />
      </>
    );
  };

  const renderFooter = () => {
    return (
      <View style={{ height: 40, width: "100%" }}>
        {loadMoreLoader && <ActivityIndicator color="green" size={28} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={OngoingData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={EmptyListComponet}
          ListFooterComponent={renderFooter}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
    </View>
  );
};

export default React.memo(OnGoingScreen);
