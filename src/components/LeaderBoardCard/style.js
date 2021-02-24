import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  leaderBoardWrapper: {
    // height: '100@ms',
    paddingVertical: '15@ms',
    marginHorizontal: '15@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 5},
    // shadowOpacity: 0.34,
    // shadowRadius: 5,
    elevation: 5,
    borderRadius: '10@ms',
    flexDirection: 'row',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countPriceText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'ProximaNova-Regular',
  },
  typeTextStyle: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'ProximaNova-Regular',
  },
  leaderGreenWrapper: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderBoardGreenButton: {
    borderWidth: '2@ms',
    borderColor: Constants.Colors.GreenColor,
    flexDirection: 'row',
    padding: '9@ms',
    width: '100%',
    borderRadius: '25@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderGreenText: {
    fontSize: 13,
    color: Constants.Colors.GreenColor,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'ProximaNova-Regular',
    marginLeft: '15@ms',
  },
});

export default styles;
