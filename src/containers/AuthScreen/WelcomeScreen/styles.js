import { ScaledSheet } from "react-native-size-matters";
import Constants from "../../../constants";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  flex1: { flex: 1 },
  upperWrapper: { flex: 4, justifyContent: "center", alignItems: "center" },
  headingTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 28,
    color: Constants.Colors.WhiteColor,
  },
  detailTextWrapper: { marginHorizontal: "40@ms", marginTop: "24@ms",},
  detailTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 18,
    color: Constants.Colors.WhiteColor,
    textAlign: "center",
  },
  sliderButtonWrapper: {
    marginTop: "41@ms",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  firstPointWrapper: {
    height: "15@ms",
    width: "15@ms",
    borderRadius: "8@ms",
    backgroundColor: Constants.Colors.GrayColor,
    borderWidth: "1@ms",
    borderColor: Constants.Colors.GreenColor,
  },
  secondPointWrapper: {
    height: "15@ms",
    width: "15@ms",
    borderRadius: "8@ms",
    backgroundColor: Constants.Colors.GrayColor,
    borderWidth: "1@ms",
    borderColor: Constants.Colors.GreenColor,
    marginHorizontal: "20@ms",
  },
  thirdPointWrapper: {
    height: "15@ms",
    width: "15@ms",
    borderRadius: "8@ms",
    backgroundColor: Constants.Colors.GrayColor,
    borderWidth: "1@ms",
    borderColor: Constants.Colors.GreenColor,
  },
  greenBackground: {
    backgroundColor: Constants.Colors.GreenColor,
  },
  carouselWrapper: {
    height: '150@ms',
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default styles;
