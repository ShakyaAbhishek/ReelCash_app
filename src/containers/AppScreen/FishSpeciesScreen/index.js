import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import styles from "./style";
import {
  HeaderWithTitle,
  FishSpeciesCard,
  CardShdowWrapper,
} from "../../../components";
import Constants from "../../../constants";

type props = {
  navigation: Object,
};

const recentlyUsed = [
  {
    id: 1,
    speciesName: "Base",
    speciesImage: Constants.Images.DummyImage,
  },
];

const allSpecies = [
  {
    id: 1,
    speciesName: "Alaska whitefish",
    speciesImage: Constants.Images.DummyImage,
  },
  {
    id: 2,
    speciesName: "Alligator gar",
    speciesImage: Constants.Images.DummyImage,
  },
  {
    id: 3,
    speciesName: "American gizzard shad",
    speciesImage: Constants.Images.DummyImage,
  },
  {
    id: 4,
    speciesName: "American eel",
    speciesImage: Constants.Images.DummyImage,
  },
  {
    id: 5,
    speciesName: "American yellow perch",
    speciesImage: Constants.Images.DummyImage,
  },
  {
    id: 6,
    speciesName: "Alaska whitefish",
    speciesImage: Constants.Images.DummyImage,
  },
  {
    id: 7,
    speciesName: "American yellow perch",
    speciesImage: Constants.Images.DummyImage,
  },
  {
    id: 8,
    speciesName: "Alaska whitefish",
    speciesImage: Constants.Images.DummyImage,
  },
  {
    id: 9,
    speciesName: "American yellow perch",
    speciesImage: Constants.Images.DummyImage,
  },
];

const FishSpeciesScreen = ({ navigation }: props) => {
  const [recentdata, setRecentData] = useState([]);
  const [allSpeciesData, SetAllSpeciesData] = useState([]);

  useEffect(() => {
    setRecentData(recentlyUsed);
    SetAllSpeciesData(allSpecies);
  }, []);

  const backPress = () => {
    navigation.goBack();
  };
  const forwardPress = () => {
    navigation.navigate("FishDetailFormScreen");
  };
  const recentlyItems = ({ item, index }) => {
    return (
      <View style={styles.cardWrapper}>
        <FishSpeciesCard name={item.speciesName} image={item.speciesImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"    Fish Species"}
        backArrow={true}
        forwardArrow={true}
        searchButton={true}
        backPress={backPress}
        forwardPress={forwardPress}
      />
      <SafeAreaView style={styles.container1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewStyle}
        >
          <View style={styles.headerImageWrapper}>
            <Image
              resizeMode={"cover"}
              style={styles.headerImageStyle}
              source={Constants.Images.DummyImage}
            />
          </View>
          <View style={styles.headingWrapper}>
            <Text style={styles.headingTextStyle}>Recently Used Species</Text>
          </View>
          <FlatList
            style={styles.recentListStyle}
            data={recentdata}
            renderItem={recentlyItems}
          />
          <View style={styles.headingWrapper}>
            <Text style={styles.headingTextStyle}>All Species</Text>
          </View>
          <FlatList
            style={styles.allListStyle}
            data={allSpeciesData}
            renderItem={recentlyItems}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default FishSpeciesScreen;
