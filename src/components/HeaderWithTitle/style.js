import { ScaledSheet } from 'react-native-size-matters';
import { Platform } from 'react-native';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '13@ms',
    borderColor: '#00000060',
    borderBottomWidth: '2@ms',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.54,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  container1: {
    // flex:1,
    // marginHorizontal: '15@ms',
    flexDirection: 'row',
    paddingTop: '10@ms',
    paddingHorizontal: Platform.OS === 'ios' ? '5@ms' : 0,
    paddingBottom: '10@ms',
  },
  backButtonStyle: { height: '25@ms', width: '25@ms', marginRight: '10@ms', marginLeft: '10@ms' },
  backButtonStyle1: {
    height: '25@ms',
    width: '25@ms',
    marginRight: '10@ms',
    transform: [{ rotate: '180deg' }],
  },
  pointsWrapper: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: '1@ms',
  },
  titleText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: Constants.Colors.WhiteColor,
  },
  titleTextUP: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 8,
    color: Constants.Colors.WhiteColor,
    paddingBottom: '10@ms'
  },
  logoWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoWrapper1: { flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  profileImageWrapper: {
    // flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileImageStyle: {
    height: '36@ms',
    width: '36@ms',
    borderRadius: '18@ms',
    // backgroundColor: 'white',
  },
  profileIm: { height: '100%', width: '100%', borderRadius: '20@ms' },
  badgeWrapper: {
    height: '20@ms',
    width: '20@ms',
    backgroundColor: Constants.Colors.BlueColor,
    borderRadius: '10@ms',
    position: 'absolute',
    right: '0@ms',
    left: '25@ms',
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
