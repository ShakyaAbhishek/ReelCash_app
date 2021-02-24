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
    BackButton,
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

type props = {
    navigation: Object,
}

const ForgotPasswordScreen = ({ navigation }: props) => {
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const onChangeText = (text, type) => {
        //this pattern checks for emoji
        var pattern = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/;
        if (type === "Email") {
            if (!pattern.test(text)) {
                setEmail(text.replace(/[^A-Za-z0-9@_.]/g, ""));
                setEmailError("");
            }
        }
    };

    const onValidationsCheck = () => {
        setEmailError("");
        if (validateEmail(email).status !== true) {
            setEmailError(validateEmail(email).message);
        }
    };

    const onPressSubmit = () => {
        onValidationsCheck();
        if (validateEmail(email).status !== true) {
            setEmailError(validateEmail(email).message);
        } else {
            const data = {
                email: email,
            };
            dispatch(
                userActions.forgotPasswordAction({
                    data,
                    callback: ({ result, error }) => {
                        if (!error) {
                            navigation.navigate('LoginScreen')
                        } else {
                            
                        }
                    },
                })
            )
        }
    }

    const OnBackPress = () => {
        navigation.goBack();
    }

    return (
        <ImageBackground source={Constants.Images.BackgroundImage} style={styles.container}>
            <SafeAreaView style={styles.flex1}>
           <View style={styles.backButtonWrapper}>
           <BackButton OnBackPress={OnBackPress} />
           </View>
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
                            <Text style={styles.loginTextStyle}>{`Forgot Password`}</Text>
                        </View>
                        <View style={styles.mainWrapper}>
                            <CustomTextInput
                                textInputName={"Email"}
                                placeHolder={"Enter your email"}
                                onError={emailError}
                                typeOfKeyBoard={"email-address"}
                                changeText={(text) => onChangeText(text, "Email")}
                            />
                            <View style={styles.paddingTextInput}>
                                <ColorButton
                                    OnPressButton={() => onPressSubmit()}
                                    ButtonText={`Submit`}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
};



export default ForgotPasswordScreen;
