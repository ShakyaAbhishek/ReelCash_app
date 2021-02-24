import { ScaledSheet } from "react-native-size-matters";
import Constants from "../../../constants";
import { Dimensions } from "react-native";
const Height = Dimensions.get("window").height;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#2c3e50',
    justifyContent:'center',
    alignItems:'center'
  },
  logoImageStyle: {height:'80@ms', width:'212@ms'}
});

export default styles;
