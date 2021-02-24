import { ScaledSheet } from "react-native-size-matters";
import Constants from "../../constants";

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    // flex:1,
    borderRadius: "10@ms",
    maxHeight: '80%',
    // height:'100%',
    backgroundColor: 'rgb(31,35,43)',
  },
  itemStyle: {
    height: "40@ms",
    width: "100%",
    backgroundColor: Constants.Colors.DarkGrayColor,
    borderBottomWidth: "1@ms",
    borderBottomColor: Constants.Colors.WhiteColor,
    justifyContent: "center",
    alignItems: "center",
  },
  itemStyle1: {
    // height: "40@ms",
    width: "100%",
    backgroundColor: Constants.Colors.DarkGrayColor,
    borderBottomWidth: "1@ms",
    borderBottomColor: Constants.Colors.WhiteColor,
    justifyContent: "center",
    // alignItems: "center",
  },
  itemTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 16,
    fontWeight: "400",
    color: Constants.Colors.WhiteColor,
  },
  itemTextStyle1: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 20,
    fontWeight: "400",
    textAlign: 'center',
    color: Constants.Colors.GreenColor,
  },
  flatListStyle: { padding: "10@ms" },
  closeButtonStyle: {
    height: "40@ms",
    backgroundColor: 'red',
    marginTop: "1@ms",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10@ms",
  },
  closeButtonTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 16,
    fontWeight: "500",
    color: Constants.Colors.WhiteColor,
  },
  CountryHeaderText: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 18,
    fontWeight: "500",
    color: Constants.Colors.WhiteColor,
  }
});

export default styles;
