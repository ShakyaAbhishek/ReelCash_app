import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "../../../constants";
import Carousel, {
  ParallaxImage,
  Pagination,
} from "react-native-snap-carousel";
const { width: screenWidth } = Dimensions.get("window");
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";

type props = {
  navigation: Object,
};

const data = [
  {
    id: 1,
    bodyText: `A multi species tournamet platform that fairly and accurately scores
    scores North America's most popular gamefish for local, regional, and
    International competition.`,
  },
  {
    id: 2,
    bodyText: `A multi species tournamet platform that fairly and accurately scores
    scores North America's most popular gamefish for local, regional, and
    International competition.`,
  },
  {
    id: 3,
    bodyText: `A multi species tournamet platform that fairly and accurately scores
    scores North America's most popular gamefish for local, regional, and
    International competition.`,
  },
];

const WelComeScreen = ({ navigation }: props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // setWelcomeScreen();
    console.warn(activeIndex);
    if (activeIndex == 2) {
      setTimeout(() => {
        navigation.navigate("AppStack");
      }, 100);
    }
  }, [activeIndex]);

  const setWelcomeScreen = async () => {
    try {
      await AsyncStorage.setItem("WelcomeScreen", "true");
    } catch (e) {
      console.warn(e);
    }
  };

  const renderItems = ({ item, index }) => {
    return (
      <View style={styles.detailTextWrapper}>
        <Text style={styles.detailTextStyle}>{item.bodyText}</Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={Constants.Images.WelcomeBackground}
      style={styles.container}
    >
      {/* <TouchableOpacity
        style={styles.flex1}
        activeOpacity={0.8}
        // onPress={() => navigation.replace("AppStack")}
      > */}
      <View style={styles.upperWrapper}>
      <Text style={styles.headingTextStyle}>Welcome</Text>
        <View style={styles.carouselWrapper}>
          <Carousel
            data={data}
            renderItem={renderItems}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={1}
            enableMomentum={true}
            activeSlideAlignment={"start"}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            activeAnimationType={"spring"}
            activeAnimationOptions={{
              friction: 4,
              tension: 40,
            }}
            onSnapToItem={(index) => setActiveIndex(index)}
            loop={true}
            autoplay={true}
            autoplayDelay={2000}
            autoplayInterval={3000}
          />
          {/* {
              <Pagination
                dotsLength={data.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.92)",
                }}
                inactiveDotStyle={
                  {
                    // Define styles for inactive dots here
                  }
                }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            } */}
        </View>
        <View style={styles.sliderButtonWrapper}>
          <View
            style={[
              styles.firstPointWrapper,
              activeIndex === 0 && styles.greenBackground,
            ]}
          />
          <View
            style={[
              styles.secondPointWrapper,
              activeIndex === 1 && styles.greenBackground,
            ]}
          />
          <View
            style={[
              styles.thirdPointWrapper,
              activeIndex === 2 && styles.greenBackground,
            ]}
          />
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image source={Constants.Images.Icon} />
      </View>
      {/* </TouchableOpacity> */}
    </ImageBackground>
  );
};

export default WelComeScreen;
