//import liraries
import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styles from "./style";
import Constants from "../../constants";
import { useSelector } from "react-redux";

type props = {
  pressLeftButton: Object,
  profileIconPress: Object,
};
const Header = ({ pressLeftButton, profileIconPress }: props) => {
  const user = useSelector((state) => state.user);
  const { userData } = user


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pointsWrapper}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={pressLeftButton}
          style={styles.blueButtonStyle}
        >
          <Text style={styles.blueButtonText}>86 pts.</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoWrapper}>
        <View style={styles.logoImageWrapper}>
          <Image
            style={{ height: "100%", width: "100%" }}
            resizeMode={"contain"}
            source={Constants.Images.Icon}
          />
        </View>
      </View>
      <View style={styles.profileImageWrapper}>
        <TouchableOpacity activeOpacity={0.8} onPress={profileIconPress}>
          <View style={styles.profileImageStyle}>
            <Image
              style={styles.profileIm}
              resizeMode={"cover"}
              source={userData.profile_picture ? { uri: userData.profile_picture } : Constants.Images.DummyImage}
            />
          </View>
          <View style={styles.badgeWrapper}>
            <Text style={styles.badgeText}>0</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;