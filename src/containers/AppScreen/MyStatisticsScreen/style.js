import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../../constants';
import constants from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  container1: {
    flex: 1,
    // backgroundColor: Constants.Colors.DarkGrayColor,
  },
  headerCardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: '20@ms',
  },
  smallCardWrapper: {
    height: '70@ms',
    width: '160@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
    borderRadius: '10@ms',
    paddingVertical: '15@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingWhiteText: {
    fontFamily: 'ProximaNova-Regular',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 22,
    color: Constants.Colors.WhiteColor,
  },
  headerCardTitle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Constants.Colors.WhiteColor,
  },
  titleWrapper: {
    marginTop: '25@ms',
    paddingBottom: '10@ms',
    paddingHorizontal: '20@ms',
  },
  titleTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 15,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  flexRow: {flexDirection: 'row'},
  SrWrapper: {flex: 0.6},
  tpwWrapper: {flexDirection: 'row', flex: 5, marginHorizontal: '5@ms'},
  tournamentWrapper: {flex: 2},
  pointsWrapper: {flex: 0.8},
  winningWrapper: {flex: 1},
  winningWrapper1: {flex: 0.9},
  titleWonText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 15,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
    fontWeight: '500',
  },
  listItemWrapper: {
    flexDirection: 'row',
    paddingHorizontal: '20@ms',
    marginVertical: '10@ms',
  },
  srNoWrapper: {flex: 0.6, justifyContent: 'center'},
  srNoTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
    color: Constants.Colors.BlueTextColor,
  },
  itemTPWWrapper: {flex: 5},
  tpwShadowWrapper: {
    flexDirection: 'row',
    padding: '15@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
    borderRadius: '10@ms',
  },
  tournamentNameText: {
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 12,
    color: Constants.Colors.WhiteColor,
  },
  tournamentTimeText: {
    fontFamily: 'ProximaNova-Regular',
    marginTop: '5@ms',
    fontSize: 9,
    lineHeight: 11,
    color: Constants.Colors.WhiteColor,
  },
  pointsTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 15,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  amountTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 15,
    lineHeight: 18,
    color: Constants.Colors.GreenColor,
  },
});

export default styles;
