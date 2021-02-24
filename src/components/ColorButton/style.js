import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  container: {
    height: '41@ms',
    width: '190@ms',
    backgroundColor: Constants.Colors.BlueColor,
    alignSelf: 'center',
    borderRadius: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle: {
    fontSize: 16,
    color: Constants.Colors.WhiteColor,
    fontWeight: 'bold',
  },
  container1: {
    height: '41@ms',
    width: '150@ms',
    backgroundColor: Constants.Colors.BlueColor,
    alignSelf: 'center',
    borderRadius: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
