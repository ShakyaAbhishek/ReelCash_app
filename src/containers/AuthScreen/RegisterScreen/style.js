import { ScaledSheet } from "react-native-size-matters";
import Constants from "../../../constants";
import { Dimensions } from "react-native";
const Height = Dimensions.get("window").height;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#2c3e50',
  },
  headerWrapper: { marginTop: "10@ms" },
  backButtonStyle: { position: "absolute", left: 20, top: 5, zIndex: 1 },
  titleTextStyle: {
    textAlign: "center",
    color: Constants.Colors.WhiteColor,
    fontFamily: "ProximaNova-Regular",
    fontSize: 20,
    marginTop: "10@ms",
  },
  flexHorizontal: { flex: 1, marginHorizontal: "25@ms" },
  socialButtonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "35@ms",
  },
  orText: {
    fontSize: 14,
    lineHeight: 20,
    color: Constants.Colors.TextGrayColor,
    fontFamily: "ProximaNova-Regular",
    textAlign: "center",
    marginVertical: "12@ms",
  },
  flex1: { flex: 1 },
  paddingVert: { paddingVertical: "10@ms" },
  firstLastNameWrapper: {
    flexDirection: "row",
    height: "65@ms",
  },
  paddingRightFlex: { paddingRight: "3@ms", flex: 1 },
  paddingLeftFlex: { paddingLeft: "3@ms", flex: 1 },
  marginTop20: { marginTop: "20@ms" },
  textInputWrapper: {
    height: "65@ms",
    marginTop: "20@ms",
  },
  termsAndConditionWrapper: { marginTop: "40@ms", justifyContent: "center" },
  termTextStyle: {
    color: Constants.Colors.WhiteColor,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "ProximaNova-Regular",
    textAlign: "center",
  },
  signUpButtonWrapper: { paddingVertical: "25@ms" },
  alreadyButtonWrapper: { paddingBottom: "25@ms", paddingTop: "10@ms" },
  alreadyButton: {
    alignSelf: "center",
    width: "173@ms",
    borderRadius: "10@ms",
    borderColor: Constants.Colors.GreenColor,
    borderWidth: "1@ms",
    justifyContent: "center",
    alignItems: "center",
    padding: "5@ms",
  },
  alreadyButtonText: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 10,
    color: Constants.Colors.GreenColor,
    textAlign: "center",
  },
  labelTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 16,
    color: Constants.Colors.WhiteColor,
  },
  pickerInputWrapper: {
    height: "40@ms",
    borderBottomColor: Constants.Colors.WhiteColor,
    borderBottomWidth: "1@ms",
  },
  pickerInnerWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  flagImageStyle: { height: "18@ms", width: "33@ms" },
  pickerTextWrapper: { flex: 1, paddingLeft: "10@ms" },
  pickerTextWrapper1: { flex: 1 },
  errorTextStyle: {
    color: "red",
    fontFamily: "ProximaNova-Regular",
    fontSize: 13,
    // marginBottom:4,
  },
  spinnerTextStyle: {
    color: Constants.Colors.WhiteColor,
    fontFamily: "ProximaNova-Regular",
  },
});

export default styles;
