import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { ContestCard } from "../../components";
import styles from "./style";
import * as userActions from '../../actions/user-actions-types';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import constants from "../../constants";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
type props = {
  onScreenMove: Object,
  operator: String,
};

const UpcomingScreen = ({ onScreenMove, operator }: props) => {
  const [OngoingData, SetOngoingData] = useState([]);
  const [apiResult, setApiResult] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userData } = user;
  useEffect(() => {
    // SetOngoingData(DummyData)
    // console.warn("this is the operator id --->", operator)
    apiCallingFunction(operator, userData.id);
  }, [])

  useFocusEffect(React.useCallback(() => {
    // alert('fdssfs')
  }, []))

  const apiCallingFunction = (operator, userId) => {
    const data = {
      user_id: operator,
      my_id: userId,
    };
    dispatch(
      userActions.getUpcomingTournamentData({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              const { tournament_list } = result.data;
              SetOngoingData([...tournament_list.data]);
              setApiResult(true);
              setRefreshing(false);
              setLoadMoreLoader(false);
            }
            else {
              setRefreshing(false);
              setLoadMoreLoader(false);
            }
          }
        }
      })
    )
  }

  const handleRefresh = () => {
    apiCallingFunction(operator, userData.id);
    setRefreshing(true);
  }

  const handleLoadMore = () => {
    setLoadMoreLoader(true);
    apiCallingFunction(operator, userData.id);
  }

  const renderItems = ({ item, index }) => {
    const { cover_img, title, start_time, finish_time, wPrize, no_of_species, fRunnerUp, entry_fee, type, eSpecies,
      id, joined_status, is_private, p_password, created_at, no_of_catches } = item
    return (
      <ContestCard
        cardImage={cover_img}
        contestId={id}
        contestName={title}
        dateTime={start_time}
        dPricePool={wPrize}
        dFirstPrice={fRunnerUp}
        dEntryFee={entry_fee}
        dType={type}
        is_joined_Status={joined_status}
        no_of_catches={no_of_catches}
        dSpecies={no_of_species}
        upcoming={true}
        onScreenMove={() => onScreenMove(id, joined_status, is_private, p_password)}
        APIResult={apiResult}
        privateTournament={is_private}
        tournamentCreateTime={created_at}
      />
    );
  };

  const EmptyListComponet = () => {
    return (

      <>
        { apiResult ? <View style={{ height: windowHeight / 1.5, alignSelf: 'center', justifyContent: 'center' }}>
          {/* <Text style={[styles.noDataTextStyle, { textAlign: 'center' }]}>Sorry!</Text> */}
          <Text style={styles.noDataTextStyle}>Nothing here yet, stay tuned</Text>
        </View> :
          <View style={{ height: windowHeight, width: windowWidth, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={constants.Colors.GreenColor} />
          </View>

        }
      </>
    )
  }

  const renderFooter = () => {
    return (
      <View style={{ height: 40, width: '100%' }}>
        {loadMoreLoader && <ActivityIndicator color="green" size={28} />}
      </View>
    )
  };


  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={OngoingData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
          enableEmptySections={true}
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

export default React.memo(UpcomingScreen);
