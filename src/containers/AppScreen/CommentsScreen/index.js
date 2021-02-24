import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, ImageBackground, Platform, FlatList } from "react-native";
import styles from "./style";
import Constants from "../../../constants";
import {
  HeaderWithBack,
  LeaderBoardCard,
  CardShdowWrapper,
  ReceiveCommentCard,
  SenderCommentCard,
  ActionSheet,
} from "../../../components";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import * as userActions from '../../../actions/user-actions-types';
import Toast from "react-native-toast-message";
import { useKeyboard } from '@react-native-community/hooks'

type props = {
  navigation: Object,
  route: Object
};

const CommentsScreen = ({ navigation, route }: props) => {
  const keyboard = useKeyboard()
  const [commentText, setCommentText] = useState('');
  const [openActionSheet, setOpenActionSheet] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentImages, setcommentImages] = useState([])
  const [buttonDisabled, setbuttonDisabled] = useState(false)
  const { catch_id, fish_img, species_name } = route.params;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { userData } = user;

  const changeText = (text) => {
    setCommentText(text);
  }

  useEffect(() => {
    apiCallingFunction();
  }, [])

  const apiCallingFunction = () => {
    const data = {
      id: catch_id,
    };
    dispatch(
      userActions.getCommentsDetails({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result.success === true) {
              console.warn('this is on comment screen data', JSON.stringify(result, undefined, 2));
              const { like_count, comment_count, comment } = result.data.catchComment;
              setCommentsData([...comment]);
              setLikesCount(like_count);
              setCommentsCount(comment_count);
            }
          }
        }
      })
    );
  };

  const addCommentFunction = (catchId) => {
    setbuttonDisabled(true)
    if (commentText !== '') {
      postCommentApiCall();
    }
    setTimeout(() => {
      setbuttonDisabled(false)
    }, 1000);
  }

  const postCommentApiCall = (imageData) => {
    // const imageResponse = {
    //   ...imageData
    // }
    let formData = new FormData();
    formData.append("user_id", userData.id);
    formData.append("catch_id", catch_id);
    formData.append("comment", commentText);
    if (commentImages.length > 0) {
      const imageResponse = commentImages[0]
      formData.append('image', {
        name: Platform.OS === "android" ? imageResponse.uri : imageResponse.uri.replace("file://", ""),
        type: imageResponse.type,
        uri: Platform.OS === "android" ? imageResponse.uri : imageResponse.uri.replace("file://", ""),
      });
    }
    console.warn('this data', JSON.stringify(formData, undefined, 2));
    fetch("https://api.reelcash.com/api/addCommentCatch", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then(processResponse)
      .then(async (res) => {
        const { statusCode, data } = res;
        console.log(statusCode);
        setCommentText('');
        setcommentImages([])
        apiCallingFunction();
        // setCommentText('');
        console.log("add live well success", JSON.stringify(data, undefined, 2));
      })
      .catch((error) => {
        console.log("error come", error);
      });
  }

  const imagePostFunction = (imageData) => {
    const imageResponse = {
      ...imageData
    }
    let formData = new FormData();
    formData.append("user_id", userData.id);
    formData.append("catch_id", catch_id);
    formData.append("comment", 'Image');
    formData.append('image', {
      name: Platform.OS === "android" ? imageResponse.uri : imageResponse.uri.replace("file://", ""),
      type: imageResponse.type,
      uri: Platform.OS === "android" ? imageResponse.uri : imageResponse.uri.replace("file://", ""),
    });
    // console.warn('this data', JSON.stringify(formData, undefined, 2));
    fetch("https://api.reelcash.com/api/addCommentCatch", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then(processResponse)
      .then(async (res) => {
        const { statusCode, data } = res;
        console.log(statusCode);
        setCommentText('');
        apiCallingFunction();
        // setCommentText('');
        // console.log("add live well success", JSON.stringify(data, undefined, 2));
      })
      .catch((error) => {
        console.log("error come", error);
      });
  }

  function processResponse(response) {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then((res) => ({
      statusCode: res[0],
      data: res[1],
    }));
  }

  const imageSelectType = (select_type) => {
    if (select_type === 1) {
      openCameraFunction();
    } else if (select_type === 2) {
      openLibraryFunction();
    }
  }

  const openCameraFunction = () => {

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      // compressImageQuality:0.6
    }).then(i => {
      let source = {
        uri: i.path,
        type: i.mime,
        name: Platform.OS === "android" ? i.path : i.path
      };
      imagePostFunction(source)
      setOpenActionSheet(false);
      console.log(image);
    });
  }

  const openLibraryFunction = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      // compressImageQuality:0.6
    }).then(i => {
      let source = {
        uri: i.path,
        type: i.mime,
        name: Platform.OS === "android" ? i.path : i.path
      };
      const images = [source]
      setcommentImages(images)

      // imagePostFunction(source)
      setOpenActionSheet(false);
    });
  };

  const likeCatchFunction = (id) => {
    const data = {
      user_id: userData.id,
      catch_id: id,
    };
    dispatch(
      userActions.catchLike({
        data,
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              console.log(result);
              apiCallingFunction();
            }
          }
        }
      })
    )
  }


  const priceButton = () => {
    navigation.navigate("MyStatisticsScreen");
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const renderItems = ({ item, index }) => {
    return (
      <View>
        {item.user_id === userData.id ?
          <SenderCommentCard data={item} />
          :
          <ReceiveCommentCard data={item} />
        }
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <HeaderWithBack onBackPress={onBackPress} pressLeftButton={priceButton} />
      <SafeAreaView style={styles.container1}>
        <View style={styles.leaderBoardWrapper}>
          <LeaderBoardCard navigation={navigation} />
        </View>
        <View style={styles.postNameWrapper}>
          <Text style={styles.postNameTextStyle}>{species_name}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageStyleWrapper}>
            <Image
              source={{ uri: fish_img }}
              style={styles.imageStye}
            />
          </View>
          <View style={styles.likeIconCountWrapper}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => likeCatchFunction(catch_id)}>
              <ImageBackground
                source={Constants.Images.BlueRoundShadow}
                style={styles.likeButtonWrapper}
              >
                <Image source={Constants.Images.HeartIcon} />
              </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.likeCommentCountText}>
              {likesCount} people liked this{" "}
            </Text>
          </View>
          <View style={styles.commentCountWrapper}>
            <ImageBackground
              source={Constants.Images.BlueRoundShadow}
              style={styles.likeButtonWrapper}
            >
              <Image source={Constants.Images.MsgWhiteIcon} />
            </ImageBackground>
            <Text style={styles.likeCommentCountText}>{commentsCount} comments</Text>
          </View>
          <View style={styles.commentsWrapper}>
            {/* <ReceiveCommentCard />
            <SenderCommentCard /> */}
            <FlatList
              data={commentsData}
              renderItem={renderItems}
              extraData={commentsData}
              keyExtractor={item => item.id}
            // initialScrollIndex={commentsData.length - 1}
            />
          </View>
        </ScrollView>
        <View style={{ marginBottom: keyboard.keyboardShown ? keyboard.keyboardHeight : 0 }}>
          <View style={styles.sendBoxWrapper}>
            <View style={[styles.typeBoxWrapper, { height: commentImages.length > 0 ? 100 : 40 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                <TextInput
                  placeholder={"Type Here..."}
                  value={commentText}
                  style={{ flex: 1, color: Constants.Colors.WhiteColor }}
                  placeholderTextColor={"white"}
                  onChangeText={(text) => changeText(text)}
                />
                <TouchableOpacity onPress={() => setOpenActionSheet(true)} activeOpacity={0.8}>
                  <Image source={Constants.Images.CameraIcon} />
                </TouchableOpacity>
              </View>
              {commentImages.length > 0 &&
                <ImageBackground
                  source={{ uri: commentImages[0].uri }}
                  style={{ height: 40, width: 40, marginTop: 10 }}>
                  <TouchableOpacity onPress={() => setcommentImages([])}>
                    <Image source={Constants.Images.CrossWhiteIcon} style={{ height: 10, width: 10, marginLeft: 35, marginTop: -5 }} />
                  </TouchableOpacity>
                </ImageBackground>}
            </View>
            <CardShdowWrapper>
              <TouchableOpacity
                disabled={buttonDisabled}
                activeOpacity={0.8}
                style={styles.sendButtonWrapper}
                onPress={() => addCommentFunction(catch_id)}
              >
                <Image source={Constants.Images.SendIcon} />
              </TouchableOpacity>
            </CardShdowWrapper>
          </View>
        </View>
        <ActionSheet modalVisible={openActionSheet} dismissModalHandler={() => setOpenActionSheet(false)} selectedValue={(i) => imageSelectType(i)} />
      </SafeAreaView>
    </View>
  );
};

export default CommentsScreen;
