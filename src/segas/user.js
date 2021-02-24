import { put, takeLatest, all, call, takeEvery } from "redux-saga/effects";
import {
  // LOGIN_SUCCESS,
  EMAILLOGIN,
  GOOGLELOGIN,
  loginSuccess,
  REGISTER_USER,
  registerSuccess,
  GET_COUNTRY_CODE,
  GET_STATES,
  socialLoginSuccess,
  LOGOUT_USER,
  logoutSuccess,
  FETCH_HOME_SCREEN_DATA,
  FORGOT_PASSWORD,
  GET_OPERATOR_DETAILS,
  GET_UPCOMING_TOURNAMENT_DATA,
  GET_ONGOING_TOURNAMENT_DATA,
  GET_COMPLETED_TOURNAMENT_DATA,
  JOIN_TOURNAMENT_CALL,
  GET_SPECIES_API,
  GET_TOURNAMENT_LIST,
  ADD_CATCH_DETAILS,
  GET_LIVEWELL_LIST,
  CATCH_LIKE,
  // ADD_LIVEWELL_DETAILS,
  UPDATE_LIVEWELL_DETAILS,
  ADD_LIVEWELL_DETAILS,
  ALL_ONGOING_TOURNAMNET,
  GET_STATE_BY_COUNTRY_NAME,
  GET_USER_JOINED_TOURNAMENT,
  GET_FISH_VALUES,
  GET_ONGOING_RANKING_LIST,
  GET_COMMENTS_DETAILS,
  GET_COMPLETE_RANKING_LIST,
  // POST_CATCHE_COMMENT,
} from "../actions/user-actions-types";
import httpClient from "./http-client";
import Toast from "react-native-toast-message";

/***************************User Auth Segas*******************************/

function* emailLogin({ payload: { data, callback } }) {
  console.warn("data in saga", data);
  const payload = {
    data: JSON.stringify(data),
    method: "POST",
    url: "login",
  };
  const { result, error } = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      callback(result, error);
      const userToken = result.token;
      const data = result.data;
      yield put(loginSuccess({ userToken, data }));

      // Toast.show({
      //   type: "success",
      //   text1: "Success Message",
      //   text2: result.message,
      // });
      // yield put(ToastActionsCreators.displayInfo(result.message));
    } else {
      Toast.show({
        type: "error",
        text1: "Error Message",
        text2: result.message,
      });
      // yield put(ToastActionsCreators.displayError(result.message));
    }
  }
}
function* googleLogin({ payload: { data, callback } }) {
  const payload = {
    data: JSON.stringify(data),
    method: "POST",
    url: "callback",
  };
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {
    if (result) {
      callback(result, error);
      const userToken = result.data.token;
      const data = result.data;
      yield put(socialLoginSuccess({ userToken, data }));
      // Toast.show({
      //   type: "success",
      //   text1: "Success Message",
      //   text2: result.message,
      // });
      // yield put(ToastActionsCreators.displayInfo(result.message));
    } else {
      Toast.show({
        type: "error",
        text1: "Error Message",
        text2: result.message,
      });
      // yield put(ToastActionsCreators.displayError(result.message));
    }
  }
}

function* registerUser({ payload: { data, callback } }) {
  const payload = {
    data: JSON.stringify(data),
    method: "POST",
    url: "register",
  };
  const { result, error } = yield call(httpClient, payload);
  console.warn('resuthghgjgjgjgjgjgjgjgjhgjggjgl', JSON.stringify(result, undefined, 2));
  callback({result, error});
  if (!error) {
    if (result.success === true) {
      // console.warn("eeeee", error);
      // console.warn('resutl', JSON.stringify(result, undefined, 2));
      const userToken = result.token;
      const data = result.data;
      yield put(registerSuccess({ userToken, data }));
      // yield put(ToastActionsCreators.displayInfo(result.message));
      Toast.show({
        type: "success",
        text1: "Success Message",
        text2: result.message,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error Message",
        text2: result.message,
      });
      // yield put(ToastActionsCreators.displayError(result.message));
    }
  }
}
function* getCountryCode({ payload: { data, callback } }) {
  const payload = {
    method: "GET",
    url: "countryCode",
  };
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {
    // yield put(updateUserInfo(result[0]));
  }
}

function* getStates({ payload: { data, callback } }) {
  const payload = {
    data: JSON.stringify(data),
    method: "POST",
    url: "getState",
  };
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {
    // yield put(updateUserInfo(result[0]));
  }
}

function* logoutUser({ payload: { data, callback } }) {
  const payload = {
    // data: JSON.stringify(data),
    method: "GET",
    url: `logout?token=${data.token}`
  }
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {
    if (result) {
      const userToken = "";
      const datas = {};
      console.warn("log sefa", JSON.stringify(result, undefined, 2) );
      yield put(logoutSuccess({ userToken: userToken, data: datas }));
    } else {
      Toast.show({
        type: "error",
        text1: "Error Message",
        text2: result.message,
      });
    }
  }

}

function* forgotPasswordAction({ payload: { data, callback } }) {
  console.warn("data in saga", data);
  const payload = {
    data: JSON.stringify(data),
    method: "POST",
    url: "forgot-password",
  };
  const { result, error } = yield call(httpClient, payload);
  if (!error) {
    if (result) {
      callback(result, error);
      Toast.show({
        type: "success",
        text1: "Success Message",
        text2: result.message,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error Message",
        text2: result.message,
      });
    }
  }
}

/********************************In App Segas***********************/

function* fetchHomeScreenData({ payload: { data, callback } }) {
  const payload = {
    data: JSON.stringify(data),
    method: "GET",
    url: "index",
  };
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {
    // yield put(updateUserInfo(result[0]));
  }
}

function* getOperatorDetails({ payload: { data, callback } }) {
  const payload = {
    data: JSON.stringify(data),
    method: 'POST',
    url: "tournamentDetails",
  };
  const { result, error } = yield call(httpClient,payload);
  callback({ result, error});
  if (!error) {
    
  }
}

function* getUpcomingTournamentData({ payload: { data, callback } }) {
  const payload = {
    data: JSON.stringify(data),
    method: 'POST',
    url: `upcomingTournamentList?page=${1}`,
    hideLoader: true,
  };
  const { result, error } = yield call(httpClient,payload);
  callback({ result, error});
  if (!error) {
    
  }
}
function* getOngoingTournamentData({ payload: { data, callback } }) {
  const payload = {
    data: JSON.stringify(data),
    method: 'POST',
    url: "ongoingTournamentList",
    hideLoader: true,
  };
  const { result, error } = yield call(httpClient,payload);
  callback({ result, error});
  if (!error) {
    
  }
}
function* getCompleatedTournamentData({ payload: { data, callback } }) {
  const payload = {
    data: JSON.stringify(data),
    method: 'POST',
    url: "completedTournamentList",
    hideLoader: true,
  };
  const { result, error } = yield call(httpClient,payload);
  callback({ result, error});
  if (!error) {
    
  }
}

function* joinTournamentCall({ payload: { data, callback } }) {
  const payload = {
    data: JSON.stringify(data),
    method: "POST",
    url: "joinTournament",
  };
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {
    if (result) {
      callback(result, error);
      Toast.show({
        type: "success",
        text1: "Success Message",
        text2: result.message,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error Message",
        text2: result.message,
      });
    }
  }
}

function* getSpeciesApi({ payload: { data, callback } }) {
  const payload = {
    method: 'GET',
    url: 'speciesList'
  }
  const { result, error } = yield call(httpClient,payload);
  callback({ result, error });
  if (!error) {

  }
}

function* getTournamentList({ payload: { data, callback } }) {
  const payload = {
    method: 'GET',
    url: 'tournamentList'
  }
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {

  }
}

function* addCatchDetails({ payload: { data, callback } }) {
  const payload ={ 
    data: JSON.stringify(data),
    method: "POST",
    url: "addCatch",
    hideLoader: true,
  }
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {
    if (result) {
      callback(result, error);
      Toast.show({
        type: "success",
        text1: "Success Message",
        text2: result.message,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error Message",
        text2: result.message,
      });
    }
  }
}

function* getLiveWellList({ payload: {data, callback } }) {
  const payload = {
    data: JSON.stringify(data),
    method: "POST",
    url: "catchList"
  }
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {

  }
} 

function* catchLike({ payload: { data, callback } }){
  const payload = {
    data: JSON.stringify(data),
    method: "POST",
    url: "addLikeCatch",
    hideLoader: true,
  }
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {
  }
}

function* addLivewellDetails({ payload: { data, callback } }){
  const payload = {
    data: JSON.stringify(data),
    method:"POST",
    url:"catchDetails"
  };
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if(!error){
    
  }
}

function* updateLivewellDetails({ payload: {data, callback } }){
  const payload = {
    data: JSON.stringify(data),
    method: 'POST',
    url:"updateLivewell"
  }
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  // console.warn('this is the catch details data ', JSON.stringify(result, undefined, 2));
  if(!error){
    if(result.success === true){
      // callback(result, error);
      Toast.show({
        type: "success",
        text1: "Success Message",
        text2: result.message,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error Message",
        text2: result.message,
      });
    }
  }
}

function* allOngoingTournament({ payload: { data, callback } }){
  const payload = {
    data: JSON.stringify(data),
    method:"POST",
    url:"allongoingTournamentList"
  };
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if(!error){
    
  }
}

function* getStateByCountryName({payload: { data, callback } }){
  const payload = {
    method: 'GET',
    url: 'getStateByCountryName'
  }
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {

  }
}

function* getUserJoinedTournament({payload: {data, callback}}){
  const payload = {
    method: 'POST',
    data: JSON.stringify(data),
    url:'upcomingEvents'
  }
  const {result, error} = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {

  }
}
// this function is used for get the fish values

function* getFishValue({payload: {data, callback}}){
  const payload = {
    method: 'POST',
    data:JSON.stringify(data),
    url:'getCalculatorValue',
  };
  const {result, error} = yield call(httpClient, payload);
  callback({result, error});
  if(!error){
    if(result){
      console.warn('this is the fish values result', JSON.stringify(result, undefined, 2));
    }
  }
}

// this fucntion is used for ongoing touranment user rank listing
function* getOngoingRankingList({payload: {data, callback}}){
  const payload = {
    method: 'POST',
    data:JSON.stringify(data),
    url:'getOngoingTournamentDetailsById'
  };
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if(!error){
    if(result){
      console.warn('this is the ongoing tournament user ranking listing-->', JSON.stringify(result, undefined, 2));
    }
  }
}

// this function is use for get the catches comments details
function* getCommentsDetails({payload: {data, callback}}){
  const payload = {
    method: 'POST',
    data:JSON.stringify(data),
    url:'catchCommentDetails'
  };
  const { result, error } = yield call(httpClient, payload);
  callback({ result, error });
  if (!error) {
    if (result) {
      console.warn('this is the comments details data=-------->', JSON.stringify(result, undefined, 2));
    }
  }
}

// this function is ues for get complete user ranking list 
function* getCompleteRankingList({payload: {data, callback}}){
  const payload = {
    method: 'POST',
    data: JSON.stringify(data),
    url:'getCompletedTournamentDetailsById'
  };
  const { result, error} = yield call(httpClient, payload);
  callback({result, error});
  if(!error){
    if(result){
      console.warn('this is the comlete screen ranking data', JSON.stringify(result, undefined, 2));
    }
  }
}

function* User() {
  yield all([
    yield takeLatest(EMAILLOGIN, emailLogin),
    yield takeLatest(GOOGLELOGIN, googleLogin),
    yield takeLatest(REGISTER_USER, registerUser),
    yield takeLatest(GET_COUNTRY_CODE, getCountryCode),
    yield takeLatest(GET_STATES, getStates),
    yield takeLatest(LOGOUT_USER, logoutUser),
    yield takeLatest(FORGOT_PASSWORD,forgotPasswordAction),
    yield takeLatest(FETCH_HOME_SCREEN_DATA, fetchHomeScreenData),
    yield takeLatest(GET_OPERATOR_DETAILS, getOperatorDetails),
    yield takeEvery(GET_UPCOMING_TOURNAMENT_DATA, getUpcomingTournamentData),
    yield takeEvery(GET_ONGOING_TOURNAMENT_DATA, getOngoingTournamentData),
    yield takeEvery(GET_COMPLETED_TOURNAMENT_DATA, getCompleatedTournamentData),
    yield takeLatest(JOIN_TOURNAMENT_CALL, joinTournamentCall),
    yield takeLatest(GET_SPECIES_API,getSpeciesApi),
    yield takeLatest(GET_TOURNAMENT_LIST, getTournamentList),
    yield takeLatest(ADD_CATCH_DETAILS,addCatchDetails),
    yield takeLatest(GET_LIVEWELL_LIST, getLiveWellList),
    yield takeLatest(CATCH_LIKE, catchLike),
    yield takeLatest(ADD_LIVEWELL_DETAILS, addLivewellDetails),
    yield takeLatest(UPDATE_LIVEWELL_DETAILS,updateLivewellDetails),
    //for testing
    yield takeLatest(ALL_ONGOING_TOURNAMNET, allOngoingTournament),
    // get details 
    yield takeLatest(GET_STATE_BY_COUNTRY_NAME,getStateByCountryName),
    yield takeLatest(GET_USER_JOINED_TOURNAMENT, getUserJoinedTournament),
    yield takeLatest(GET_FISH_VALUES, getFishValue),
    yield takeLatest(GET_ONGOING_RANKING_LIST, getOngoingRankingList),
    yield takeLatest(GET_COMMENTS_DETAILS,getCommentsDetails),
    yield takeLatest(GET_COMPLETE_RANKING_LIST, getCompleteRankingList),
    // yield takeLatest(POST_CATCHE_COMMENT,postCatcheComment),
  ]);
}

export default User;
