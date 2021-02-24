import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView, Linking, Platform } from "react-native";
import Constants from "../../../constants";
import { BorderButton, ColorButton } from "../../../components";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../actions/user-actions-types";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import moment from 'moment'
import { hideLoader, showLoader } from "../../../actions/app-actions-types";
import ImagePicker from 'react-native-image-crop-picker';
import { loginSuccess } from "../../../actions/user-actions-types";

type props = {
  navigation: Object,
  route: Object,
};

const ProfileScreen = ({ navigation, route }: props) => {
  const user = useSelector((state) => state.user);
  const { userData, userToken } = user
  const dispatch = useDispatch();

  const { otherUserView } = route.params;
  const [onterUserView, setOtherUserView] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [userName, setUsername] = useState('');
  const [userTokens, setUserToken] = useState('');
  const [refreshUpcominglist, setrefreshUpcominglist] = useState(false)
  const [refreshCatchlist, setrefreshCatchlist] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [catchesDataList, setDatacatchesList] = useState([])
  const [upcoming_page, setupcoming_page] = useState(1)
  const [catches_page, setcatches_page] = useState(1)

  useEffect(() => {
    getProfile(upcoming_page, catches_page, true)
    setOtherUserView(otherUserView);
    const { userToken, userData } = user;
    if (userToken != "") {
      setUserToken(userToken);
      setUsername(`${userData.fname} ${userData.lname}`);
    } else {
    }
  }, [user]);

  const onPressCancelAlert = () => {
    setShowAlert(false);
  };

  const onPressConfirmAlert = () => {
    setShowAlert(true);
  };

  const updateProfileImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      // includeBase64: true,
    }).then(i => {
      let source = {
        uri: i.path,
        type: i.mime,
        name: Platform.OS === "android" ? i.path : i.path
      };
      UploadImageToServer(source)
    });
  }

  /************************Upload Image To Server *****************************/
  const UploadImageToServer = async (imageResponse) => {
    dispatch(showLoader())
    const formData = new FormData();
    formData.append('image', {
      name: Platform.OS === "android" ? imageResponse.uri : imageResponse.uri.replace("file://", ""),
      type: imageResponse.type,
      uri: Platform.OS === "android" ? imageResponse.uri : imageResponse.uri.replace("file://", ""),
    });
    formData.append('id', userData.id)
    var headers = {
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'multipart/form-data'
    };

    await axios.post('https://api.reelcash.com/api/updateProfileImage', formData, headers).then(resp => {
      if (resp.status == 200) {
        dispatch(loginSuccess({ userToken: userToken, data: resp.data.data }))
        dispatch(hideLoader())
      } else {
        dispatch(hideLoader())
      }
    }).catch(err => { console.log('err', err); dispatch(hideLoader()) });
  }


  const onPressLogout = () => {
    setShowAlert(false)
    const data = {
      token: userTokens
    }
    dispatch(
      userActions.logoutUser({
        data,
        callback: ({ result, error }) => {
          if (result.success === true) {
            navigation.replace("LoginScreen");
          }
        },
      })
    );
  };

  const renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("TournamentDetailScreen", { upComingScreen: false, TournamentId: item.id })}>
        <View style={styles.upcomingCardWrapper}>
          <View style={styles.cardImageWrapper}>
            <Image
              resizeMethod={"auto"}
              style={styles.cardImageStyle}
              source={{ uri: item.cover_img }}
            />
          </View>
          <View style={styles.cardDetailWrapper}>
            <Text style={styles.cardContestName}>{item.title}</Text>
            <Text style={styles.cardTimeText}>{moment(item.start_time).format('DD MMM YYYY')} @ {moment(item.start_time).format('HH:mm')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderListEmptyEvents = () => {
    return(
      <View style={styles.upcomingEmptyCardWrapper}>
        <Text style={styles.noDataTextStyle}>NO UPCOMING EVENTS</Text>
      </View>
    )
  }

  const getProfile = async (upcomingPageLoad, catchesPageLoad, show_Loader, loadMoreType) => {
    if (show_Loader) {
      dispatch(showLoader())
    }
    setcatches_page(catchesPageLoad)
    setupcoming_page(upcomingPageLoad)
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Accept: 'Application/json',
        Authorization: `Bearer ${userToken}`
      }
    };

    const bodyParameters = {
      id: userData.id
    };

    await axios.post(
      `https://api.reelcash.com/api/userDetailsById?my_catches=${catchesPageLoad}&my_upcoming_events=${upcomingPageLoad}`,
      bodyParameters,
      config
    ).then((resp) => {
      if (show_Loader) {
        setUpcomingEvents(resp.data.data.my_upcoming_event.data)
        setDatacatchesList(resp.data.data.my_catches.data)
      } else {
        if (loadMoreType == 'catches') {
          const catches_data = resp.data.data.my_catches.data
          if (catches_data.length > 0) {
            const old_catches = catchesDataList
            old_catches.push(catches_data)
            setDatacatchesList(old_catches)
          }
        } else if (loadMoreType == 'upcoming') {
          const upcoming_data = resp.data.data.my_upcoming_event.data

          if (upcoming_data.length > 0) {
            const old_upcoming_data = upcomingEvents
            old_upcoming_data.push(upcoming_data)
            setUpcomingEvents(old_upcoming_data)
          }
        }
      }

      setrefreshUpcominglist(prev => { !prev })
      setrefreshCatchlist(prev => { !prev })
      dispatch(hideLoader())

      // dispatch(loginSuccess(userToken, resp.data.data))
    }).catch((err) => { console.log('re', err); dispatch(hideLoader()) });
  }

  const renderCatches = (item) => {
    return (
      <TouchableOpacity onPress={() => { navigation.navigate("FishDetailScreen", { fishName: item.species, fishData: item.id }) }}>
        <View style={styles.imageHeightWidth}>
          <Image
            style={styles.gallaryImageStyle}
            source={{ uri: item.catch_images[0].images }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  const onEndReachedLoad = (type) => {
    // console.log('run')
    if (type == 'catches') {
      getProfile(upcoming_page, catches_page + 1, false, type)
    } else if (type == 'upcoming') {
      getProfile(upcoming_page + 1, catches_page, false, type)
    }
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.alignJustifyCenter}>
            <View style={styles.flex1}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}>
                <Image
                  style={styles.backButtonStyle}
                  source={Constants.Images.BackIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.iconTopWrapper}>
              <View style={styles.iconWrapper}>
                <Image
                  style={styles.iconImageStyle}
                  source={Constants.Images.Icon}
                />
              </View>
            </View>
            <View style={styles.flex1}></View>
          </View>
          <View style={styles.headerButtonWrapper}>
            <View style={styles.logoutButtonWrapper}>
              {onterUserView === true ? (
                <View style={styles.blankIcon} />
              ) : (
                  <TouchableOpacity onPress={onPressConfirmAlert}>
                    <Image source={Constants.Images.LogoutIcon} />
                  </TouchableOpacity>
                )}
            </View>
            <View style={styles.settingButtonWrapper}>
              {onterUserView === true ? (
                <View style={styles.blankIcon} />
              ) : (
                  <TouchableOpacity>
                    <Image source={Constants.Images.SettingWhiteIcon} />
                  </TouchableOpacity>
                )}
            </View>
          </View>
        </View>
        <View>
          <View style={styles.profileImageWrapper}>
            <TouchableOpacity onPress={() => updateProfileImage()}>
              <Image
                style={styles.profileImageStyle}
                resizeMethod={"auto"}
                source={userData.profile_picture ? { uri: userData.profile_picture } : Constants.Images.DummyImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.userDetailWrapper}>
            <Text style={styles.welcomeTextStyle}>Welcome,</Text>
            <Text style={styles.userNameTextStyle}>{userName}</Text>
            <Text style={styles.stateTextStyle1}>Angler Pin:{userName.substr(0, 3).toUpperCase()}{userData.mobile ? userData.mobile.substr(0, 1) == 0 ? userData.mobile.substr(0, 7) : "0" + userData.mobile.substr(0, 7) : null}</Text>
            <View style={styles.stateEditWrapper}>
              <Text style={styles.stateTextStyle}>{userData.state}, {userData.country}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("EditProfileScreen")}>
                <Image
                  style={styles.penImageStyle}
                  source={Constants.Images.EditPenWhiteIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.rankWrapper}>
          <View style={styles.flexCenter}>
            <Text style={styles.numberTextStyle}>#29</Text>
            <Text style={styles.numberTitleTextStyle}>Fantasy Rank</Text>
          </View>
          <View style={styles.flexCenter}>
            <Text style={styles.numberTextStyle}>#34</Text>
            <Text style={styles.numberTitleTextStyle}>Official Rank</Text>
          </View>
          <View style={styles.flexCenter}>
            <Text style={styles.numberTextStyle}>84 Pts.</Text>
            <Text style={styles.numberTitleTextStyle}>Personal Bests</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.dividerWrapper}>
            <View style={styles.flex1_2}>
              <Text style={styles.dividerTextStyle}>Upcoming Events</Text>
            </View>
            <View style={styles.flex2}>
              <View style={styles.divideLine} />
            </View>
          </View>
          <View style={styles.paddingVertical22}>
            <FlatList
              extraData={refreshUpcominglist}
              data={upcomingEvents}
              onEndReachedThreshold={0.01}
              onEndReached={() => onEndReachedLoad('upcoming')}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItems}
              ListEmptyComponent={renderListEmptyEvents}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={styles.divider2Wrapper}>
            <View style={styles.flex2}>
              <Text style={styles.dividerTextStyle}>My Catches</Text>
            </View>
            <View style={styles.flex5}>
              <View style={styles.divideLine} />
            </View>
            <View style={styles.flexCenter}>
              <TouchableOpacity>
                <Image source={Constants.Images.ForwardArrowIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageWrapper}>
            <FlatList
              extraData={refreshCatchlist}
              data={catchesDataList}
              onEndReachedThreshold={0.01}
              horizontal
              showsHorizontalScrollIndicator={false}
              onEndReached={() => onEndReachedLoad('catches')}
              extraData={catchesDataList} renderItem={({ item, index }) => renderCatches(item, index)} />
          </View>
        </ScrollView>
        <View style={styles.editButtonWrapper}>
            {otherUserView ? (
              <BorderButton
                onButtonPress={() => navigation.goBack()}
                ButtonTitle={"Back"}
              />
            ) : (
                <>
                  <View style={styles.haveAccountWrapper}>
                    <Text style={styles.dontHaveAccountStyle}>
                      {`Want to create your own Tournament?`}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL("http://operator.reelcash.com/login")
                      }>
                      <Text
                        style={styles.registerTextStyle}
                      >{` Click here`}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.bottomButtonWrapper}>
                    <ColorButton
                      ButtonWidth={165}
                      OnPressButton={() =>
                        navigation.navigate("EditProfileScreen")
                      }
                      ButtonText={"Edit Profile"}
                    />
                    <BorderButton
                      onButtonPress={() => navigation.goBack()}
                      ButtonTitle={"Back"}
                    />
                  </View>
                </>
              )}
          </View>
        <AwesomeAlert
          show={showAlert}
          // alertContainerStyle={{}}
          contentContainerStyle={{ width: '75%', backgroundColor: Constants.Colors.DarkGrayColor, borderWidth: 2, borderRadius: 10, borderColor: Constants.Colors.GreenColor }}
          alertContainerStyle={{ backgroundColor: '#00000090' }}
          cancelButtonStyle={styles.alertButtonStyle1}
          confirmButtonStyle={styles.alertButtonStyle}
          confirmButtonTextStyle={styles.alertButtonTextStyle}
          cancelButtonTextStyle={styles.alertButtonTextStyle}
          titleStyle={styles.alertTitleStyle}
          messageStyle={styles.alertMessageStyle}
          showProgress={false}
          title="Log out"
          message="Do you want to Log out?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No"
          confirmText="Yes"
          confirmButtonColor="red"
          onCancelPressed={onPressCancelAlert}
          onConfirmPressed={onPressLogout}
        />
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;