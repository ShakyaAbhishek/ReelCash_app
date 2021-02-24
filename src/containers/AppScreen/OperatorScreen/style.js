import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  flex1: {flex: 1},
  ScrollableTabStyle: {
    // marginHorizontal: '20@ms',
    paddingTop: '15@ms',
    flex:1,
  },
  dividerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: '1@ms',
    marginHorizontal: '15@ms',
  },
  flex1_2: {flex: 1},
  dividerTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'left',
    color: Constants.Colors.WhiteColor,
    fontWeight: '500',
  },
  flex3: {flex: 3},
  flex2: {flex: 2.5},
  divideLine: {height: '1@ms', backgroundColor: Constants.Colors.GreenColor},
  alertButtonStyle: {
    width: "90@ms",
    justifyContent: "center",
    alignItems: "center",
  },
  alertButtonTextStyle:{
    fontFamily: "ProximaNova-Regular",
    fontSize: 16,
    color:Constants.Colors.WhiteColor
  },
  alertTitleStyle:{
    fontFamily: "ProximaNova-Regular",
    fontSize: 22,
    fontWeight:'bold',
    color:Constants.Colors.GreenColor
  },
  alertMessageStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 18,
    fontWeight:'400',
    color:Constants.Colors.WhiteColor
  }
});
export default styles;
