import { ScaledSheet } from "react-native-size-matters";
import Constants from "../../../constants";
import { Dimensions } from 'react-native';

const Screenwidth =  Dimensions.get('window').width;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  headerWrapper: {
    width: "101.5%",
    alignSelf: "center",
    borderColor: Constants.Colors.GreenColor,
    borderBottomWidth: "2@ms",
    borderLeftWidth: "2@ms",
    borderRightWidth: "2@ms",
    borderBottomLeftRadius: "35@ms",
    borderBottomRightRadius: "35@ms",
  },
  alignJustifyCenter: { alignItems: "center", flexDirection: "row" },
  flex1: { flex: 1 },
  backButtonStyle: { marginLeft: "10@ms" },
  iconTopWrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    height: "36@ms",
    width: "93@ms",
  },
  iconImageStyle: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  headerButtonWrapper: { flexDirection: "row", padding: "20@ms" },
  logoutButtonWrapper: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  settingButtonWrapper: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  profileImageWrapper: {
    position: "relative",
    height: "107@ms",
    width: "107@ms",
    borderWidth: "2@ms",
    borderColor: Constants.Colors.WhiteColor,
    alignSelf: "center",
    borderRadius: "54@ms",
    top: -50,
    // bottom:0,
  },
  profileImageStyle: { height: "100%", width: "100%", borderRadius: "54@ms" },
  userDetailWrapper: { alignSelf: "center", bottom: 30 },
  welcomeTextStyle: {
    textAlign: "center",
    fontFamily: "ProximaNova-Regular",
    fontSize: 16,
    fontWeight: "500",
    color: Constants.Colors.GreenColor,
  },
  userNameTextStyle: {
    textAlign: "center",
    fontFamily: "ProximaNova-Regular",
    fontSize: 16,
    fontWeight: "500",
    color: Constants.Colors.WhiteColor,
  },
  stateEditWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stateTextStyle: {
    textAlign: "center",
    fontFamily: "ProximaNova-Regular",
    fontSize: 12,
    color: Constants.Colors.WhiteColor,
  },
  stateTextStyle1: {
    textAlign: "center",
    fontFamily: "ProximaNova-Regular",
    fontSize: 12,
    color: Constants.Colors.WhiteColor,
    marginVertical: "5@ms",
  },
  penImageStyle: { marginLeft: "10@ms" },
  rankWrapper: {
    height: "70@ms",
    backgroundColor: Constants.Colors.DarkGrayColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: "10@ms",
    marginHorizontal: "15@ms",
    flexDirection: "row",
  },
  numberTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 20,
    lineHeight: 20,
    textAlign: "center",
    color: Constants.Colors.WhiteColor,
    fontWeight: "bold",
  },
  numberTitleTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 12,
    lineHeight: 20,
    textAlign: "center",
    color: Constants.Colors.WhiteColor,
  },
  flexCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  dividerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "22@ms",
    marginHorizontal: "15@ms",
  },
  flex1_2: { flex: 1.2 },
  dividerTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 16,
    lineHeight: 16,
    textAlign: "left",
    color: Constants.Colors.WhiteColor,
    fontWeight: "500",
  },
  flex2: { flex: 2 },
  divideLine: { height: "1@ms", backgroundColor: Constants.Colors.GreenColor },
  paddingVertical22: { paddingVertical: "22@ms" },
  divider2Wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10@ms",
    marginHorizontal: "15@ms",
  },
  flex5: { flex: 5 },
  imageWrapper: {
    paddingVertical: "22@ms",
    paddingHorizontal: "0@ms",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageHeightWidth: { height: "91@ms", width: "103@ms", borderRadius: "10@ms", marginLeft: "17@ms" },
  gallaryImageStyle: { height: "100%", width: "100%", borderRadius: "10@ms" },
  editButtonWrapper: { marginTop: "15@ms" },
  ///ccard style
  upcomingCardWrapper: {
    height: "96@ms",
    width: "307@ms",
    borderRadius: "10@ms",
    flexDirection: "row",
    marginLeft: "15@ms",
  },
  upcomingEmptyCardWrapper: {
    height: "96@ms",
    width: Screenwidth,
    borderRadius: "10@ms",
    justifyContent:'center',
    alignItems:'center',
    marginLeft: "15@ms",
  },
  noDataTextStyle:{
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    lineHeight: 16,
    color: Constants.Colors.GreenColor,
    textAlign:'center',
    // fontWeight: 'old,
  },
  cardImageWrapper: {
    flex: 1.2,
    borderTopLeftRadius: "10@ms",
    borderBottomLeftRadius: "10@ms",
  },
  cardImageStyle: {
    height: "100%",
    width: "100%",
    borderTopLeftRadius: "10@ms",
    borderBottomLeftRadius: "10@ms",
  },
  cardDetailWrapper: {
    flex: 2,
    backgroundColor: Constants.Colors.GreenColor,
    borderTopRightRadius: "10@ms",
    borderBottomRightRadius: "10@ms",
    padding: "13@ms",
    justifyContent: "space-between",
  },
  cardContestName: {
    fontSize: 14,
    fontFamily: "ProximaNova-Regular",
    lineHeight: 18,
    fontWeight: "500",
    color: Constants.Colors.WhiteColor,
  },
  cardTimeText: {
    fontSize: 12,
    fontFamily: "ProximaNova-Regular",
    lineHeight: 14,
    color: Constants.Colors.WhiteColor,
  },
  bottomButtonWrapper: {
    flexDirection: "row",
    marginHorizontal: "15@ms",
    justifyContent: 'space-evenly',
    marginBottom: "20@ms",
  },
  haveAccountWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "10@ms",
  },
  dontHaveAccountStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    paddingBottom: "2@ms",
    fontFamily: "ProximaNova-Regular",
  },
  registerTextStyle: {
    fontSize: 16,
    color: "green",
    textDecorationLine: "underline",
    fontFamily: "ProximaNova-Regular",
  },
  blankIcon: { height: "20@ms", width: "20@ms" },
  alertButtonStyle: {
    width: "90@ms",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Constants.Colors.GreenColor
  },
  alertButtonStyle1: {
    width: "90@ms",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'red'
  },
  alertButtonTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 16,
    color: Constants.Colors.WhiteColor
  },
  alertTitleStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 22,
    fontWeight: 'bold',
    color: Constants.Colors.GreenColor
  },
  alertMessageStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 18,
    fontWeight: '400',
    color: Constants.Colors.WhiteColor
  }
});

export default styles;
