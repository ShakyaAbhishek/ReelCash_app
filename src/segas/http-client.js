import { call, select, put, delay } from "redux-saga/effects";
import { ToastActionsCreators } from "react-native-redux-toast";
import { showLoader, hideLoader } from "../actions/app-actions-types";
import getAxiosInstance from "../utilities/axiosInstance";
import Idx from "idx";
import Toast from "react-native-toast-message";

const message =
  "Please make sure you're connected with internet or our servers are not responding.";

function* HttpClient(payload, isLoader = true) {
 if(!payload.hideLoader){
  yield put(showLoader());
 }
  console.warn(
    "httpClient method is the --->",
    JSON.stringify(payload, undefined, 2)
  );
  const data = { ...payload };
  const axiosInstance = getAxiosInstance();
  try {
    const { data: result } = yield call(axiosInstance, data);
    if(!payload.hideLoader){
      yield put(hideLoader());
     }
    

    // eslint-disable-next-line no-console
    console.log(
      "%c------ result ------ ",
      "color: green; font-size:10px",
      result
    );

    return {
      error: null,
      result,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("%c------ error ------ ", "color: red; font-size:10px", error);
    if(!payload.hideLoader){
      yield put(hideLoader());
     }
    
    // yield put(hideLoader());
    if (Idx(error, (_) => _.code)) {
      if (error.code === "ECONNABORTED") {
        yield put(ToastActionsCreators.displayInfo(message));
      }
    }
    if (Idx(error, (_) => _.statusCode)) {
      yield put(ToastActionsCreators.displayInfo(error.message));
    } else {
      Toast.show({
        type: "error",
        text1: "Error Message",
        text2: error.message,
      });
    }

    return {
      error,
      result: null,
    };
  }
}

export default HttpClient;
