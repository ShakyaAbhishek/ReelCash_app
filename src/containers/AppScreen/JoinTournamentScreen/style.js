import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  container1: {
    flex: 1,
    // backgroundColor: Constants.Colors.DarkGrayColor,
  },
  contestNameWrapper: {
    marginTop: '20@ms',
    marginHorizontal: '17@ms',
    height: '50@ms',
    width: '100%',
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
  contestNameTextStyle1: {
    fontFamily: 'ProximaNova-Regular',
    color: Constants.Colors.TextGrayColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTimeTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    color: 'white',
    fontSize: 12,
  },
  //   plusIconWrapper: {
  //     height: '38@ms',
  //     width: '38@ms',
  //     borderRadius: '19@ms',
  //     borderWidth: '2@ms',
  //     borderColor: Constants.Colors.GreenColor,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  joinButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '30@ms',
  },
  amountDetailWrapper: {
    height: '70@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
    marginVertical: '20@ms',
    marginHorizontal: '17@ms',
    flexDirection: 'row',
    elevation: 5,
  },
  flex1Center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  bigHeadingTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 20,
    lineHeight: 22,
    fontWeight: 'bold',
    color: Constants.Colors.WhiteColor,
  },
  smallLableTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  winningPriceDetailWrapper: {
    //   height: 70,
    backgroundColor: Constants.Colors.DarkGrayColor,
    marginVertical: '10@ms',
    marginHorizontal: '17@ms',
    flexDirection: 'row',
  },
  upTextLableStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 11,
    lineHeight: 22,
    color: Constants.Colors.WhiteColor,
  },
  bottomTextLableStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: Constants.Colors.GreenColor,
  },
  bottomTextLableStyle1: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: Constants.Colors.WhiteColor,
  },
  selectRoundWrapperStyle: {
    height:'20@ms', 
    width:'20@ms', 
    justifyContent:'center', 
    alignItems:'center', 
    borderColor:Constants.Colors.TextGrayColor, 
    borderRadius:'10@ms', 
    borderWidth:'1@ms'
  },
  selectRoundInnerStyle: {
    height:"10@ms", 
    width:'10@ms', 
    borderRadius:'5@ms', 
    backgroundColor:Constants.Colors.GreenColor
  },
  subEventsCardStyle: {
    marginTop:'10@ms', 
    paddingBottom:'5@ms', 
    borderBottomColor:Constants.Colors.GreenColor, 
    borderBottomWidth:'1@ms', 
    flexDirection:'row'
  },
});

export default styles;
