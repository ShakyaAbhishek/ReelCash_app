import React, { Component } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import styles from "./style";
import Constants from "../../../constants";
import { HeaderWithTitle, CardShdowWrapper } from "../../../components";
import MapView, { Marker } from "react-native-maps";

const region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

type props = {
  navigation: Object,
};

const ConfirmCatchScreen = ({ navigation }: props) => {
  const backPress = () => {
    navigation.goBack();
  };
  const forwardPress = () => {
    navigation.navigate("SelectTournamentScreen");
    // navigation.navigate("FishSpeciesScreen");
  };
  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"Confirm Catch"}
        backArrow={true}
        forwardArrow={true}
        backPress={backPress}
        forwardPress={forwardPress}
      />
      <SafeAreaView style={styles.container1}>
        <View style={styles.selectedImageWrapper}>
          <Image source={Constants.Images.PlusGreenWhiteIcon} />
          <View style={styles.selectInnerImageWrapper}>
            {/* <CardShdowWrapper> */}
            <View style={styles.selectImageWrapper}>
              <Image
                source={Constants.Images.DummyImage}
                style={styles.selectImageStyle}
              />
            </View>
            {/* </CardShdowWrapper> */}
          </View>
        </View>
        <View style={styles.catchDetailWrapper}>
          <View style={styles.headingWrapper}>
            <Text style={styles.headingTextStyle}>Catch Details</Text>
          </View>
          <CardShdowWrapper>
            <View style={styles.detailCardWrapper}>
              <View style={styles.cardTypeWrapper}>
                <Text style={styles.cardTypeTextStyle}>Date</Text>
              </View>
              <View style={styles.cardRightWrapper}>
                <View style={styles.detailTypeWrapper}>
                  <Text style={styles.detailTypeTextStyle}>08/07/20</Text>
                </View>
                <Image source={Constants.Images.ForwardGreenArrowIcon} />
              </View>
            </View>
          </CardShdowWrapper>
          <CardShdowWrapper>
            <View style={styles.detailCardWrapper}>
              <View style={styles.cardTypeWrapper}>
                <Text style={styles.cardTypeTextStyle}>Time</Text>
              </View>
              <View style={styles.cardRightWrapper}>
                <View style={styles.detailTypeWrapper}>
                  <Text style={styles.detailTypeTextStyle}>16:04</Text>
                </View>
                <Image source={Constants.Images.ForwardGreenArrowIcon} />
              </View>
            </View>
          </CardShdowWrapper>
          <CardShdowWrapper>
            <View style={styles.detailCardWrapper}>
              <View style={styles.cardTypeWrapper}>
                <Text style={styles.cardTypeTextStyle}>Species</Text>
              </View>
              <View style={styles.cardRightWrapper}>
                <View style={styles.detailTypeWrapper}>
                  <Text style={styles.detailTypeTextStyle}>Bass</Text>
                </View>
                <Image source={Constants.Images.ForwardGreenArrowIcon} />
              </View>
            </View>
          </CardShdowWrapper>
          <CardShdowWrapper>
            <View style={styles.detailCardWrapper}>
              <View style={styles.cardTypeWrapper}>
                <Text style={styles.cardTypeTextStyle}>Length</Text>
              </View>
              <View style={styles.cardRightWrapper}>
                <View style={styles.detailTypeWrapper}>
                  <Text style={styles.detailTypeTextStyle}>18 in</Text>
                </View>
                <Image source={Constants.Images.ForwardGreenArrowIcon} />
              </View>
            </View>
          </CardShdowWrapper>
        </View>
        <View style={styles.locationWrapper}>
          <View style={styles.headingWrapper}>
            <Text style={styles.headingTextStyle}>Location</Text>
          </View>
          <View style={styles.locationViewWrapper}>
            <View style={{ flex: 1 }}>
              <MapView
                style={{ flex: 1 }}
                region={region}
                // onRegionChange={this.onRegionChange}
              >
                <Marker
                  coordinate={region}
                  title={"Current Location"}
                  description={"Current Location"}
                />
              </MapView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ConfirmCatchScreen;
