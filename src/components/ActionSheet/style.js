import { ScaledSheet } from "react-native-size-matters";
import Constants from "../../constants";

const styles = ScaledSheet.create({
  container: {
    height: "300@ms",
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: "20@ms",
    // padding:'20@ms',
  },
  modalView: {
    justifyContent: "flex-end",
    margin: 0,
  },
  upperContainer: {
    backgroundColor: Constants.Colors.DarkGrayColor,
    borderRadius: "20@ms",
    marginHorizontal: "10@ms",
  },
  upperHandel: {
    height: "7@ms",
    width: "70@ms",
    borderRadius: "10@ms",
    alignSelf: "center",
    backgroundColor: Constants.Colors.GrayColor,
    marginTop: "10@ms",
  },
  upperDetailStyle: {
    height: "60@ms",
    width: "95%",
    alignSelf: "center",
    marginTop: "10@ms",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsStyle: {
    height: "55@ms",
    width: "100%",
    marginTop: "10@ms",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: Constants.Colors.GrayColor,
    borderTopWidth: "1@ms",
  },
  cancelButtonStyle: {
    height: "55@ms",
    width: "95%",
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: "20@ms",
    marginTop: "10@ms",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyles: {
    fontSize: 18,
    color: Constants.Colors.WhiteColor,
    fontWeight: "bold",
    fontFamily: 'ProximaNova-Regular',
  },
});

export default styles;
