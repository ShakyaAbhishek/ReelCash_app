import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  container: { paddingTop: '20@ms', marginHorizontal: '20@ms'},
  cardHeaderStyle: {
    height: '60@ms',
    paddingBottom: '15@ms',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Constants.Colors.TextGrayColor,
    borderBottomWidth: 1,
  },
  blueFishImageStyle: {
    height: '50@ms',
    width: '45@ms',
  },
  fishImage: {height: '100%', width: '100%'},
  contestNameWrapper: {flex: 1, paddingLeft: '10@ms'},
  contestTextStyle: {
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
  plusButtonWrapper: {
    height: '38@ms',
    width: '38@ms',
    borderRadius: '19@ms',
    borderWidth: '2@ms',
    borderColor: Constants.Colors.GreenColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //contest Detail
  contestDetailWrapper: {padding: '23@ms'},
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
  buttonsWrapper: {
    marginVertical: '20@ms',
    height: '45@ms',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  ////
  tournamentImageWrapper: {height: '135@ms', borderRadius: '10@ms'},
  tImageHeightWidth: {
    height: '100%',
    width: '100%',
    borderRadius: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tImageStyle: {height: '100%', width: '100%', borderRadius: '10@ms'},
  winnerTagWrapper: {marginVertical: '25@ms'},
  listHeadingWrapper: {flexDirection: 'row'},
  flex1: {flex: 1},
  listHeadingTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 11,
    color: Constants.Colors.TextGrayColor,
  },
  flex1half: {flex: 1.5},
  listItemWrapper: {flexDirection: 'row', paddingVertical: '8@ms'},
  topPosWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  topPosWrapper1: {
    flex: 1,
    justifyContent:'center',
    paddingLeft:'5@ms'
    // alignItems:'center',
  },
  greenPosText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: Constants.Colors.GreenColor,
  },
  listItemTextWhite: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: Constants.Colors.WhiteColor,
  },
  listHeadingWrapper1: {flexDirection: 'row', paddingTop: '20@ms'},
  runnerUpWrapper: { paddingHorizontal: '2@ms', marginTop:'25@ms' },
  textColorBlue:{
    color:'rgb(119,162,255)',
  },
  minusButtonWrapper:{
    height: '38@ms',
    width: '38@ms',
    borderRadius: '19@ms',
    borderColor: Constants.Colors.GreenColor,
    borderWidth: '1@ms',
    justifyContent: "center",
    alignItems: "center",
  },
  minusButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Constants.Colors.WhiteColor,
  },
  // loader style
  container1: {
    paddingTop: '20@ms', marginHorizontal: '20@ms'
  },
  blueFishImageStyle1: {
    height: '45@ms',
    width: '45@ms',
    borderRadius:'25@ms'
  },
  contestNameWrapper1: {flex: 1, height:'40@ms', paddingLeft: '10@ms', justifyContent:'space-between'},
  loaderButtonWrapper:{ flex: 1, borderRadius: '20@ms' },
  loaderButton: { height: '40@ms', width: '100%', borderRadius: '20@ms' },
  detailLoader: {height:'40@ms', width:'100%'},
  nameLoader1: { height: '16@ms', width: '150@ms' },
  timeLoader1: { height: '14@ms', width: '150@ms' },
});
export default styles;
