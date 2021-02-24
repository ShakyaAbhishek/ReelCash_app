import {ScaledSheet} from 'react-native-size-matters';
import Constants from '../../constants';

const styles = ScaledSheet.create({
 buttonWrapper:{
     height:'60@ms', 
     width:'60@ms',
     justifyContent:'center', 
     alignItems:'center', 
     borderRadius:'30@ms', 
     backgroundColor:Constants.Colors.GreenColor, 
     position:'absolute', 
     bottom:'5%', 
     right:'7%'
    },
 cameraImageStyle: {
     resizeMode:'contain', 
     height:'25@ms', 
     width:'25@ms'
    },
});

export default styles;
