import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "../../../constants";
import {
  ColorButton,
  CustomTextInput,
  BorderButton,
  PasswordTextInput,
} from "../../../components";
import I18n from "../../../utilities/locale";
import { ScrollView } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "./style";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../actions/user-actions-types";
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-community/google-signin";
import { validateEmail, validatePassword } from "../../../utilities/validation";
import Toast from "react-native-toast-message";

const Height = Dimensions.get("window").height;
type Props = {
  navigation: Object,
};

const checkEmailValifation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordTextError, setPasswordTextError] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [spinnerStart, setSpinnerStart] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoinStatus] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // console.warn("data come in state", JSON.stringify(user, undefined, 2));
    GoogleSignin.configure();
    // GoogleSignin.configure({
    //   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    //   webClientId:
    //     "428067431641-soqf27npr8980klt3nsea380bdparbvv.apps.googleusercontent.com",
    // });
    _isSignedIn();
  }, [user]);

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
      // console.warn("User Info --> ", userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert("User has not signed in yet");
        // console.warn("User has not signed in yet");
      } else {
        alert("Something went wrong. Unable to get user's info");
        // console.warn("Something went wrong. Unable to get user's info");
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
            setLoginSuccess(result);
            signOut();
          } else {
            // setError(true);
            signOut();
            console.warn(JSON.stringify(error, undefined, 2))
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

  const secureFunction = () => {
    setSecureText(!secureText);
  };

  const isValidEmail = (inputVlaue) => {
    if (checkEmailValifation.test(inputVlaue)) {
      return true;
    }
  };

  const onChangeText = (text, type) => {
    //this pattern checks for emoji
    var pattern = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/;
    if (type === "Email") {
      if (!pattern.test(text)) {
        setEmail(text.replace(/[^A-Za-z0-9@_.]/g, ""));
        setEmailError("");
      }
    }
    if (type === "Password") {
      setPasswordText(
        text.replace(/[^A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/g, "")
      );
      setPasswordTextError("");
    }
  };

  const onValidationsCheck = () => {
    setEmailError("");
    setPasswordTextError("");
    if (validateEmail(email).status !== true) {
      setEmailError(validateEmail(email).message);
    }
    if (validatePassword(passwordText).status !== true) {
      setPasswordTextError(validatePassword(passwordText).message);
    }
  };

  const setLoginSuccess = (responseJson) => {
    // dispatch(
    //   userActions.loginSuccess({
    //     data: responseJson.data,
    //   })
    // );
    // navigation.pop(1);
    navigation.replace("HomeScreen");
  };

  /*********************On Next ************************/
  const onNext = () => {
    onValidationsCheck();
    if (validateEmail(email).status !== true) {
      setEmailError(validateEmail(email).message);
    } else if (validatePassword(passwordText).status !== true) {
      setPasswordTextError(validatePassword(passwordText).message);
    } else {
      // setSpinnerStart(true);
      const data = {
        email: email,
        password: passwordText,
      };
      console.warn(data);
      dispatch(
        userActions.emailLogin({
          data,
          callback: ({ result, error }) => {
            // setSpinnerStart(false);
            // console.warn('jjjjjjljk---->',JSON.stringify(result.data))
            if (!error) {
              setLoginSuccess(result);
            } else {
              // setError(true);
              alert("login faild");
            }
          },
        })
      );
    }
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
            setLoginSuccess(result);
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
      source={Constants.Images.BackgroundImage}
      style={styles.container}
    >
      <SafeAreaView style={styles.flex1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.flex11}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.scrollViewStyle}
          >
            <View style={styles.container1}>
              <View style={styles.iconWrapper}>
                <Image
                  style={styles.iconStyle}
                  resizeMode={"contain"}
                  source={Constants.Images.Icon}
                />
              </View>
              <Text style={styles.loginTextStyle}>{I18n.en.LogIn}</Text>
              <View style={styles.socialButtonWrapper}>
                <BorderButton
                  FrontImage={Constants.Images.FButtonIcon}
                  firstIcon={true}
                  FirstLatter={"f"}
                  onButtonPress={onPressFacebook}
                  ButtonTitle={"Facebook"}
                />
                <BorderButton
                  FrontImage={Constants.Images.GButtonIcon}
                  firstIcon={true}
                  FirstLatter={"G"}
                  onButtonPress={() => _signIn()}
                  ButtonTitle={"Google"}
                />
              </View>
            </View>
            <Text style={styles.orTextStyle}>-or-</Text>
            <View style={styles.formWrapper}>
              <View style={[styles.flex1]}>
                <CustomTextInput
                  textInputName={"Email"}
                  placeHolder={"Enter your email"}
                  onError={emailError}
                  typeOfKeyBoard={"email-address"}
                  changeText={(text) => onChangeText(text, "Email")}
                />
                <View style={styles.paddingTextInput}>
                  <PasswordTextInput
                    textInputName={I18n.en.Password}
                    placeHolder={I18n.en.EnterPassword}
                    secure={secureText}
                    onError={passwordTextError}
                    typeOfKeyBoard={"default"}
                    secureEntry={secureFunction}
                    changeText={(text) => onChangeText(text, "Password")}
                  />
                </View>
                <View style={{alignItems:'center'}}>
                  <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={()=>navigation.navigate('ForgotPasswordScreen')}
                  >
                  <Text style={styles.registerTextStyle}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.paddingTextInput}>
                  <ColorButton
                    OnPressButton={() => onNext()}
                    ButtonText={I18n.en.LogIn}
                  />
                </View>
              </View>
            </View>
            <View style={styles.haveAccountWrapper}>
              <View style={{flexDirection:'row', flexWrap:'wrap'}}>
              <Text style={styles.dontHaveAccountStyle}>
                {`${I18n.en.DontHaveAccount}  `}
              </Text>
              <TouchableOpacity
                  onPress={() => navigation.navigate("RegisterScreen")}
                >
                  <Text style={styles.registerTextStyle}>
                    {I18n.en.Register}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.haveAccountWrapper1}>
              <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.dontHaveAccountStyle}>
                {`Want to create your own  tournament?`}
              </Text>
              <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("http://operator.reelcash.com/login")
                  }
                >
                  <Text style={styles.registerTextStyle}> Click Here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Spinner
          visible={spinnerStart}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;
