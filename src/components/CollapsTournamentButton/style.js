import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: '10@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.44,
    shadowRadius: 6,
    elevation: 5,
  },
  titleWrapper: {
    flex: 4,
    paddingVertical: '14@ms',
    paddingLeft: '19@ms',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    fontWeight: '500',
    color: Constants.Colors.WhiteColor,
  },
  downImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
