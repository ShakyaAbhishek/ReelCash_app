import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  cardWrapper: {
    height: '37@ms',
    borderRadius: '10@ms',
    flexDirection: 'row',
    elevation:5,
    margin: '2@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  cardImageWrapper: {
    width: '59@ms',
    // height: 37,
    borderTopLeftRadius: '10@ms',
    borderBottomLeftRadius: '10@ms',
  },
  cardImageStyle: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: '10@ms',
    borderBottomLeftRadius: '10@ms',
  },
  cardDetailWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '12@ms',
    alignItems: 'center',
  },
  flex1: {flex: 1},
  cardTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
});

export default styles;
