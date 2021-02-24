import { put, takeLatest, all } from "redux-saga/effects";
import { ToastActionsCreators } from "react-native-redux-toast";
import { SHOW_TOAST, SHOW_ERROR_TOAST } from "../actions/app-actions-types";

function* showToast(action) {
  yield put(ToastActionsCreators.displayInfo(action.payload));
}

function* showErrorToast(action) {
  yield put(ToastActionsCreators.displayError(action.payload));
}

function* app() {
  yield all([
    yield takeLatest(SHOW_TOAST, showToast),
    yield takeLatest(SHOW_ERROR_TOAST, showErrorToast),
  ]);
}

export default app;
