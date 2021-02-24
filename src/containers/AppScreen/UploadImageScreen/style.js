import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../../constants';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  container1: {
    flex: 1,
  },
  infoBoxWrapper: {
    marginVertical: '15@ms',
    flexDirection: 'row',
    paddingVertical: '14@ms',
    width: '358@ms',
    backgroundColor: Constants.Colors.BlueColor,
    borderTopRightRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
  },
  infoTextWrapper: {flex: 1, paddingRight: '20@ms', paddingLeft: '23@ms'},
  infoTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 12,
    lineHeight: 17,
    color: Constants.Colors.WhiteColor,
  },
  infoIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '23@ms',
  },
  scrollWrapper: {flex: 1},
  headerImageWrapper: {height: '355@ms'},
  imageStyle: {height: '100%', width: '100%'},
  smallImageWrapper: {
    flexDirection: 'row',
    marginTop: '5@ms',
    justifyContent: 'space-evenly',
  },
  smallImageBoxStyle1: {height: '135@ms', width: windowWidth/2,justifyContent:'center', alignItems:'center', borderRightWidth:1, borderLeftWidth:1, borderColor:'transparent'},
  smallImageBoxStyle: {height: '100%', width: '100%'},
  borderButtonWrapper: {height: '62@ms', flexDirection: 'row'},
  flexCenter: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  bottonTextStyle: {
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 18,
    color: Constants.Colors.GreenColor,
  },
  bottonTextStyle1: {
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 18,
    color: Constants.Colors.TextGrayColor,
  },
  imageEditText: {
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: Constants.Colors.BlueColor,
  },
  canceltextStyle:{
    fontFamily: 'ProximaNova-Regular',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 18,
    color: Constants.Colors.WhiteColor,
  }
});

export default styles;
