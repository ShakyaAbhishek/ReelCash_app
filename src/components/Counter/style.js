import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  counterWrapperStyle: {
    flexDirection: 'row',
    marginHorizontal: '20@ms',
    justifyContent: 'space-around',
    marginTop: '25@ms',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterUpperWrapper: {
    height: '54@ms',
    width: '54@ms',
    borderColor: Constants.Colors.GreenColor,
    borderWidth: '3@ms',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: '28@ms',
  },
  counterInnerWrapper: {
    height: '36@ms',
    width: '36@ms',
    backgroundColor: "white",
    borderRadius: '18@ms',
    justifyContent: "center",
    alignItems: "center",
  },
  countTextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 16,
    fontWeight: "500",
    color: Constants.Colors.DarkGrayColor,
    textAlign: "center",
  },
  countTypeStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 13,
    textAlign: "center",
    marginTop: '10@ms',
    color: Constants.Colors.WhiteColor,
  }
});

export default styles;
