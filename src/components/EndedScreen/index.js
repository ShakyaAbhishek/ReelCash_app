import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { ContestEndCard } from "../../components";
import styles from "./style";
import * as userActions from '../../actions/user-actions-types';
import { useSelector, useDispatch } from 'react-redux';
import constants from "../../constants";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
type props = {
  operator: string,
}

const dummydata = [
  {
    id: 9,
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
    joined_status: ""
  },
]

const EndedScreen = ({ operator }: props) => {
  const [OngoingData, SetOngoingData] = useState([
  //   {
  //   id: 9,
  //   title: "",
  //   operator_id: "",
  //   op_logo: "",
  //   start_time: "",
  //   finish_time: "",
  //   cover_img: "",
  //   type: "",
  //   wPrize: "",
  //   fRunnerUp: "",
  //   sRunnerUp: "",
  //   entry_fee: "",
  //   tOverview: "",
  //   eSpecies: "",
  //   tRules: "",
  //   pCategories: "",
  //   sponsors: "",
  //   proof_prize_pool: "",
  //   is_private: "",
  //   is_subevent: "",
  //   p_password: "",
  //   singleSub: "",
  //   t_status: "",
  //   entrants: "",
  //   status: "",
  //   created_at: "",
  //   updated_at: "",
  //   no_of_joined_participants: "",
  //   no_of_species: "",
  //   joined_status: ""
  // },
  // {
  //   id: 10,
  //   title: "",
  //   operator_id: "",
  //   op_logo: "",
  //   start_time: "",
  //   finish_time: "",
  //   cover_img: "",
  //   type: "",
  //   wPrize: "",
  //   fRunnerUp: "",
  //   sRunnerUp: "",
  //   entry_fee: "",
  //   tOverview: "",
  //   eSpecies: "",
  //   tRules: "",
  //   pCategories: "",
  //   sponsors: "",
  //   proof_prize_pool: "",
  //   is_private: "",
  //   is_subevent: "",
  //   p_password: "",
  //   singleSub: "",
  //   t_status: "",
  //   entrants: "",
  //   status: "",
  //   created_at: "",
  //   updated_at: "",
  //   no_of_joined_participants: "",
  //   no_of_species: "",
  //   joined_status: ""
  // },
]);
  const [apiResult, setApiResult] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const { userData } = user;
    console.warn("this is the operator id --->", operator)
    apiCallingFunction(operator, userData.id);
  }, [])

  const apiCallingFunction = (operator, userId) => {
    const data = {
      user_id: operator,
      my_id: userId,
    };
    dispatch(
      userActions.getCompleatedTournamentData({
        data,
        callback: ({ result, error }) => {
          console.warn("this is the complete tournament data====>", JSON.stringify(result, undefined, 2));
          if (!error) {
            if (result) {
              const { tournament_list } = result.data;
              SetOngoingData(tournament_list.data);
            }
            setApiResult(true);
          }
        }
      })
    )
  }

  const EmptyListComponet = () => {
    return (
      <>
      { apiResult ? <View style={{ height: windowHeight/1.5, alignSelf: 'center', justifyContent:'center' }}>
        {/* <Text style={[styles.noDataTextStyle, { textAlign: 'center' }]}>Sorry!</Text> */}
        <Text style={styles.noDataTextStyle}>Nothing here yet, stay tuned</Text>
      </View>:
      <View style={{height:windowHeight, width: windowWidth, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'} color={constants.Colors.GreenColor} />
      </View>
      
    }
      </>
    )
  }

  const renderItems = ({ item, index }) => {
    const { title, finish_time, id, operator_id, cover_img, type, wPrize, fRunnerUp, sRunnerUp, entry_fee, joined_status } = item;
    return (
      <View>
        <ContestEndCard
        constest_id={id}
        tournament_Image={cover_img}
        contestName={title}
        dateTime={finish_time}
        pricePool={wPrize}
        firstPrice={fRunnerUp}
        entryFee={entry_fee}
        tournamentType={type}
        tournamentLocation={"All"}
        tournamentSpecies={"6"}
        joinStatus={joined_status}
        apiResult={apiResult}
      />
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
        />
      </SafeAreaView>
    </View>
  );
};

export default React.memo(EndedScreen);
