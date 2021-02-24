import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  container1: {
    flex: 1,
  },
  selectedImageWrapper: {
    paddingHorizontal: '20@ms',
    paddingVertical: '26@ms',
    flexDirection: 'row',
  },
  selectInnerImageWrapper: {flex: 1, justifyContent: 'center'},
  selectImageWrapper: {
    height: '50@ms',
    width: '50@ms',
    borderRadius: '10@ms',
    elevation: 5,
  },
  selectImageStyle: {height: '100%', width: '100%', borderRadius: '10@ms'},
  catchDetailWrapper: {paddingHorizontal: '20@ms'},
  headingWrapper: {
    paddingBottom: '10@ms',
    borderBottomColor: Constants.Colors.TextGrayColor,
    borderBottomWidth: '1@ms',
  },
  headingTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    lineHeight: 18,
    color: Constants.Colors.GreenColor,
  },
  detailCardWrapper: {
    flexDirection: 'row',
    paddingHorizontal: '15@ms',
    paddingVertical: '10@ms',
    marginTop: '18@ms',
    borderRadius: '10@ms',
    elevation: 5,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  cardTypeWrapper: {flex: 2},
  cardTypeTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: Constants.Colors.WhiteColor,
  },
  cardRightWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailTypeWrapper: {flex: 1, alignItems: 'center'},
  detailTypeTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  locationWrapper: {marginTop: '30@ms', paddingHorizontal: '20@ms'},
  locationViewWrapper: {
    height: '164@ms',
    width: '100%',
    backgroundColor: 'red',
    marginTop: '20@ms',
  },
});

export default styles;
