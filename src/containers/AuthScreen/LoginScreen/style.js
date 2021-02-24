import { ScaledSheet } from "react-native-size-matters";
import { Dimensions, Platform } from "react-native";
const Height = Dimensions.get("window").height;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "20@ms",
    backgroundColor: "#2c3e50",
  },
  flex1: { flex: 1 },
  flex11: { flex: 1 },
  scrollViewStyle: { height: "100%", paddingTop: "5@ms" },
  container1: {
    height: Height / 2.9,
    // backgroundColor:'red',
    // flex: 1,
    justifyContent: "space-evenly",
  },
  iconWrapper: {
    // marginTop: '10@ms',
    height: "60@ms",
    width: "165@ms",
    alignSelf: "center",
  },
  iconStyle: { height: "100%", width: "100%" },
  loginTextStyle: {
    fontSize: 24,
    fontFamily: "ProximaNova-Regular",
    color: "white",
    textAlign: "center",
    marginVertical: "30@ms",
  },
  socialButtonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  orTextStyle: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    marginTop: Platform.OS === "android" ? "15@ms" : "0@ms",
    fontFamily: "ProximaNova-Regular",
  },
  formWrapper: {
    // height: '45%',
    flex:1,
    // paddingTop:'17@ms',
    paddingHorizontal: "15@ms",
    justifyContent: "space-evenly",
  },
  paddingTextInput: { marginTop: "30@ms" },
  dontHaveAccountStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    // paddingBottom: "2@ms",
    fontFamily: "ProximaNova-Regular",
    // textDecorationLine: "underline",
  },
  registerTextStyle: {
    fontSize: 16,
    color: "green",
    textDecorationLine: "underline",
    fontFamily: "ProximaNova-Regular",
  },
  haveAccountWrapper: {
    // flexDirection: "row",
    marginTop:'25@ms',
    justifyContent: "center",
    alignItems:'center',
    marginBottom: "3@ms",
  },
  haveAccountWrapper1: {
    // flexDirection: "row",
    marginBottom: "3@ms",
    justifyContent: "center",
    alignItems:'center',
    // marginHorizontal: "0@ms",
    // width: "100%",
  },
  spinnerTextStyle: {
    color: "#ffffff",
    fontFamily: "ProximaNova-Regular",
  },
});

export default styles;
