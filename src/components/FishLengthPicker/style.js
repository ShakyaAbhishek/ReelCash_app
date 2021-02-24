import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  fishLengthWrapper: {
    marginTop: '15@ms',
    height: '100@ms',
    flexDirection: 'row',
    // backgroundColor:'red',
    // borderColor: 'white',
    borderRadius: '20@ms',
    // borderWidth: '1@ms',
  },
  pickerPartWrapper: {
    flex: 1,
    paddingHorizontal: '10@ms',
    alignItems: 'center',
    marginLeft: '40@ms',
  },
  pickerStyle: {height: '1@ms', width: '200@ms'},
  pickerItemStyle: {
    height: '100@ms',
    color: Constants.Colors.WhiteColor,
    borderColor: Constants.Colors.WhiteColor,
  },
  upperDividerStyle: {
    width: '195@ms',
    height: '1@ms',
    backgroundColor: 'white',
    position: 'absolute',
    top: '30%',
  },
  bottomDividerStyle: {
    width: '195@ms',
    height: '1@ms',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '30%',
  },
  androidPickerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  androidInnerPicker: {flex:2, height:'150@ms', marginTop:'30@ms'},
  androidInnerPicker1: {flex:1,marginTop:'10@ms'},
  androidPickerStyle: {flex:2,},
});

export default styles;
