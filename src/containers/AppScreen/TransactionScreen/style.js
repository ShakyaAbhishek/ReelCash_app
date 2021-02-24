import {ScrollView} from 'react-native-gesture-handler';
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
  headerCardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: '20@ms',
  },
  smallCardWrapper: {
    height: '70@ms',
    width: '160@ms',
    elevation:5,
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
  detailsWrapper: {flex: 1, marginTop: '21@ms'},
});

export default styles;
