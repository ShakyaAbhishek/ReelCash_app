import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./styles";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { HeaderWithTitle } from "../../../components";
import { SafeAreaView } from "react-native-safe-area-context";

const region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

type props = {
  navigation: Object,
};

const LocationScreen = ({ navigation }: props) => {
  const backPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"       Select Position"}
        backArrow={true}
        forwardArrow={true}
        searchButton={true}
        backPress={backPress}
      />
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          region={region}
          // onRegionChange={this.onRegionChange}
        >
          <Marker
          onPress={()=>console.warn('dd')}
            coordinate={region}
            title={"Current Location"}
            description={"Current Location"}
          />
        </MapView>
      </View>
    </View>
  );
};

export default LocationScreen;
