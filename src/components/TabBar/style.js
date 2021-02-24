import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  tabWrapper: {
    flexDirection: 'row',
    width: '90%',
    height: '40@ms',
    alignSelf: 'center',
    // backgroundColor:'yellow',
    justifyContent: 'space-around',
    borderBottomWidth: '2@ms',
    borderBottomColor: Constants.Colors.TextGrayColor,
  },
  flex1: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabBottom: {
    height: '4@ms',
    width: '98%',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.GreenColor,
    position: 'relative',
    bottom: '-3@ms',
    borderRadius: '4@ms',
  },
  tabText: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'ProximaNova-Regular',
    color: Constants.Colors.TextGrayColor,
  },
  whiteColor: {color: 'rgb(255,255,255)', fontWeight: 'bold'},
  lightOrange: {color: 'rgb(255,201,159)'},
});

export default styles;
