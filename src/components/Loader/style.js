import { ScaledSheet } from "react-native-size-matters";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#11111190'
  },
  image: {
    width: "70@s",
    height: "70@s",
  },
  gif: {
    width: "70@s",
    height: "45@s",
  },
});

export default styles;
