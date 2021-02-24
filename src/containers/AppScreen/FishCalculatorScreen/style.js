import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  container1: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    marginTop: '20@ms',
    marginHorizontal: '25@ms',
  },
  labelTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    color: Constants.Colors.GreenColor,
  },
  pickerButtonWrapper: {
    marginTop: '15@ms',
    height: '42@ms',
    borderColor: 'white',
    borderRadius: '15@ms',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '15@ms',
  },
  pickerInnerTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    color: Constants.Colors.WhiteColor,
  },
  pickerWrapper: {marginTop: '25@ms'},
  fishLengthWrapper: {
    marginTop: '15@ms',
    height: '100@ms',
    flexDirection:'row',
    // backgroundColor:'red',
    // borderColor: 'white',
    borderRadius: '20@ms',
    // borderWidth: '1@ms',
  },
  pointsButtonWrapper: {
    paddingVertical: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointButtonStyle: {
    paddingVertical: '16@ms',
    width: '204@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
    elevation:5,
    borderRadius: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointButtonTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 26,
    lineHeight: 30,
    color: Constants.Colors.WhiteColor,
    fontWeight: 'bold',
  },
  pointButtonTextStyle1: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 18,
    lineHeight: 24,
    color: Constants.Colors.GreenColor,
    fontWeight: '500',
  },
  optionPrivateWrapper: {
    paddingBottom: '4@ms',
    borderBottomWidth: '1@ms',
    borderBottomColor: Constants.Colors.GreenColor,
    alignSelf: 'center',
    paddingVertical: '25@ms',
  },
  bottomButtonWrapper: {
    paddingHorizontal: '20@ms',
    marginVertical: '25@ms',
    // flexDirection: 'row',
  },
  flexCenter: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  doneButtonStyle: {
    width: '114@ms',
    height: '41@ms',
    borderRadius: '20@ms',
    backgroundColor: Constants.Colors.BlueColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: Constants.Colors.WhiteColor,
  },
  enterButtonStyle: {
    width: '182@ms',
    height: '41@ms',
    borderRadius: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Constants.Colors.WhiteColor,
    borderWidth: '2@ms',
    marginTop: '25@ms',
    alignSelf:'center',
  },
  flexHalfCenter: {
    flex: 1.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelTextStyle1: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    color: 'red',
  },
});

export default styles;
