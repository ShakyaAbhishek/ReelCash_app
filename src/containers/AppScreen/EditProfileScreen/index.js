import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image
} from "react-native";
import {
  BorderButton,
  CustomTextInput,
  ColorButton,
  BackButton,
  PasswordTextInput,
  HeaderWithTitle,
  PickerInputState,
  PickerInput,
} from "../../../components";
import I18n from "../../../utilities/locale";
import Constatns from "../../../constants";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { loginSuccess } from "../../../actions/user-actions-types";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-toast-message";
import { hideLoader, showLoader } from "../../../actions/app-actions-types";
import * as userActions from "../../../actions/user-actions-types";

type props = {
  navigation: Object,
};

const EditProfileScreen = ({ navigation }: props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const { userData, userToken } = user
  const [fname, setfname] = useState(userData.fname)
  const [lname, setlname] = useState(userData.lname)

  const [email, setemail] = useState(userData.email)
  const [mobileNumber, setmobileNumber] = useState(userData.mobile)
  const [state, setSState] = useState(userData.state)
  const [countryCode, setCountryCode] = useState(userData.country_code ? userData.country_code : "+21")
  const [old_password, setold_password] = useState(null)
  const [new_password, setnew_password] = useState(null)
  const [confirm_new_password, setconfirm_new_password] = useState(null)
  const [modalVisible1, setModalVisible1] = useState(false);
  const [stateNameError, setStateNameError] = useState("");
  const [stateName, setStateName] = useState(userData.state);
  const [statesData, setStatesData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [countryFlag, setCountryFlag] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [countryCodes, setCountryCodes] = useState([]);
  const [countryName, setCountryName] = useState(userData.country_code === '+1' ? 'Canada' : 'USA')

  useEffect(() => {
    getCountryCodes();
    getstatesData(countryCode);
  }, [])

  const backPress = () => {
    navigation.goBack();
  };

  /***************************** */
  const dismissModalHandler = () => {
    setModalVisible(false);
  };

  const dismissModalHandler1 = () => {
    setModalVisible1(false);
  };

  const selectedItem1 = (item) => {
    setStateName(item.state);
    dismissModalHandler1();
  };

  const selectedItem = (item) => {
    setCountryName(item.country)
    setCountryCode(item.code);
    setCountryFlag(item.flag);
    setStateName("");
    dismissModalHandler();
    getstatesData(item.code);
  };

  const getstatesData = () => {
    // setSpinnerStart(true);
    dispatch(
      userActions.getStateByCountryName({
        callback: ({ result, error }) => {
          if (!error) {
            if (result) {
              const { USA, Canada } = result.data;
              const usaData = [...USA];
              const canadaData = [...Canada];
              const shortUSA = usaData.sort((a, b) => (a.state > b.state ? 1 : -1));
              const shortCanada = canadaData.sort((a, b) => (a.state > b.state ? 1 : -1));
              const finalData = [];
              [1, 2].map((i) => {
                const obj = {
                  countryName: i == 1 ? "USA" : "Canada",
                  statesName: i == 1 ? shortUSA : shortCanada,
                  id: i
                };
                finalData.push(obj);
              })
              setStatesData(finalData);
            }
          }
        }
      })
    )
  };


  /***************************************************************************************************/
  const getCountryCodes = () => {
    dispatch(
      userActions.getCountryCode({
        callback: ({ result, error }) => {
          // setSpinnerStart(false);
          if (!error) {
            // console.warn(
            //   "get the country data is",
            //   JSON.stringify(result, undefined, 2)
            // );
            // setSpinnerStart(false);
            // setSignUPSuccess(result);country_code
            const dummydata = result.data.country_code;
            const finalData = dummydata.sort((a, b) => (a.country > b.country ? 1 : -1))
            setCountryCodes(finalData);
            const countryFlagIndex = finalData.find(item => item.country == userData.country)
            setCountryFlag(countryFlagIndex.flag)
          } else {
            // setError(true);
            alert("Register faild");
          }
        },
      })
    );
  };

  const onSave = () => {
    dispatch(showLoader())
    const formData = new FormData();
    formData.append('id', userData.id);
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('email', email);
    formData.append('country_code', countryCode);
    formData.append('mobile', mobileNumber);
    formData.append('state', stateName);
    formData.append('country', countryName);
    const bodyParameters = {
      fname: fname,
      lname: lname,
      email: email,
      country_code: countryCode,
      mobile: mobileNumber,
      state: stateName,
      id: userData.id,
      // country: countryName
    };

    // console.warn(formData);
    fetch("https://api.reelcash.com/api/updateProfile", {
      method: "POST",
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userToken}`
      },
      body: formData,
    })
      .then(processResponse)
      .then(async (res) => {
        const { statusCode, data } = res;
        // console.warn(statusCode);
        // console.warn(JSON.stringify(data, undefined, 2));
        dispatch(hideLoader())
        // console.log('re', data)
        if (statusCode == 200) {
          dispatch(loginSuccess({ userToken: userToken, data: data.data }))
          Toast.show({ text1: "Profile Updated Sucessfully!" });
          navigation.goBack()
        } else {
          // console.warn(JSON.stringify("jgjj",resp, undefined, 2))
        }
      })
      .catch((error) => {
        // console.warn('re', error); dispatch(hideLoader()) 
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

  const onChangePressed = () => {
    dispatch(showLoader())
    // console.log('dd', userToken)
    const config = {
      headers: {
        'Content-type': 'Application/json',
        Accept: 'Application/json',
      }
    };

    const bodyParameters = {
      id: "userData.id",
      old_password: old_password.trim(),
      new_password: new_password.trim(),
    };

    // console.log('ab', bodyParameters)
    axios.post(
      'https://api.reelcash.com/api/resetPassword',
      bodyParameters,
      config
    ).then((resp) => {
      dispatch(hideLoader())
      if (resp.status == 200) {
        Toast.show({ text1: "Password Changed Sucessfully!" });
        navigation.goBack()
      }
      // console.log('resp', resp.data.data)

      // dispatch(loginSuccess(userToken, resp.data.data))
    }).catch((err) => {
      dispatch(hideLoader())
      // Toast.show({ type: "error", text1: "Error Message", text2: err.response, message, });
    });
  }

  const onResetPassword = () => {
    if (!old_password) {
      Toast.show({ type: "error", text1: "Error Message", text2: "Please enter old password.", });
    } else if (!new_password) {
      Toast.show({ type: "error", text1: "Error Message", text2: "Please enter new password.", });
    } else if (!confirm_new_password) {
      Toast.show({ type: "error", text1: "Error Message", text2: "Please enter confirm password.", });
    } else if (new_password.trim() != confirm_new_password.trim()) {
      Toast.show({ type: "error", text1: "Error Message", text2: "New Password and confirm password doesn't match.", });
    } else {
      onChangePressed()
    }
  }
  return (
    <View style={styles.container}>
      <HeaderWithTitle
        screenName={"Edit Profile"}
        backArrow={true}
        forwordArrow={false}
        backPress={backPress}
      />
      <SafeAreaView style={styles.container1}>
        <View style={styles.flexHorizontal}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.flex1}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={(styles.flex1, styles.paddingVert)}
            >
              <View style={styles.firstLastNameWrapper}>
                <View style={styles.paddingRightFlex}>
                  <CustomTextInput
                    value={fname}
                    changeText={(i) => setfname(i)}
                    textInputName={I18n.en.FirstName}
                    placeHolder={I18n.en.TextHere}
                    Required={true}
                  />
                </View>
                <View style={styles.paddingLeftFlex}>
                  <CustomTextInput
                    value={lname}
                    changeText={(i) => setlname(i)}
                    textInputName={I18n.en.LastName}
                    placeHolder={I18n.en.TextHere}
                    Required={true}
                  />
                </View>
              </View>
              <View style={styles.textInputWrapper}>
                <CustomTextInput
                  value={email}
                  changeText={(i) => setemail(i)}
                  textInputName={I18n.en.EmailAddress}
                  placeHolder={I18n.en.TextHere}
                  Required={true}
                />
              </View>
              <View style={[styles.firstLastNameWrapper, styles.marginTop20]}>
                <View style={styles.paddingRightFlex}>
                  <Text style={styles.labelTextStyle}>Code</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    activeOpacity={0.9}
                    style={styles.pickerInputWrapper}
                  >
                    <View style={styles.pickerInnerWrapper}>
                      <Image
                        resizeMode={"contain"}
                        style={styles.flagImageStyle}
                        source={
                          countryFlag == ""
                            ? Constatns.Images.DummyFlatImage
                            : { uri: countryFlag }
                        }
                      />
                      <View style={styles.pickerTextWrapper}>
                        <Text
                          style={{
                            fontFamily: "ProximaNova-Regular",
                            fontSize: 14,
                            color: Constatns.Colors.WhiteColor,
                          }}
                        >
                          {countryCode}
                        </Text>
                      </View>
                      <Image source={Constatns.Images.ArrowDownGreenIcon} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.paddingLeftFlex}>
                  <CustomTextInput
                    value={mobileNumber}
                    textInputName={"Mobile Number"}
                    placeHolder={"0000 000000"}
                    onError={mobileNumberError}
                    typeOfKeyBoard={"number-pad"}
                    changeText={(i) => setmobileNumber(i)}
                  />
                </View>
              </View>
              {/* <View style={styles.textInputWrapper}>
                <CustomTextInput
                  value={state}
                  changeText={(i) => setSState(i)}
                  textInputName={I18n.en.State}
                  placeHolder={I18n.en.TextHere}
                />
              </View> */}
              <View style={styles.textInputWrapper}>
                {/* <CustomTextInput
                  textInputName={I18n.en.State}
                  placeHolder={I18n.en.TextHere}
                /> */}
                <Text style={styles.labelTextStyle}>State</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible1(true);
                    setStateNameError("");
                  }}
                  activeOpacity={0.9}
                  style={styles.pickerInputWrapper}
                >
                  <View style={styles.pickerInnerWrapper}>
                    <View style={styles.pickerTextWrapper1}>
                      <Text
                        style={{
                          fontFamily: "ProximaNova-Regular",
                          fontSize: 14,
                          color: Constatns.Colors.WhiteColor,
                        }}
                      >
                        {stateName == "" ? `Select` : stateName}
                      </Text>
                    </View>
                    <Image source={Constatns.Images.ArrowDownGreenIcon} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.signUpButtonWrapper}>
                <TouchableOpacity onPress={onSave}>
                  <ColorButton ButtonText={"Save"} />
                </TouchableOpacity>
              </View>
              <View style={styles.resetPassWrapper}>
                <Text style={styles.resetPasswordText}>Reset Password</Text>
              </View>
              <View style={styles.textInputWrapper}>
                <PasswordTextInput
                  value={old_password}
                  secure
                  changeText={(i) => setold_password(i)}
                  textInputName={"Old Password"}
                  placeHolder={I18n.en.TextHere}
                  Required={true}
                />
              </View>
              <View style={styles.textInputWrapper}>
                <PasswordTextInput
                  value={new_password}
                  secure
                  changeText={(i) => setnew_password(i)}
                  textInputName={"New Password"}
                  placeHolder={I18n.en.TextHere}
                  Required={true}
                />
              </View>
              <View style={styles.textInputWrapper}>
                <PasswordTextInput
                  value={confirm_new_password}
                  secure
                  changeText={(i) => setconfirm_new_password(i)}
                  textInputName={"Retype New Password"}
                  placeHolder={I18n.en.TextHere}
                  Required={true}
                />
              </View>
              <View style={styles.signUpButtonWrapper}>
                <TouchableOpacity onPress={() => onResetPassword()}>
                  <ColorButton ButtonText={"Reset Password"} />
                </TouchableOpacity>
              </View>
              {/* <View style={styles.alreadyButtonWrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                //   onPress={OnBackPress}
                  style={styles.alreadyButton}>
                  <Text style={styles.alreadyButtonText}>
                    {I18n.en.AlreadyHaveAccount}
                  </Text>
                </TouchableOpacity>
              </View> */}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <PickerInput
          countryData={countryCodes}
          modalVisible={modalVisible}
          dismissModalHandler={dismissModalHandler}
          selectedValue={(item) => selectedItem(item)}
        />
        <PickerInputState
          countryData={statesData}
          modalVisible={modalVisible1}
          dismissModalHandler={dismissModalHandler1}
          selectedValue={(item) => selectedItem1(item)}
        />
      </SafeAreaView>
    </View>
  );
};

export default EditProfileScreen;