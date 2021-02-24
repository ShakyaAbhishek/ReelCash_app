import React, { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import {
  Header,
  HeaderWithBack,
  TabBar,
  OnGoingScreen,
  UpcomingScreen,
  EndedScreen,
  PasswordTextInput,
} from "../../../components";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import styles from "./style";
import AwesomeAlert from 'react-native-awesome-alerts';
import constants from "../../../constants";
import { validateEmail, validatePassword } from "../../../utilities/validation";

type props = {
  navigation: Object,
  route: Object,
};

const headerList = [
  {
    id: 0,
    lable: "Ongoing",
  },
  {
    id: 1,
    lable: "Upcoming",
  },
  {
    id: 2,
    lable: "Ended",
  },
];

const OperatorScreen = ({ navigation, route }: props) => {
  const [currentUserId, setCurrentUserId] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [t_password, sett_password] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [passwordTextError, setPasswordTextError] = useState('');
  const [t_joinedStatus, sett_joinedStatus] = useState(0);
  const [tournamentId, setTournamentId] = useState('');
  const { operatorId } = route.params;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userToken } = user;
  useEffect(() => {
    const { userData } = user;
    // console.warn('this is the operator screen and operator id--->', operatorId)
    // console.warn('this is operator page on user data ------->', JSON.stringify(userData.id, undefined, 2));
    setCurrentUserId(userData.id);
    // apiCallingFunction(userData.id);
  }, [user]);

  const onChangeText = (text, type) => {
    if (type === "Password") {
      setPasswordText(
        text.replace(/[^A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/g, "")
      );
      setPasswordTextError("");
    }
  };

  const secureFunction = () => {
    setSecureText(!secureText);
  };

  const onScreenMove = (item, joined_status, is_private, p_password) => {
    setTournamentId(item);
    sett_joinedStatus(joined_status);
    if (is_private === 'yes') {
      setShowAlert(true);
      sett_password(p_password);
    }
    else {
      const tournamentStatus = joined_status === 1 ? false : true;
      navigation.navigate("TournamentDetailScreen", { upComingScreen: tournamentStatus, TournamentId: item });
    }
    // navigation.navigate("TournamentDetailScreen", { upComingScreen: false });
  };
  const upComingScreenMove = (item, joined_status, is_private, p_password) => {
    setTournamentId(item);
    sett_joinedStatus(joined_status);
    if (is_private === 'yes') {
      setShowAlert(true);
      sett_password(p_password);
    }
    else {
      const tournamentStatus = joined_status === 1 ? false : true;
      navigation.navigate("TournamentDetailScreen", { upComingScreen: tournamentStatus, TournamentId: item });
    }
  };

  const alertConfirmbutton = () => {
    if (validatePassword(passwordText).status !== true) {
      setPasswordTextError(validatePassword(passwordText).message);
    }
    else if (passwordText !== t_password) {
      setPasswordTextError('Please enter valid password.');
    }
    else if (passwordText === t_password) {
      setShowAlert(false);
      const tournamentStatus = t_joinedStatus === 1 ? false : true;
      navigation.navigate("TournamentDetailScreen", { upComingScreen: tournamentStatus, TournamentId: tournamentId });
    }
  }

  const priceButton = () => {
    navigation.navigate("MyStatisticsScreen");
    // alert('dd')
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const onPressProfileIcon = () => {
    if (userToken == "") {
      navigation.navigate("LoginScreen");
    } else {
      navigation.navigate("ProfileScreen", { otherUserView: false });
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <HeaderWithBack
          onBackPress={onBackPress}
          pressLeftButton={priceButton}
          profileIconPress={onPressProfileIcon}
        />
        <View style={styles.flex1}>
          <ScrollableTabView
            renderTabBar={() => <TabBar headerList={headerList} />}
            style={styles.ScrollableTabStyle}
            prerenderingSiblingsNumber={3}
            initialPage={1}
          >
            <OnGoingScreen operator={operatorId} onScreenMove={ (item, joined_status, is_private, private_pass) => onScreenMove(item, joined_status, is_private, private_pass)} />
            <UpcomingScreen operator={operatorId} onScreenMove={(item, joined_status, is_private, private_pass) => upComingScreenMove(item, joined_status, is_private, private_pass)} />
            <EndedScreen operator={operatorId} />
          </ScrollableTabView>
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          contentContainerStyle={{ width: '90%', backgroundColor: constants.Colors.DarkGrayColor, borderWidth: 2, borderRadius: 10, borderColor: constants.Colors.GreenColor }}
          alertContainerStyle={{ backgroundColor: '#00000090' }}
          cancelButtonStyle={styles.alertButtonStyle}
          confirmButtonStyle={styles.alertButtonStyle}
          confirmButtonTextStyle={styles.alertButtonTextStyle}
          cancelButtonTextStyle={styles.alertButtonTextStyle}
          titleStyle={styles.alertTitleStyle}
          messageStyle={styles.alertMessageStyle}
          title="Private Tournament"
          // message="Please enter the Valid password."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="cancel"
          cancelButtonColor='red'
          confirmText="Next"
          confirmButtonColor={constants.Colors.GreenColor}
          customView={<View style={{ width: '100%' }}><PasswordTextInput
            textInputName={'Please Enter your tournament password'}
            placeHolder={'Password'}
            secure={secureText}
            onError={passwordTextError}
            typeOfKeyBoard={"default"}
            secureEntry={secureFunction}
            changeText={(text) => onChangeText(text, 'Password')}
          /></View>}
          onCancelPressed={() => {
            setShowAlert(!showAlert)
          }}
          onConfirmPressed={alertConfirmbutton}
        />
      </SafeAreaView>
    </View>
  );
};

export default OperatorScreen;
