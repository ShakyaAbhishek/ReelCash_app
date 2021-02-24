import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';
const styles = ScaledSheet.create({
  container: {
    // width: '100%',
    // height:'40@ms'
  },
  TextStyle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'ProximaNova-Regular',
    fontWeight: 'bold',
  },
  placeholderStyle: {
    height: '40@ms',
    borderBottomColor: 'rgb(255,255,255)',
    fontFamily: 'ProximaNova-Regular',
    borderBottomWidth: '1@s',
    color: 'white',
    fontSize: 16,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
    color: 'white',
  },
  greenText: {
    color: Constants.Colors.GreenColor,
  },
  EyeIconStyle: {
    // height: '18@ms',
    // width: '18@ms',
    // backgroundColor: 'red',
    position: 'absolute',
    right: 0,
    bottom: 12,
    zIndex: 1,
  },
  eyeStyleIcon:{
    height: "20@ms",
    width: '25@ms',
    resizeMode:'contain',
  },
  errorTextStyle: {
    color: "red",
    fontFamily: "ProximaNova-Regular",
    fontSize: 13,
  },
});

export default styles;
