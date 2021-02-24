import { ScaledSheet } from "react-native-size-matters";
import Constants from "../../constants";

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    borderRadius: "10@ms",
    maxHeight: '80%',
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
  itemTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 16,
    fontWeight: "400",
    color: Constants.Colors.WhiteColor,
  },
  flatListStyle: { padding: "10@ms" },
  closeButtonStyle: {
    height: "40@ms",
    backgroundColor: 'red',
    marginTop: "10@ms",
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
});

export default styles;
