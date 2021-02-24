//import liraries
import React, { useEffect } from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";
import styles from "./style";
import Constatns from "../../../constants";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-community/async-storage";

type props = {
  navigation: Object,
};

const SplashScreens = ({ navigation }: props) => {
  useEffect(() => {
    SplashScreen.hide();
    selectScreenFunction();
  }, []);

  const selectScreenFunction = async () => {
    try {
      let data = await AsyncStorage.getItem("WelcomeScreen");
      setTimeout(() => {
        if (data !== null) {
          // We have data!!
          navigation.replace("HomeScreen");
        } else {
          navigation.replace("WelcomeScreen");
        }
      }, 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <ImageBackground
      source={Constatns.Images.BackgroundImage}
      style={styles.container}
    >
      <Image style={styles.logoImageStyle} source={Constatns.Images.Icon} />
    </ImageBackground>
  );
};
export default SplashScreens;
