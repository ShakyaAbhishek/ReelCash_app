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
  innerContainerWrapper: {paddingTop: '35@ms', flex: 1},
  headingWrapper: {paddingHorizontal: '40@ms'},
  headingTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: Constants.Colors.GreenColor,
  },
  flatListWrapper: {flex: 1, paddingTop: '18@ms'},
  cardInnerWrapper: {paddingVertical: '8@ms', flexDirection: 'row', alignItems:'center'},
  selectorOuterWrapper: {
    height: '20@ms',
    width: '20@ms',
    borderWidth: '1@ms',
    borderRadius: '10@ms',
    borderColor: Constants.Colors.WhiteColor,
    marginRight: '17@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectorInnerWrapper: {
    height: '7@ms',
    width: '8@ms',
    borderRadius: '4@ms',
    backgroundColor: Constants.Colors.GreenColor,
  },
  itemTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  selectedItemWrapper: {
    paddingHorizontal: '40@ms',
    backgroundColor: 'rgb(24,28,34)',
  },
  unSelectedItemWrapper: {
    paddingHorizontal: '40@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  submitWrapper: {marginBottom:'15@ms'}
});

export default styles;
