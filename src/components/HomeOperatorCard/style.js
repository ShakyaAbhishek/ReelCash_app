import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  cardWrapper: {flexDirection: 'row', height: '96@ms', marginTop: '15@ms'},
  imageCardWrapper: {
    flex: 1.5,
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
    flex: 2,
    backgroundColor: Constants.Colors.GreenColor,
    borderTopRightRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
    padding: '20@ms',
    justifyContent: 'space-between',
  },
  cardHeadingText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: Constants.Colors.WhiteColor,
  },
  cardDetailText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  },
  // loader Styling
  loaderImageWrapper: { 
    height: '100%', 
    width: '100%', 
    borderTopLeftRadius: '10@ms', 
    borderBottomLeftRadius: '10@ms', 
  },
  textLoaderStyling: { 
    height: '14@ms', 
    width: '130@ms', 
    borderRadius: '10@ms' 
  },
});

export default styles;
