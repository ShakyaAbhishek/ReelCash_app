import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  container: {paddingTop: '20@ms'},
  contestImageWrapper: {
    height: '137@ms',
    // width: '100%',
    borderRadius: '5@ms',
    marginHorizontal: '20@ms',
  },
  contestImageStyle: {
    height: '100%',
    width: '99.5%',
    borderRadius: '5@ms',
  },
  contestNameWrapper: {
    marginTop: '15@ms',
    height: '50@ms',
    marginHorizontal: '20@ms',
    // width: '100%',
    // backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fishImageWrapper: {
    height: '50@ms',
    width: '45@ms',
  },
  fishImageStyle: {height: '100%', width: '100%'},
  nameTimeWrapper: {flex: 1, paddingLeft: '10@ms'},
  contestNameTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTimeTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    color: 'white',
    fontSize: 12,
  },
  plusIconWrapper: {
    height: '38@ms',
    width: '38@ms',
    borderRadius: '19@ms',
    borderWidth: '2@ms',
    borderColor: Constants.Colors.GreenColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //for upcoming card
  upcomingContainer: {
    paddingTop: '10@ms',
    paddingBottom: '20@ms',
    // marginHorizontal: '20@ms',
  },
  progressBarWrapper: {paddingVertical: '10@ms'},
  progressBarLinestyle: {
    height: '2@ms',
    width: '100%',
    backgroundColor: Constants.Colors.LightGrayColor,
    borderRadius: '2@ms',
  },
  completeLineStyle: {
    height: '8@ms',
    width: '1%',
    backgroundColor: Constants.Colors.GreenColor,
    borderRadius: '4@ms',
    position: 'absolute',
    top: '7@ms',
    bottom: '0@ms',
    zIndex: 1,
  },
  daysLeftTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    color: Constants.Colors.WhiteColor,
    marginBottom:'5@ms',
  },
  flexRow: {flexDirection: 'row'},
  detailsLineStyle: {flex: 4, justifyContent: 'center'},
  detailLine: {
    height: '2@ms',
    width: '100%',
    backgroundColor: Constants.Colors.TextGrayColor,
  },
  detailsButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginRight:'10@ms',
  },
  detailButtonTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    color: 'white',
    fontSize: 12,
  },
  downArrowButtonWrapper: {
    width: '10@ms',
    height: '6@ms',
    backgroundColor: 'white',
  },
  //for onGoing Card
  buttonsWrapper: {
    marginVertical: '20@ms',
    marginHorizontal:'20@ms',
    height: '45@ms',
    width: '90%',
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  /////////////
  contestDetailWrapper: {
    paddingVertical: '10@ms',
    borderWidth: 0.9,
    borderColor: '#11111120',
    marginTop: '23@ms',
    // marginHorizontal: '5@ms',
    // borderRadius: '10@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.44,
    shadowRadius: 6,
    elevation: 5,
  },
  upperTextWrapper: {flexDirection: 'row', justifyContent: 'space-around'},
  bottomTextWrapper: {
    flexDirection: 'row',
    paddingTop: '15@ms',
    justifyContent: 'space-around',
  },
  flexWithCenter: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  whiteHeadingText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 11,
    color: Constants.Colors.WhiteColor,
    alignSelf: 'center',
  },
  greenHeadingText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: Constants.Colors.GreenColor,
    alignSelf: 'center',
  },
  // buttonsWrapper: {
  //   marginVertical: '20@ms',
  //   height: '45@ms',
  //   width: '100%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  // }
  marginHorizontal20: {
    marginHorizontal: '20@ms',
  },
  // loader Component
  fishImageWrapper1: {
    height: '45@ms',
    width: '45@ms',
    borderRadius:'25@ms',
  },
  nameTimeWrapper1: { height: '40@ms', justifyContent: 'space-between' },
  nameLoader1: { height: '16@ms', width: '150@ms' },
  timeLoader1: { height: '14@ms', width: '150@ms' },
  plusIconwrapper1: { borderWidth: 0, marginRight: '5@ms' },
  loaderButtonWrapper:{ flex: 1, borderRadius: '20@ms' },
  loaderButton: { height: '40@ms', width: '100%', borderRadius: '20@ms' },
  cardDetailText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  detailsContainer:{
    marginHorizontal: '20@ms',
    marginTop:'20@ms',
    // marginBottom:'10@ms'
  }
});
export default styles;
