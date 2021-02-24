import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.44,
    shadowRadius: 6,
    elevation: 5,
  },
  borderWrapper: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
    borderColor: Constants.Colors.DarkGreenColor,
    borderWidth: '1@ms',
    borderTopLeftRadius: '10@ms',
    borderBottomLeftRadius: '10@ms',
    padding: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  leftColorWrapper: {
    flex: 1,
    backgroundColor: Constants.Colors.WhiteColor,
    borderTopLeftRadius: '10@ms',
    borderBottomLeftRadius: '10@ms',
    padding: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackRightWrapper: {
    flex: 3,
    backgroundColor: Constants.Colors.DarkGrayColor,
    borderTopRightRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
    padding: '10@ms',
    justifyContent: 'center',
    paddingLeft: '20@ms',
    elevation: 5,
  },
  greenRightWrapper: {
    flex: 3,
    backgroundColor: Constants.Colors.DarkGreenColor,
    borderTopRightRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
    padding: '10@ms',
    justifyContent: 'center',
    paddingLeft: '20@ms',
  },
  locationWhiteText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: Constants.Colors.WhiteColor,
  },
  secondTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 11,
    color: Constants.Colors.WhiteColor,
  },
});

export default styles;
