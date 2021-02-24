import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: '15@ms',
    paddingTop: '5@ms',
    marginBottom:'10@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  pointsWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // paddingBottom: '5@ms',
  },
  blueButtonStyle: {
    height: '26@ms',
    width: '50@ms',
    backgroundColor: Constants.Colors.BlueColor,
    borderRadius: '15@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueButtonText: {
    fontFamily: 'ProximaNova-Regular',
    color: 'white',
    fontSize: 12,
  },
  logoWrapper: {flex: 2, justifyContent: 'center', alignItems: 'center'},
  logoImageWrapper: {
    height: '35@ms',
    width: '92%',
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  profileImageStyle: {
    height: '33@ms',
    width: '33@ms',
    borderRadius: '20@ms',
    backgroundColor: 'white',
  },
  profileIm: {height: '100%', width: '100%', borderRadius: '20@ms'},
  badgeWrapper: {
    height: '16@ms',
    width: '16@ms',
    backgroundColor: Constants.Colors.BlueColor,
    borderRadius: '10@ms',
    position: 'absolute',
    right: '0@ms',
    left: '23@ms',
    top: '0@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'ProximaNova-Regular',
    color: 'white',
    fontSize: 12,
  },
});

export default styles;
