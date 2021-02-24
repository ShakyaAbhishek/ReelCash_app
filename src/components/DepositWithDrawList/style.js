import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '20@ms',
  },
  dwCardWrapper: {
    paddingVertical: '20@ms',
    flexDirection: 'row',
    borderBottomWidth: '1@ms',
    borderBottomColor: Constants.Colors.TextGrayColor,
  },
  dwRightWrapper: {
    flex: 1,
    paddingLeft: '10@ms',
    flexDirection: 'row',
  },
  dwDetailWrapper: {flex: 2, justifyContent: 'center'},
  dwAmountWrapper: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  dwMethodTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    color: Constants.Colors.WhiteColor,
  },
  dwAmountTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  dwAmountBigTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 20,
    lineHeight: 24,
    color: Constants.Colors.GreenColor,
  },
  transactionListWrapper: {marginTop: '20@ms'},
  tHeaderWrapper: {flexDirection: 'row'},
  tDateTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 10,
    color: Constants.Colors.TextGrayColor,
    lineHeight: 14,
  },
  tHeaderLineStyle: {
    height: '1@ms',
    marginTop: '4@ms',
    width: '100%',
    backgroundColor: Constants.Colors.TextGrayColor,
  },
  tDetailWrapper: {flexDirection: 'row', marginTop: '15@ms'},
  tLeftWrapper: {flex: 2},
  tPaymentTypeTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold',
    color: Constants.Colors.WhiteColor,
  },
  tPaymentIdTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: Constants.Colors.WhiteColor,
    marginTop: '5@ms',
  },
  tRightWrapper: {flex: 1, alignItems: 'flex-end'},
  tAmountTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 20,
    lineHeight: 20,
    color: Constants.Colors.GreenColor,
  },
  tPayStatusWrapper: {
    paddingHorizontal: '13@ms',
    paddingVertical: '2@ms',
    backgroundColor: Constants.Colors.BlueColor,
    borderRadius: '10@ms',
    marginTop: '8@ms',
  },
  tPaymentTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 10,
    color: Constants.Colors.WhiteColor,
    lineHeight: 14,
  },
  tDateWrapper: { marginRight: '10@ms' },
});

export default styles;
