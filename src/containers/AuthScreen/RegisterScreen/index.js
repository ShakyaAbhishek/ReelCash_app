import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import {
  BorderButton,
  CustomTextInput,
  ColorButton,
  BackButton,
  PasswordTextInput,
  PickerInput,
  PickerInputState,
} from "../../../components";
import I18n from "../../../utilities/locale";
import Constatns from "../../../constants";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "./style";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../actions/user-actions-types";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-community/google-signin";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePhoneNo,
} from "../../../utilities/validation";

type porps = {
  navigation: Object,
};

const checkEmailValifation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const RegisterScreen = ({ navigation }: props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+21");
  const [mobileNumber, setMobileNumber] = useState("");
  const [stateName, setStateName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [stateNameError, setStateNameError] = useState("");
  const [emailIdError, setEmailIdError] = useState("");
  const [passwordTextError, setPasswordTextError] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [spinnerStart, setSpinnerStart] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [countryFlag, setCountryFlag] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoinStatus] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    getCountryCodes();
    getstatesData();
    GoogleSignin.configure();
    // GoogleSignin.configure({
    //   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    //   webClientId:
    //     "428067431641-soqf27npr8980klt3nsea380bdparbvv.apps.googleusercontent.com",
    // });
    _isSignedIn();
  }, []);

  /*******************Google login functions *********************************************************/
  async function _isSignedIn() {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      _getCurrentUserInfo();
    } else {
      console.warn("Please Login");
    }
    setGettingLoinStatus(false);
  }

  async function _getCurrentUserInfo() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.warn("User Info --> ", userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert("User has not signed in yet");
        console.warn("User has not signed in yet");
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.warn("Something went wrong. Unable to get user's info");
      }
    }
  }

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      register_googleData(userInfo);
    } catch (error) {
      console.warn("Message", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.warn("User Cancelled the Login Flow");
        signOut();
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.warn("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.warn("Play Services Not Available or Outdated");
      } else {
        console.warn("Some Other Error Happened");
      }
    }
  };

  const register_googleData = (userInfo) => {
    // setSpinnerStart(true);
    const user = userInfo.user;
    const data = {
      email: user.email,
      provider: "google",
      provider_id: user.id,
      name: user.name,
    };
    dispatch(
      userActions.googleLogin({
        data,
        callback: ({ result, error }) => {
          console.warn(
            "after login result",
            JSON.stringify(result, undefined, 2)
          );
          // setSpinnerStart(false);
          if (!error) {
            setSignUPSuccess(result);
            signOut();
          } else {
            // setError(true);
            signOut();
            // alert("login faild");
          }
        },
      })
    );
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  /***************************************************************************************************/

  const getCountryCodes = () => {
    dispatch(
      userActions.getCountryCode({
        callback: ({ result, error }) => {
          // setSpinnerStart(false);
          if (!error) {
            console.warn(
              "get the country data is",
              JSON.stringify(result, undefined, 2)
            );
            // setSpinnerStart(false);
            // setSignUPSuccess(result);country_code
            const { country_code } = result.data;
            const data = [...country_code];
              const dummydata1 = [];
              data.map((i)=>{
                const obj = {
                  code: i.code,
                  state: i.state,
                  country: i.country,
                  flag: i.flag,
                }
                dummydata1.push(obj);
              });
              const finalData1 = dummydata1.sort((a,b)=> (a.state > b.state ? 1 : -1))
            const dummydata = country_code;
              const finalData = dummydata.sort((a,b)=> (a.country > b.country ? 1 : -1));
            setCountryCodes(finalData);
            // setStatesData(finalData1);
          } else {
            // setError(true);
            console.warn("Register faild");
          }
        },
      })
    );
  };

  const secureFunction = () => {
    setSecureText(!secureText);
  };

  const isValidEmail = (inputVlaue) => {
    if (checkEmailValifation.test(inputVlaue)) {
      return true;
    }
  };

  const selectedItem = (item) => {
    // console.warn(
    //   "the item of the selected data",
    //   JSON.stringify(item, undefined, 2)
    // );
    setCountryCode(item.code);
    setCountryFlag(item.flag);
    // setStateName("");
    dismissModalHandler();
    // getstatesData(item.code);
  };

  const selectedItem1 = (item) => {
    // console.warn(
    //   "the item of the selected data",
    //   JSON.stringify(item, undefined, 2)
    // );
    setStateName(item.state);
    // setCountryFlag(item.flag);
    dismissModalHandler1();
    // getstatesData();
  };

  const getstatesData = () => {
    // setSpinnerStart(true);
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
              })
              console.warn('fdsfsdf', JSON.stringify(finalData, undefined, 2));
              setStatesData(finalData);
            }
          }
        }
      })
    )
  };

  const onChangeText = (text, type) => {
    //this pattern checks for emoji
    var pattern = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/;
    if (type === "Email") {
      if (!pattern.test(text)) {
        setEmailId(text.replace(/[^A-Za-z0-9@_.]/g, ""));
        setEmailIdError("");
      }
    }
    if (type === "Phone") {
      setMobileNumber(text.replace(/[^0-9]/g, ""));
      setMobileNumberError("");
    }
    if (type === "firstName") {
      setFirstName(text);
      setFirstNameError("");
    }
    if (type === "lastName") {
      setLastName(text);
      setLastNameError("");
    }
    if (type === "Password") {
      setPasswordText(text);
      setPasswordTextError("");
    }
  };

  /************************* */
  const onValidationsCheck = () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailIdError("");
    setMobileNumberError("");
    setPasswordTextError("");
    setStateNameError("");
    if (validateFirstName(firstName).status !== true) {
      setFirstNameError(validateFirstName(firstName).message);
    }
    if (validateLastName(lastName).status !== true) {
      setLastNameError(validateLastName(lastName).message);
    }
    if (validatePhoneNo(mobileNumber).status !== true) {
      setMobileNumberError(validatePhoneNo(mobileNumber).message);
    }
    if (emailId == "") {
      setEmailIdError("Enter Email Address");
    }
    if (validateEmail(emailId).status !== true) {
      setEmailIdError(validateEmail(emailId).message);
    }
    if (stateName == "") {
      setStateNameError("Select State Name");
    }
    if (validatePassword(passwordText).status !== true) {
      setPasswordTextError(validatePassword(passwordText).message);
    }
  };

  const setSignUPSuccess = (responseJson) => {
    // dispatch(
    //   userActions.loginSuccess({
    //     data: responseJson.data,
    //   })
    // );
    // navigation.pop(2);
    navigation.replace("HomeScreen");
  };
  /*********************On Next ************************/
  const onNext = () => {
    onValidationsCheck();
    if (validateFirstName(firstName).status !== true) {
      setFirstNameError(validateFirstName(firstName).message);
    } else if (validateLastName(lastName).status !== true) {
      setLastNameError(validateLastName(lastName).message);
    } else if (validatePhoneNo(mobileNumber).status !== true) {
      setMobileNumberError(validatePhoneNo(mobileNumber).message);
    } else if (emailId == "") {
      setEmailIdError("Enter Email Address");
    } else if (validateEmail(emailId).status !== true) {
      setEmailIdError(validateEmail(emailId).message);
    } else if (validatePassword(passwordText).status !== true) {
      setPasswordTextError(validatePassword(passwordText).message);
    } else if (stateName == "") {
      setStateNameError("Select State Name");
    } else {
      // setSpinnerStart(true);
      const data = {
        fname: firstName,
        lname: lastName,
        email: emailId,
        country_code: countryCode,
        mobile: mobileNumber,
        state: stateName,
        device_id: "dhdskhkdshlsldmfhfsa",
        password: passwordText,
      };
      console.warn('request data',data);
      dispatch(
        userActions.registerUser({
          data,
          callback: ({ result, error }) => {
            // console.warn("jfdsfjsdfj", error);
            // setSpinnerStart(false);
            if (!error) {
             if(result.success===true) {
              setSignUPSuccess(result);
             }
            } else {
              // setError(true);
              alert("Register faild");
            }
          },
        })
      );
    }
  };

  /***************************** */
  const dismissModalHandler = () => {
    setModalVisible(false);
  };
  const dismissModalHandler1 = () => {
    setModalVisible1(false);
  };

  const OnBackPress = () => {
    navigation.goBack();
  };

  const onPressFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          // alert("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const responseInfoCallback = (error, result) => {
              if (error) {
                console.warn(error);
              } else {
                console.warn("result", JSON.stringify(result, undefined, 2));
                register_FacebookData(result);
              }
            };
            const accessToken = data.accessToken;
            const infoRequest = new GraphRequest(
              "/me",
              {
                accessToken,
                parameters: {
                  fields: {
                    string:
                      "first_name,last_name,gender,picture.type(large),email",
                  },
                },
              },
              responseInfoCallback
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
          // signIn('vishal')
          // AsyncStorage.setItem('isLoggedin', '1');
        }
      },
      function (error) {
        console.warn("Login fail with error: " + error);
      }
    );
  };

  const register_FacebookData = (userInfo) => {
    // setSpinnerStart(true);
    const user = userInfo;
    const data = {
      email: user.email,
      provider: "facebook",
      provider_id: user.id,
      name: `${user.first_name} ${user.last_name}`,
    };
    dispatch(
      userActions.googleLogin({
        data,
        callback: ({ result, error }) => {
          console.warn(
            "after login result",
            JSON.stringify(result, undefined, 2)
          );
          // setSpinnerStart(false);
          if (!error) {
            setSignUPSuccess(result);
          } else {
            // setError(true);
            alert("login faild");
          }
        },
      })
    );
  };


  return (
    <ImageBackground
      source={Constatns.Images.BackgroundImage}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.backButtonStyle}>
            <BackButton OnBackPress={OnBackPress} />
          </View>
          <Text style={styles.titleTextStyle}>{I18n.en.Register}</Text>
        </View>
        <View style={styles.flexHorizontal}>
          <View style={styles.socialButtonWrapper}>
            <BorderButton
              FrontImage={Constatns.Images.FButtonIcon}
              firstIcon={true}
              FirstLatter={"f"}
              onButtonPress={onPressFacebook}
              ButtonTitle={"Facebook"}
            />
            <BorderButton
              FrontImage={Constatns.Images.GButtonIcon}
              firstIcon={true}
              FirstLatter={"G"}
              onButtonPress={() => _signIn()}
              ButtonTitle={"Google"}
            />
          </View>
          <Text style={styles.orText}>- or -</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={[styles.flex1, , styles.paddingVert]}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={styles.flex1}
            >
              <View style={styles.firstLastNameWrapper}>
                <View style={styles.paddingRightFlex}>
                  <CustomTextInput
                    textInputName={I18n.en.FirstName}
                    placeHolder={I18n.en.TextHere}
                    Required={true}
                    onError={firstNameError}
                    typeOfKeyBoard={"default"}
                    changeText={(text) => onChangeText(text, "firstName")}
                  />
                </View>
                <View style={styles.paddingLeftFlex}>
                  <CustomTextInput
                    textInputName={I18n.en.LastName}
                    placeHolder={I18n.en.TextHere}
                    Required={true}
                    onError={lastNameError}
                    typeOfKeyBoard={"default"}
                    changeText={(text) => onChangeText(text, "lastName")}
                  />
                </View>
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
                    textInputName={I18n.en.MobileNumber}
                    placeHolder={"0000 000000"}
                    onError={mobileNumberError}
                    typeOfKeyBoard={"number-pad"}
                    changeText={(text) => onChangeText(text, "Phone")}
                  />
                </View>
              </View>
              <View style={styles.textInputWrapper}>
                {/* <CustomTextInput
                  textInputName={I18n.en.State}
                  placeHolder={I18n.en.TextHere}
                /> */}
                <Text style={styles.labelTextStyle}>{I18n.en.State}</Text>
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
              {stateNameError != "" ? (
                <Text
                  style={styles.errorTextStyle}
                >{`*${stateNameError}`}</Text>
              ) : null}
              <View style={styles.textInputWrapper}>
                <CustomTextInput
                  textInputName={I18n.en.EmailAddress}
                  placeHolder={I18n.en.TextHere}
                  Required={true}
                  onError={emailIdError}
                  typeOfKeyBoard={"email-address"}
                  changeText={(text) => onChangeText(text, "Email")}
                />
              </View>
              <View style={styles.textInputWrapper}>
                <PasswordTextInput
                  textInputName={I18n.en.Password}
                  placeHolder={I18n.en.TextHere}
                  Required={true}
                  secure={secureText}
                  onError={passwordTextError}
                  secureEntry={secureFunction}
                  typeOfKeyBoard={'default'}
                  changeText={(text) => onChangeText(text, "Password")}
                />
              </View>
              {/* <View style={styles.textInputWrapper}>
                <CustomTextInput
                  textInputName={I18n.en.PromoCode}
                  placeHolder={I18n.en.TextHere}
                  promocode={true}
                />
              </View> */}
              <View style={styles.termsAndConditionWrapper}>
                <Text style={styles.termTextStyle}>
                  {I18n.en.ByRegistering}
                </Text>
                <Text style={styles.termTextStyle}>
                  <Text style={{ color: Constatns.Colors.GreenColor }}>
                    {I18n.en.Terms_Condition}
                  </Text>
                  {` ${I18n.en.And} `}
                  <Text style={{ color: Constatns.Colors.GreenColor }}>
                    {I18n.en.PrivacyPolicy}
                  </Text>
                </Text>
              </View>
              <View style={styles.signUpButtonWrapper}>
                <ColorButton
                  OnPressButton={() => onNext()}
                  ButtonText={I18n.en.SignUp}
                />
              </View>
              <View style={styles.alreadyButtonWrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={OnBackPress}
                  style={styles.alreadyButton}
                >
                  <Text style={styles.alreadyButtonText}>
                    {I18n.en.AlreadyHaveAccount}
                  </Text>
                </TouchableOpacity>
              </View>
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
        <Spinner
          visible={spinnerStart}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;
