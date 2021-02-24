import { ScaledSheet } from "react-native-size-matters";
import Constants from "../../constants";
const styles = ScaledSheet.create({
  container: {
    // width: '100%',
    // flex:1
    // height:'45@ms',
  },
  flex1: { flex: 1 },
  TextStyle: {
    fontSize: 16,
    color: "white",
    fontFamily: "ProximaNova-Regular",
    fontWeight: "bold",
  },
  placeholderStyle: {
    height: "40@ms",
    fontFamily: "ProximaNova-Regular",
    color: "white",
    // borderBottomWidth: "1@s",
    // borderBottomColor: "rgb(255,255,255)",
    fontSize: 16,
  },
  titleText: {
    fontSize: 16,
    fontFamily: "ProximaNova-Regular",
    color: "white",
  },
  greenText: {
    color: Constants.Colors.GreenColor,
  },
  mainWrapper: {height:'40@ms'},
  applyField: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: "1@s",
    borderBottomColor: "rgb(255,255,255)",
  },
  textField: {
    flexDirection: "column",
  },
  promocodeWrapper: {
    height: "25@ms",
    width: "50@ms",
    borderRadius: "15@ms",
    borderColor: Constants.Colors.GreenColor,
    borderWidth: "1@ms",
    justifyContent: "center",
    alignItems: "center",
  },
  borderBottomStyle: {
    borderBottomWidth: "1@s",
    borderBottomColor: "rgb(255,255,255)",
  },
  applyButtonText: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 10,
    color: Constants.Colors.GreenColor,
  },
  errorTextStyle: {
    color: "red",
    fontFamily: "ProximaNova-Regular",
    fontSize: 13,
  },
});

export default styles;
