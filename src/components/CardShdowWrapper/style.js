import { ScaledSheet } from "react-native-size-matters";
import Constants from "../../constants";

const styles = ScaledSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.44,
    shadowRadius: 6,
    // elevation: 3,
    borderRadius: "20@ms",
  },
});

export default styles;
