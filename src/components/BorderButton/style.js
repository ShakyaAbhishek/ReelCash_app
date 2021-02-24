import { ScaledSheet } from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  container: {
    height: '41@ms',
    width: '150@ms',
    backgroundColor: Constants.Colors.DarkGrayColor,
    borderColor: Constants.Colors.WhiteColor,
    borderWidth: '2@s',
    alignSelf: 'center',
    borderRadius: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle: {
    fontSize: 16,
    color: Constants.Colors.WhiteColor,
    fontFamily: 'ProximaNova-Regular',
    textAlign:'center'
  },
  TextStyle1: {
    fontSize: 16,
    color: Constants.Colors.GreenColor,
    fontFamily: 'ProximaNova-Bold',
    paddingRight: '10@s',
  },
  flexRow: { flexDirection: 'row', justifyContent: 'space-between' },
  firstImageStyle: { marginRight: '10@ms', alignSelf: 'center' },
});

export default styles;
