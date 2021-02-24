import { createAction } from "redux-actions";

/***************************User Auth Action**********************************/

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const loginSuccess = createAction(LOGIN_SUCCESS);

export const EMAILLOGIN = "EMAILLOGIN";
export const emailLogin = createAction(EMAILLOGIN);

export const GOOGLELOGIN = "GOOGLELOGIN";
export const googleLogin = createAction(GOOGLELOGIN);

export const SOCIAL_LOGIN_SUCCESS = "SOCIAL_LOGIN_SUCCESS";
export const socialLoginSuccess = createAction(SOCIAL_LOGIN_SUCCESS);

export const REGISTER_USER = "REGISTER_USER";
export const registerUser = createAction(REGISTER_USER);

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const registerSuccess = createAction(REGISTER_SUCCESS);

export const GET_COUNTRY_CODE = "GET_COUNTRY_CODE";
export const getCountryCode = createAction(GET_COUNTRY_CODE);

export const GET_STATES = "GET_STATES";
export const getStates = createAction(GET_STATES);

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = createAction(LOGOUT_USER);

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const forgotPasswordAction = createAction(FORGOT_PASSWORD);

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const logoutSuccess = createAction(LOGOUT_SUCCESS);

/*************************** In App Api calling Actions *********************************/

export const FETCH_HOME_SCREEN_DATA = "FETCH_HOME_SCREEN_DATA";
export const fetchHomeScreenData = createAction(FETCH_HOME_SCREEN_DATA);

export const GET_OPERATOR_DETAILS = 'GET_OPERATOR_DETAILS';
export const getOperatorDetails = createAction(GET_OPERATOR_DETAILS);

export const GET_UPCOMING_TOURNAMENT_DATA = "GET_UPCOMING_TOURNAMENT_DATA";
export const getUpcomingTournamentData = createAction(GET_UPCOMING_TOURNAMENT_DATA);

export const GET_ONGOING_TOURNAMENT_DATA = "GET_ONGOING_TOURNAMENT_DATA";
export const getOngoingTournamentData = createAction(GET_ONGOING_TOURNAMENT_DATA);

export const GET_COMPLETED_TOURNAMENT_DATA = "GET_COMPLETED_TOURNAMENT_DATA";
export const getCompleatedTournamentData = createAction(GET_COMPLETED_TOURNAMENT_DATA);

export const JOIN_TOURNAMENT_CALL  = "JOIN_TOURNAMENT_CALL";
export const joinTournamentCall = createAction(JOIN_TOURNAMENT_CALL);

export const GET_SPECIES_API = "GET_SPECIES_API";
export const getSpeciesApi = createAction(GET_SPECIES_API);

export const GET_TOURNAMENT_LIST = "GET_TOURNAMENT_LIST";
export const getTournamentList = createAction(GET_TOURNAMENT_LIST);

//for testing 

export const ALL_ONGOING_TOURNAMNET = "ALL_ONGOING_TOURNAMNET";
export const allOngoingTournament = createAction(ALL_ONGOING_TOURNAMNET);

export const ADD_CATCH_DETAILS = "ADD_CATCH_DETAILS";
export const addCatchDetails = createAction(ADD_CATCH_DETAILS);

export const ADD_LIVEWELL_DETAILS = "ADD_LIVEWELL_DETAILS";
export const addLivewellDetails = createAction(ADD_LIVEWELL_DETAILS);

export const UPDATE_LIVEWELL_DETAILS = "UPDATE_LIVEWELL_DETAILS";
export const updateLivewellDetails = createAction(UPDATE_LIVEWELL_DETAILS);

// this actions is used for like and comment on liveWell Catches 
export const CATCH_LIKE = "CATCH_LIKE";
export const catchLike = createAction(CATCH_LIKE);
// for comments 
export const GET_COMMENTS_DETAILS = 'GET_COMMENTS_DETAILS';
export const getCommentsDetails = createAction(GET_COMMENTS_DETAILS);
// this function action is use for post the comment 
// export const POST_CATCHE_COMMENT = 'POST_CATCHE_COMMENT';
// export const postCatcheComment = createAction(POST_CATCHE_COMMENT);

export const GET_LIVEWELL_LIST = "GET_LIVEWELL_LIST";
export const getLiveWellList = createAction(GET_LIVEWELL_LIST);

export const GET_STATE_BY_COUNTRY_NAME = "GET_STATE_BY_COUNTRY_NAME";
export const getStateByCountryName = createAction(GET_STATE_BY_COUNTRY_NAME);

export const GET_USER_JOINED_TOURNAMENT = "GET_USER_JOINED_TOURNAMENT";
export const getUserJoinedTournament = createAction(GET_USER_JOINED_TOURNAMENT);

// this action is user for Fish calculator screen values

export const GET_FISH_VALUES = 'GET_FISH_VALUES';
export const getFishValue = createAction(GET_FISH_VALUES);

// this is for ongoing user ranking list 

export const GET_ONGOING_RANKING_LIST = 'GET_ONGOING_RANKING_LIST';
export const getOngoingRankingList = createAction(GET_ONGOING_RANKING_LIST);

// this is for complete tournament user ranking list

export const GET_COMPLETE_RANKING_LIST = 'GET_COMPLETE_RANKING_LIST';
export const getCompleteRankingList = createAction(GET_COMPLETE_RANKING_LIST);