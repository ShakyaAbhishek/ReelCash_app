import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import styles from "./style";
import Constants from "../../../constants";
import { ColorButton, HeaderWithTitle } from "../../../components";
import * as userActions from '../../../actions/user-actions-types';
import * as appActions from '../../../actions/app-actions-types';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Toast from "react-native-toast-message";
import { openDatabase } from 'react-native-sqlite-storage';
type props = {
  navigation: Object,
  route: Object,
};

const data = [
  {
    id: 1,
    name: "Bethel Park",
    isSelected: true,
  },
  {
    id: 2,
    name: "Lake Fresh",
    isSelected: false,
  },
  {
    id: 3,
    name: "Master Classic",
    isSelected: false,
  },
  {
    id: 4,
    name: "Alabama Masters Tournament",
    isSelected: true,
  },
  {
    id: 5,
    name: "Park Columbia",
    isSelected: false,
  },
  {
    id: 6,
    name: "Lake Fresh",
    isSelected: false,
  },
  {
    id: 7,
    name: "Master Classic",
    isSelected: true,
  },
  {
    id: 8,
    name: "Alabama Masters Tournament",
    isSelected: false,
  },
  {
    id: 9,
    name: "Park Columbia",
    isSelected: false,
  },
];
var db = openDatabase({ name: 'UserDatabase.db' });
const SelectTournamentScreen = ({ navigation, route }: props) => {
  const [tournamentData, setTournamentData] = useState([]);
  const [apiRespon, setApiRespon] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  // const [selectedTournament, setSelectedTournament] = useState([]);

  const { fishDetails, addFishDetail } = route.params;
  const user = useSelector((state) => state.user);
  const { userData } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    // console.warn('jfsdjfdsfds', fishDetails)
    const {image} = fishDetails;
    setTournamentData(data);
    setSelectedImages(image);
    apiCallingFunction();
  }, []);

  const apiCallingFunction = () => {
    const data = {
      my_id: userData.id,
    };
    dispatch(
      userActions.allOngoingTournament({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              // console.warn('resutl', JSON.stringify(result, undefined, 2));
              const data = result.data.tournament_list.data;
              const tData = [];
              // console.warn('data', JSON.stringify(data, undefined, 2));
              data.map((i) => {
                const obj = {
                  id: i.id,
                  name: i.title,
                  isSelected: false,
                  singleSub: i.singleSub,
                }
                tData.push(obj);
              })
              setTournamentData(tData);
              setApiRespon(true);
            }
          }
        }
      })
    )
  }

  const backPress = () => {
    navigation.goBack();
  };

  const pressItem = (item, index) => {
    // console.warn(item.id);
    // setSelectedTournament(item.id);
    const elementsIndex = tournamentData.findIndex(
      (element) => element.id === item.id
    );
    let newArray = [...tournamentData];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      isSelected: !newArray[elementsIndex].isSelected,
    };
    setTournamentData(newArray);
    // console.warn(newArray);
  };

  const onPressSubmitButton1 = () => {
    const dummy = tournamentData;
    const torunamentIds = [];
    dummy.map((i)=>{
      if(i.isSelected == true){
        torunamentIds.push(i.id);
        // if (i.singleSub === 'yes')
        // {
        //   Toast.show({
        //     type: "info",
        //     text1: "Info Message",
        //     text2: `${i.name,'Please Select the Tournament'}`,
        //   });
        // }
      }
    });
    if (torunamentIds.length === 0) {
      Toast.show({
        type: "info",
        text1: "Info Message",
        text2: 'Please Select the Tournament',
      });
    } else {
      const data = {
        user_id: userData.id,
        tournament_id: torunamentIds.toString(),
        catch_id: fishDetails.catchId
      };
      dispatch(
        userActions.updateLivewellDetails({
          data,
          callback: ({ result, error }) => {
            // console.warn('res', result)
            if (!error){
              if(result.success === true) {
                navigation.pop(2);
              }
              else if (result.success === false) {
                alert(result.message);
              }
            }
          }
        })
      )
    }

  }

  const onPressSubmitButton = () => {
    const dummy = tournamentData;
    const torunamentIds = [];
    dummy.map((i)=>{
      if(i.isSelected == true){
        torunamentIds.push(i.id);
      }
    })
    // console.warn(torunamentIds);
    if (torunamentIds.length === 0) {
      Toast.show({
        type: "info",
        text1: "Info Message",
        text2: 'Please Select the Tournament',
      });
    } else {
      dispatch(
        appActions.showLoader()
      )
      const imageData = fishDetails.image;
      let formData = new FormData();
      formData.append("user_id", `${userData.id}`);
      formData.append("tournament_id", torunamentIds.toString());
      formData.append("species", fishDetails.species);
      formData.append("state", fishDetails.state);
      formData.append("fish_length", fishDetails.fishSize);
      formData.append("date", fishDetails.date);
      formData.append("status", fishDetails.status);
      formData.append("points", fishDetails.fishPoints);
      
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
      fetch("https://api.reelcash.com/api/addCatch", {
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
          // console.warn("dsfds",JSON.stringify(data, undefined, 2));
          dispatch(
            appActions.hideLoader()
          )
            if (data.success===true) {
              // callback(result, error);
              DeleteSubmitedImages();
              navigation.pop(3);
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
            // console.warn('Results', results);
            if (results.rowsAffected > 0) {
              // console.warn("add success");
            } else {
              // console.warn('Registration Failed');
            }
          },
        );
      });
    })
  }

  const renderItems = ({ item, index }) => {
    return (
      <View>
        {apiRespon === true ?
          <TouchableOpacity
          onPress={() => pressItem(item, index)}
          activeOpacity={0.8}
            style={
              item.isSelected
                ? styles.selectedItemWrapper
                : styles.unSelectedItemWrapper
            }
          >
            <View style={styles.cardInnerWrapper}>
              <TouchableOpacity
                onPress={() => pressItem(item, index)}
                style={styles.selectorOuterWrapper}
              >
                { item.isSelected && <View style={styles.selectorInnerWrapper} />}
              </TouchableOpacity>
              <Text style={styles.itemTextStyle}>{item.name}</Text>
            </View>
          </TouchableOpacity>
          :
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 40, marginTop:10 }}>
            <SkeletonPlaceholder>
              <View style={{ height: 20, width: 20, borderRadius: 10 }}>

              </View>
            </SkeletonPlaceholder>
            <View style={{ marginLeft: 10 }}>
              <SkeletonPlaceholder>
                <View style={{ width: 170, height: 14, borderRadius: 5 }}>

                </View>
              </SkeletonPlaceholder>
            </View>
          </View>
        }
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"Enter in Tournament"}
        backArrow={true}
        forwordArrow={false}
        backPress={backPress}
      />
      <SafeAreaView style={styles.container1}>
        <View style={styles.innerContainerWrapper}>
          <View style={styles.headingWrapper}>
            <Text style={styles.headingTextStyle}>Select Tournaments</Text>
          </View>
          <View style={styles.flatListWrapper}>
            <FlatList data={tournamentData} renderItem={renderItems} />
          </View>
        </View>
        <View style={styles.submitWrapper}>
          <ColorButton
            ButtonText={"Submit"}
            OnPressButton={addFishDetail?onPressSubmitButton:onPressSubmitButton1}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SelectTournamentScreen;
