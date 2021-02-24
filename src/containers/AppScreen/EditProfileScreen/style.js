import { ScaledSheet } from 'react-native-size-matters';
import Constants from '../../../constants';
import { Dimensions } from 'react-native';
const Height = Dimensions.get('window').height;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  container1: {
    flex: 1,
  },
  flexHorizontal: { flex: 1, marginHorizontal: '25@ms', paddingTop: '20@ms' },
  socialButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: '25@ms',
  },
  resetPasswordText: {
    fontSize: 16,
    lineHeight: 20,
    color: Constants.Colors.GreenColor,
    fontFamily: 'ProximaNova-Regular',
  },
  flex1: { flex: 1 },
  paddingVert: { paddingVertical: '10@ms' },
  firstLastNameWrapper: {
    flexDirection: 'row',
    height: '65@ms',
  },
  paddingRightFlex: { paddingRight: '3@ms', flex: 1 },
  paddingLeftFlex: { paddingLeft: '3@ms', flex: 1 },
  marginTop20: { marginTop: '20@ms' },
  textInputWrapper: {
    height: '65@ms',
    marginTop: '20@ms',
  }, labelTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 16,
    color: Constants.Colors.WhiteColor,
  }, pickerInputWrapper: {
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
  termsAndConditionWrapper: { marginTop: '25@ms', justifyContent: 'center' },
  termTextStyle: {
    color: Constants.Colors.WhiteColor,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
  },
  signUpButtonWrapper: { paddingVertical: '25@ms' },
  alreadyButtonWrapper: { paddingBottom: '25@ms', paddingTop: '10@ms' },
  alreadyButton: {
    alignSelf: 'center',
    width: '173@ms',
    borderRadius: '10@ms',
    borderColor: Constants.Colors.GreenColor,
    borderWidth: '1@ms',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5@ms',
  },
  alreadyButtonText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 10,
    color: Constants.Colors.GreenColor,
    textAlign: 'center',
  },
  resetPassWrapper: { marginTop: '10@ms' },
});

export default styles;
