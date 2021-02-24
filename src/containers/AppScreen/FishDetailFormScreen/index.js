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
  ColorButton,
  BorderButton,
  FishLengthPicker,
  PickerInputState,
  PickerSpecies
} from "../../../components";
import styles from "./style";
import moment from "moment";
import * as userActions from '../../../actions/user-actions-types';
import * as appActions from '../../../actions/app-actions-types';
import { useSelector, useDispatch} from 'react-redux';
import Toast from "react-native-toast-message";
import { openDatabase } from 'react-native-sqlite-storage';
import fishPointLogic from '../../../utilities/fishCalculatorLogic';
type props = {
  navigation: Object,
  route: Object,
};

var db = openDatabase({ name: 'UserDatabase.db' });
const FishDetailFormScreen = ({ navigation, route }: props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [speciesModalVisible, setspeciesModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("+21");
  const [statesData, setStatesData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [fishLenght, setFishLenght] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [speciesError, setSpeciesError] = useState('');
  const [stateError, setStateError] = useState('');
  const [fishLenghtError, setFishLenghtError] = useState('');

  const [fishPoints, setFishPoints] = useState(0);
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedSpeciesId, setSelectedSpeciesId] = useState("");

  const { clickedImage } = route.params;
  const user = useSelector((state)=> state.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    const { userData } = user;
    const date = new Date();
    setCurrentDate(date);
    setSelectedImages(clickedImage);
    // console.warn('this is the fish detail form page', JSON.stringify(clickedImage , undefined, 2))
    getSpeciesList();
    getStateData();
  },[])

  const getSpeciesList = () =>{
    dispatch(
      userActions.getSpeciesApi({
        callback: ({result, error}) => {
          if (!error) {
            if (result) {
              setSpeciesData(result.data.speciesList);
            }
          }
        }
      })
    )
  }

  const getStateData = () => {
    dispatch(
      userActions.getStateByCountryName({
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              const {USA, Canada} = result.data;
              const usaData = [...USA];
              const canadaData = [...Canada];
              const shortUSA = usaData.sort((a,b)=> (a.state > b.state ? 1 : -1));
              const shortCanada = canadaData.sort((a,b)=> (a.state > b.state ? 1 : -1));
              const finalData = [];
              [1,2].map((i)=>{
                const obj = {
                  countryName: i == 1 ?"USA":"Canada",
                  statesName: i == 1 ? shortUSA: shortCanada,
                  id: i
                };
                finalData.push(obj);
              });
              setStatesData(finalData);
            }
          }
        }
      })
    )
  }

  const selectedItem1 = (item) => {
    console.warn('selected item 1 funciton', item);
    setSelectedState(item.state);
    setSelectedStateId(item.id);
    setStateError('');
    getFishCalculationValue(fishLenght, item.id, selectedSpeciesId);
    dismissModalHandler();
  };

  const dismissModalHandler = () => {
    setModalVisible(false);
  };

  const selectedSpeciesItem = (item) => {
    console.warn('selected speices', item);
    setSelectedSpeciesId(item.id);
    setSelectedSpecies(item.value);
    setSpeciesError('');
    getFishCalculationValue(fishLenght, selectedStateId, item.id);
    dismissSpeciesModalHandler();
  }

  const dismissSpeciesModalHandler = () => {
    setspeciesModalVisible(false);
  }

  const validationCheck = () =>{
    if(selectedSpecies == ""){
      setSpeciesError("Please Select Species*")
    } if ( selectedState == ''){
      setStateError("Please Select State*")
    } if ( fishLenght ===  ""){
      setFishLenghtError("Please Select the Fish Lenght");
    }
  }

  const onPressSubmitButton = (item) => {
    validationCheck();
    if(selectedSpecies == ""){
      setSpeciesError("Please Select Species*")
    } else if ( selectedState == ''){
      setStateError("Please Select State*")
    } else if ( fishLenght ===  ""){
      setFishLenghtError("Please Select the Fish Lenght");
    }
    else {
      const data = {
        date: moment(currentDate).format('YYYY-MM-DD'),
        state: selectedState,
        fishSize: fishLenght,
        species: selectedSpecies,
        image: selectedImages,
        status:item,
        fishPoints: fishPoints,
      };
      // console.warn("final data", JSON.stringify(data, undefined, 2));
      navigation.navigate("SelectTournamentScreen", { fishDetails: data, addFishDetail:true })
    }
  }

  const onPressAddLivewell = () => {
    const { userData } = user;
    validationCheck();
    if(selectedSpecies == ""){
      setSpeciesError("Please Select Species*")
    } else if ( selectedState == ''){
      setStateError("Please Select State*")
    } else if ( fishLenght ===  ""){
      setFishLenghtError("Please Select the Fish Lenght");
    }
    else {
    dispatch(
      appActions.showLoader()
    )
    const imageData = selectedImages;
    let formData = new FormData();
    formData.append("user_id", `${userData.id}`);
    formData.append("species", selectedSpecies);
    formData.append("state", selectedState);
    formData.append("fish_length", fishLenght);
    formData.append('points', fishPoints);
    formData.append("date", moment(currentDate).format('YYYY-MM-DD'));
    imageData &&
    imageData.map(image => {
        let parts = image.path.split("/");
        let uri =
          Platform.OS === "android"
            ? image.path
            : image.path.replace("file://", "");
        let name = parts[parts.length - 1];
        let type = image.mime;

        const file = {
          uri,
          name,
          type,
          path:uri
        };
        formData.append("images[]", file);
      });
    
    console.warn('this data', JSON.stringify(formData, undefined, 2));
    fetch("https://api.reelcash.com/api/addLivewell", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
      //Request Type
    })
      .then(processResponse)
      .then(async (res) => {
        const { statusCode, data } = res;
        // console.warn(statusCode);
        console.warn("add live well success",JSON.stringify(data, undefined, 2));
        dispatch(
          appActions.hideLoader()
        )
          if (data.success===true) {
            // callback(result, error);
            DeleteSubmitedImages();
            navigation.pop(2);
            Toast.show({
              type: "success",
              text1: "Success Message",
              text2: data.message,
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Error Message",
              text2: data.message,
            });
          }
      })
      .catch((error) => {
        // console.warn("error come", error);
        dispatch(
          appActions.hideLoader()
        )
      });
    }
  }
  function processResponse(response) {
    const statusCode = response.status;
    const data = response.json();
    // console.warn("dsfdsfsdf",data);
    return Promise.all([statusCode, data]).then((res) => ({
      statusCode: res[0],
      data: res[1],
    }));
  }


  const DeleteSubmitedImages = async() => {
    const data = [...selectedImages];
    data.map(i=>{
      db.transaction(function (tx) {
        tx.executeSql(
          'DELETE FROM clicked_images where id=?',
          [i.id],
          (tx, results) => {
            console.warn('Results', results);
            // if (results.rowsAffected > 0) {
            //   console.warn("add success");
            // } else {
            //   console.warn('Registration Failed');
            // }
          },
        );
      });
    })
  }

  const getFishCalculationValue = useCallback((length, stateId, speciesId) => {
    const lengthFish = Number(length);
    if (lengthFish !== "" && stateId !== '' && speciesId !== '') {
      // if (selectedSpeciesId && selectedStateId !== "") {
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
                const fishPoint = fishPointLogic({...caculatorValue, lengthFish: lengthFish});
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
      // }
    }
  },[fishLenght, selectedSpeciesId, selectedStateId]);

  const selectedFishLength = (item) => {
    setFishLenght(item);
    setFishLenghtError("");
    getFishCalculationValue(item, selectedStateId, selectedSpeciesId);
  };

  const backPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"Catch Details      "}
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
            <View>
              <Text style={styles.labelTextStyle}>Date</Text>
              <TouchableOpacity
                // onPress={showDatePicker}
                activeOpacity={0.9}
                style={styles.pickerButtonWrapper}
              >
                <Text style={styles.pickerInnerTextStyle}>{moment(currentDate).format('DD MMM YYYY')}</Text>
                {/* <Image source={Constants.Images.ArrowDownGreenIcon} /> */}
              </TouchableOpacity>
            </View>
            <View style={styles.pickerWrapper}>
              <Text style={styles.labelTextStyle}>Species</Text>
              <TouchableOpacity
                onPress={() => setspeciesModalVisible(true)}
                activeOpacity={0.9}
                style={styles.pickerButtonWrapper}
              >
                <Text style={styles.pickerInnerTextStyle}>{selectedSpecies===""?'Select species':selectedSpecies}</Text>
                <Image source={Constants.Images.ArrowDownGreenIcon} />
              </TouchableOpacity>
              {speciesError != "" ? <Text style={styles.labelTextStyle1}>{speciesError}</Text>: null}
            </View>
            <View style={styles.pickerWrapper}>
              <Text style={styles.labelTextStyle}>State</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                activeOpacity={0.9}
                style={styles.pickerButtonWrapper}
              >
                <Text style={styles.pickerInnerTextStyle}>{selectedState===''? 'Select state': selectedState}</Text>
                <Image source={Constants.Images.ArrowDownGreenIcon} />
              </TouchableOpacity>
              {stateError != "" ? <Text style={styles.labelTextStyle1}>{stateError}</Text>: null}
            </View>
            <View style={styles.pickerWrapper}>
              <Text style={styles.labelTextStyle}>Fish Length</Text>
              <FishLengthPicker  selectedValue={(item)=> selectedFishLength(item)} />
              {fishLenghtError != "" ? <Text style={styles.labelTextStyle1}>{fishLenghtError}</Text>: null}
            </View>
            <View style={styles.optionPrivateWrapper}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("LocationScreen")}
              >
                <Text style={styles.labelTextStyle}>
                  Precise Location (Optional & Private)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomButtonWrapper}>
            <View style={styles.flexCenter}>
              <ColorButton
                OnPressButton={onPressAddLivewell}
                ButtonText={"Add to Livewell Only"}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>onPressSubmitButton(0)}
              style={styles.enterButtonStyle}
            >
              <Text style={styles.bottomButtonTextStyle}>
                Submit to Tournament
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <PickerInputState
          modalVisible={modalVisible}
          dismissModalHandler={dismissModalHandler}
          countryData={statesData}
          selectedValue={(item) => selectedItem1(item)}
        />
        <PickerSpecies 
          modalVisible={speciesModalVisible}
          dismissModalHandler={dismissSpeciesModalHandler}
          countryData={speciesData}
          selectedValue={(item) => selectedSpeciesItem(item)}
        />
      </SafeAreaView>
    </View>
  );
};

export default FishDetailFormScreen;