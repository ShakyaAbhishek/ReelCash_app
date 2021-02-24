import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  container1: {
    flex: 1,
    // marginTop: '20@ms',
    // marginHorizontal: '20@ms',
    // backgroundColor: Constants.Colors.DarkGrayColor,
  },
  scrollViewStyle: {paddingTop: '20@ms', paddingHorizontal: '20@ms'},
  headerImageWrapper: {height: '196@ms', borderRadius: '15@ms'},
  headerImageStyle: {height: '100%', width: '100%', borderRadius: '15@ms'},
  headingWrapper: {marginTop: '25@ms'},
  headingTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  recentListStyle: {paddingHorizontal: '5@ms', paddingVertical: '10@ms'},
  allListStyle: {paddingHorizontal: '5@ms', flex: 1, paddingBottom: '30@ms'},
  cardWrapper: {marginTop: '15@ms'},
});

export default styles;
