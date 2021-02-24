import { ScaledSheet } from "react-native-size-matters";
import { Dimensions, Platform } from "react-native";
import Constants from "../../../constants";
const Height = Dimensions.get("window").height;
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  flex1: { flex: 1 },
  flex11: { flex: 1,  paddingHorizontal:'35@ms' },
  container1: {
    height: Height / 4,
    // backgroundColor:'red',
    // flex: 1,
    justifyContent: 'space-between',
  },
  mainWrapper: {height: Height / 2, justifyContent: 'space-around' },
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
  scrollViewStyle: { height: "100%", paddingTop: "5@ms" },
  backButtonWrapper: {paddingLeft:'15@ms', paddingTop: '10@ms'},
});

export default styles;
