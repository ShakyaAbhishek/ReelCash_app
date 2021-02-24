import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styles from "./style";
import Constants from "../../constants";

type props = {
  screenName: String,
  backArrow: Boolean,
  forwardArrow: Boolean,
  searchButton: Boolean,
  backPress: Object,
  forwardPress: Object,
  showImage: Boolean,
  crossIcon: Boolean,
};

const HeaderWithTitle = ({
  screenName,
  backArrow,
  forwardArrow,
  backPress,
  forwardPress,
  searchButton,
  showImage,
  crossIcon,
}: props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.pointsWrapper}>
          {backArrow === true && (
            <TouchableOpacity onPress={backPress} activeOpacity={0.8}>
              <Image
                style={styles.backButtonStyle}
                resizeMode={"contain"}
                source={
                  crossIcon === true
                    ? Constants.Images.CrossWhiteIcon
                    : Constants.Images.BackIcon
                }
              />
            </TouchableOpacity>
          )}
        </View>
        {showImage === true ? (
          <View style={styles.logoWrapper1}>
            <Image style={{ marginRight: 10 }} source={Constants.Images.GreenFishAncorLogo} />
            <Text numberOfLines={1} style={styles.titleText}>
              {screenName}
            </Text>
            <Text numberOfLines={1} style={styles.titleTextUP}>
              TM
            </Text>
          </View>
        ) : (
            <View style={styles.logoWrapper}>
              <Text numberOfLines={1} style={styles.titleText}>
                {screenName}
              </Text>
            </View>
          )}
        <View
          style={[
            styles.profileImageWrapper,
            {
              justifyContent:
                searchButton != true ? "flex-end" : "space-around",
            },
          ]}
        >
          {searchButton === true && (
            <View>
              <TouchableOpacity onPress={forwardPress} activeOpacity={0.8}>
                <Image
                  style={styles.backButtonStyle}
                  resizeMode={"contain"}
                  source={Constants.Images.SearchIcon}
                />
              </TouchableOpacity>
            </View>
          )}
          {forwardArrow === true ? (
            <View>
              <TouchableOpacity onPress={forwardPress} activeOpacity={0.8}>
                <Image
                  style={styles.backButtonStyle1}
                  resizeMode={"contain"}
                  source={Constants.Images.BackIcon}
                />
              </TouchableOpacity>
            </View>
          ) : <View style={{ height: 12, width: 24 }} />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderWithTitle;
