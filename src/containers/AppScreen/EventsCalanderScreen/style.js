import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  calanderWrapperStyle: {
    width: '80%',
    alignSelf: 'center',
    marginTop: '25@ms',
    padding: '5@ms',
    borderRadius: '20@ms',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.34,
    shadowRadius: 5,
    elevation: 5,
    // backgroundColor:'red',
    backgroundColor: 'rgb(31,35,43)',
  },
  contestImageContainer: {
    height: '126@ms',
    marginHorizontal: '20@ms',
    marginTop: '25@ms',
    borderRadius: '10@ms',
  },
  imageStyle: {height: '100%', width: '100%', borderRadius: '10@ms'},
  contestDetailWrapper: {flexDirection: 'row', margin: '20@ms'},
  contestNameTimeWrapper: {
    flex: 1,
    marginLeft: '15@ms',
    paddingVertical: '5@ms',
    justifyContent: 'space-between',
  },
  contestNameText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    fontWeight: '500',
    color: Constants.Colors.WhiteColor,
  },
  contestTimeText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    color: Constants.Colors.WhiteColor,
  },
  locationPriceWrapper: {
    height: '67@ms',
    marginVertical: '5@ms',
    marginHorizontal: '20@ms',
    borderRadius: '10@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.34,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    padding: '15@ms',
  },
  locationWhiteText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: Constants.Colors.WhiteColor,
  },
  locationGreenText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    color: Constants.Colors.GreenColor,
  },
  marginLeft10: {marginLeft: '10@ms'},
  eventDayBlueStyle: {
    borderWidth: '2@ms',
    height: '32@ms',
    width: '32@ms',
    borderRadius: '19@ms',
    borderColor: Constants.Colors.BlueColor,
  },
  eventDayGreenStyle: {
    borderWidth: '2@ms',
    height: '32@ms',
    width: '32@ms',
    borderRadius: '19@ms',
    borderColor: Constants.Colors.GreenColor,
  },
  noDataTextStyle:{
    fontFamily: 'ProximaNova-Regular',
    fontSize: 24,
    lineHeight: 24,
    color: Constants.Colors.GreenColor,
    // fontWeight: 'old,
  },
  calanderStyle: { height: '340@ms' }
});

export default styles;
