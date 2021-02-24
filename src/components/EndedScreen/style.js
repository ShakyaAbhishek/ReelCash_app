import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';
import {Platform} from 'react-native';
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // paddingVertical: '26@ms',
    // marginBottom: Platform.OS === 'android' ? '30@ms' : '0@ms',
  },
  noDataTextStyle:{
    fontFamily: 'ProximaNova-Regular',
    fontSize: 24,
    lineHeight: 24,
    color: Constants.Colors.GreenColor,
    // fontWeight: 'old,
  }
});
export default styles;
