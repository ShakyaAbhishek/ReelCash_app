import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "../../../constants";
import {
  HeaderWithTitle,
  CardShdowWrapper,
  FishLengthPicker,
  PickerInputState,
  PickerSpecies,
} from "../../../components";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../actions/user-actions-types";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import fishPointLogic from '../../../utilities/fishCalculatorLogic';

type props = {
  navigation: Object,
};

const FishCalculatorScreen = ({ navigation }: props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [usersToken, setUsersToken] = useState("");
  const [speciesModalVisible, setspeciesModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("+21");
  const [statesData, setStatesData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedSpeciesId, setSelectedSpeciesId] = useState("");
  const [fishPoints, setFishPoints] = useState(0);
  const [fishLenght, setFishLenght] = useState(0);
  const [speciesError, setSpeciesError] = useState("");
  const [stateError, setStateError] = useState("");
  const [fishLenghtError, setFishLenghtError] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   const { userToken } = user;
  //   if (userToken != "") {
  //     setUsersToken(userToken);
  //   }
  //   getSpeciesList();
  //   getStateData(countryCode);
  // }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      const { userToken } = user;
      if (userToken != "") {
        setUsersToken(userToken);
      }
      getSpeciesList();
      getStateData(countryCode);
    }, [user])
  );

  const getSpeciesList = () => {
    dispatch(
      userActions.getSpeciesApi({
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              const dummydata = result.data.speciesList;
              const finalData = dummydata.sort((a, b) =>
                a.value > b.value ? 1 : -1
              );
              setSpeciesData(finalData);
            }
          }
        },
      })
    );
  };

  const getStateData = () => {
    dispatch(
      userActions.getStateByCountryName({
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              const { USA, Canada } = result.data;
              const usaData = [...USA];
              const canadaData = [...Canada];
              const shortUSA = usaData.sort((a, b) =>
                a.state > b.state ? 1 : -1
              );
              const shortCanada = canadaData.sort((a, b) =>
                a.state > b.state ? 1 : -1
              );
              const finalData = [];
              [1, 2].map((i) => {
                const obj = {
                  countryName: i == 1 ? "USA" : "Canada",
                  statesName: i == 1 ? shortUSA : shortCanada,
                  id: i,
                };
                finalData.push(obj);
              });
              setStatesData(finalData);
            }
          }
        },
      })
    );
  };

  const getFishCalculationValue = useCallback((length, stateId, speciesId) => {
    // alert('run')
    const lengthFish = Number(length);
    if (lengthFish !== '' && stateId !== '' && speciesId !== '') {
      const data = {
        state_id: stateId,
        species_id: speciesId,
      };
      dispatch(
        userActions.getFishValue({
          data,
          callback: ({ result, error }) => {
            if (!error) {
              const { caculatorValue } = result.data;
              const fishPoint = fishPointLogic({ ...caculatorValue, lengthFish: lengthFish });
              setFishPoints(fishPoint);
            }
          },
        })
      );
    } else {
      // Toast.show({
      //   type: "info",
      //   text1: "Warning",
      //   text2: "Please select the State and Species.",
      // });
    }
  }, [selectedStateId, selectedSpeciesId, fishLenght]);

  const selectedFishLength = (item) => {
    setFishLenght(item);
    setFishLenghtError("");
    getFishCalculationValue(item, selectedStateId, selectedSpeciesId);
  };

  const selectedItem1 = (item) => {
    setSelectedState(item.state);
    setSelectedStateId(item.id);
    setStateError("");
    getFishCalculationValue(fishLenght, item.id, selectedSpeciesId);
    dismissModalHandler();
  };

  const dismissModalHandler = () => {
    // getFishCalculationValue(fishLenght);
    setModalVisible(false);
  };

  const selectedSpeciesItem = (item) => {
    setSelectedSpecies(item.value);
    setSelectedSpeciesId(item.id);
    setSpeciesError("");
    getFishCalculationValue(fishLenght, selectedStateId, item.id);
    dismissSpeciesModalHandler();
  };

  const dismissSpeciesModalHandler = () => {
    setspeciesModalVisible(false);
  };

  const backPress = () => {
    navigation.goBack();
  };

  const onPressLiveWellButton = () => {
    if (usersToken == "") {
      navigation.navigate("LoginScreen");
    } else {
      navigation.navigate("LiveWell");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"Fish Calculator"}
        showImage={true}
        backArrow={true}
        forwardArrow={false}
        backPress={backPress}
      />
      <SafeAreaView style={styles.container1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.formWrapper}>
            <View style={styles.pointsButtonWrapper}>
              <CardShdowWrapper>
                <View style={styles.pointButtonStyle}>
                  <Text style={styles.pointButtonTextStyle}>{fishPoints}</Text>
                  <Text style={styles.pointButtonTextStyle1}>Points</Text>
                </View>
              </CardShdowWrapper>
            </View>
            <View style={styles.pickerWrapper}>
              <Text style={styles.labelTextStyle}>Species</Text>
              <TouchableOpacity
                onPress={() => setspeciesModalVisible(true)}
                activeOpacity={0.9}
                style={styles.pickerButtonWrapper}
              >
                <Text style={styles.pickerInnerTextStyle}>
                  {selectedSpecies === "" ? "Select species" : selectedSpecies}
                </Text>
                <Image source={Constants.Images.ArrowDownGreenIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.pickerWrapper}>
              <Text style={styles.labelTextStyle}>State</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                activeOpacity={0.9}
                style={styles.pickerButtonWrapper}
              >
                <Text style={styles.pickerInnerTextStyle}>
                  {selectedState === "" ? "Select state" : selectedState}
                </Text>
                <Image source={Constants.Images.ArrowDownGreenIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.pickerWrapper}>
              <Text style={styles.labelTextStyle}>Fish Length</Text>
              <FishLengthPicker
                selectedValue={(item) => selectedFishLength(item)}
              />
              {fishLenghtError != "" ? (
                <Text style={styles.labelTextStyle1}>{fishLenghtError}</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.bottomButtonWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressLiveWellButton}
              style={styles.enterButtonStyle}
            >
              <Text style={styles.bottomButtonTextStyle}>Livewell</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <PickerSpecies
          modalVisible={speciesModalVisible}
          dismissModalHandler={dismissSpeciesModalHandler}
          countryData={speciesData}
          selectedValue={(item) => selectedSpeciesItem(item)}
        />
        <PickerInputState
          modalVisible={modalVisible}
          dismissModalHandler={dismissModalHandler}
          countryData={statesData}
          selectedValue={(item) => selectedItem1(item)}
        />
      </SafeAreaView>
    </View>
  );
};

export default FishCalculatorScreen;
