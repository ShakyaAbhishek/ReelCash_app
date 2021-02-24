/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  Text,
  Image,
  ImageBackground,
  LogBox
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import SplashScreen from "react-native-splash-screen";
import Constants from "./src/constants";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "react-native-loading-spinner-overlay";
import { persistStore } from "redux-persist";
import sagas from "./src/segas";
import reducer from "./src/reducers";
import { createStore, applyMiddleware } from "redux";
import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from "@react-native-community/async-storage";
import { ScaledSheet } from "react-native-size-matters";
import Toast from 'react-native-toast-message';
import {Loader} from './src/components';
LogBox.ignoreAllLogs();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(sagas);
const slides = [
  {
    key: 1,
    title: `A multi species tournamet platform that fairly and accurately scores
    scores North America's most popular gamefish for local, regional, and
    International competition.`,
  },
  {
    key: 2,
    title: `A multi species tournamet platform that fairly and accurately scores
    scores North America's most popular gamefish for local, regional, and
    International competition.`,
  },
  {
    key: 3,
    title: `A multi species tournamet platform that fairly and accurately scores
    scores North America's most popular gamefish for local, regional, and
    International competition.`,
  },
];

const App: () => React$Node = () => {
  const [screenName, setScreenName] = useState(false);
  useEffect(async () => {
    try {
      let data = await AsyncStorage.getItem("WelcomeScreen");
      if (data !== null) {
        setScreenName(true);
      } else {
        setScreenName(false);
      }
    } catch (e) {
      console.warn(e);
    }
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.welRenderWrapper}>
        <Text style={styles.welTitletext}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  const _onDone = async () => {
    try {
      await AsyncStorage.setItem("WelcomeScreen", "true");
      setScreenName(true);
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <>
      {screenName === true ? (
        <NavigationContainer>
          <StatusBar
            backgroundColor={Constants.Colors.DarkGrayColor}
            barStyle="light-content"
          />
          <SafeAreaProvider>
            <View style={styles.container}>
              <Provider store={store}>
                <PersistGate
                  loading={<Spinner visible={true} />}
                  persistor={persistor}
                >
                  <Routes />
                  <Loader />
                  <Toast ref={(ref) => Toast.setRef(ref)} />
                </PersistGate>
              </Provider>
            </View>
          </SafeAreaProvider>
        </NavigationContainer>
      ) : (
        <ImageBackground
          source={Constants.Images.WelcomeBackground}
          style={{ flex: 1 }}
        >
          <View style={styles.welcomeTextWrapper}>
            <Text style={styles.welcometextStyle}>Welcome</Text>
          </View>
          <AppIntroSlider
            renderItem={_renderItem}
            dotStyle={styles.welcomeDotStyle}
            activeDotStyle={styles.activeWelcomeDotStyle}
            data={slides}
            onDone={_onDone}
          />
          <View style={styles.welcomeLogoStyle}>
            <Image source={Constants.Images.Icon} />
          </View>
        </ImageBackground>
      )}
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  messageStyle: {
    color: "white",
    fontSize: 16,
    fontFamily: "ProximaNova-Regular",
  },
  containerStyle: {
    backgroundColor: "black",
    paddingBottom: 8,
  },
  errorStyle: {
    backgroundColor: "red",
    paddingBottom: 8,
  },
  welcomeLogoStyle: {
    position: "absolute",
    bottom: "15%",
    left: "50%",
    right: "50%",
    alignItems: "center",
  },
  welcomeDotStyle: {
    backgroundColor: "gray",
    height: "14@ms",
    width: "14@ms",
    borderRadius: "7@ms",
    borderColor: Constants.Colors.GreenColor,
    borderWidth:1,
  },
  activeWelcomeDotStyle: {
    backgroundColor: Constants.Colors.GreenColor,
    height: "14@ms",
    width: "14@ms",
    borderRadius: "7@ms",
  },
  welcometextStyle: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 28,
    fontWeight: "600",
    color: "white",
  },
  welcomeTextWrapper: { position: "absolute", top: "15%", alignSelf: "center" },
  welRenderWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: "25@ms",
  },
  welTitletext: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 18,
    color: Constants.Colors.WhiteColor,
    textAlign: "center",
  },
});

export default App;


// import React, { Component } from 'react';
// import { StyleSheet, Button, Text, View, TextInput, Platform } from 'react-native';
// import SmsRetriever from 'react-native-sms-retriever';
// import SplashScreen from "react-native-splash-screen";

// const WELCOME_TEXT = 'React Native SMS Retriever';
// const PHONE_NUMBER_TITLE = 'Request phone number';
// const ADD_SMS_LISTENER_TITLE = 'Add SMS listener';

// type Props = {};
// export default class App extends Component<Props> {
  

//   componentDidMount(){
//     SplashScreen.hide();
//     this._onSmsListenerPressed();
//   }
//   // Actions
  
//   _onPhoneNumberPressed = async () => {
//     try {
//       const phoneNumber = await SmsRetriever.requestPhoneNumber();
//       alert(`Phone Number: ${phoneNumber}`);
//     } catch (error) {
//       alert(`Phone Number Error: ${JSON.stringify(error)}`);
//     }
//   };
  
//   _onSmsListenerPressed = async () => {
//     try {
//       const registered = await SmsRetriever.startSmsRetriever();
//       if (registered) {
//         SmsRetriever.addSmsListener(event => {
//           alert(event.message);
//           SmsRetriever.removeSmsListener();
//         }); 
//       }
//     } catch (error) {
//       console.log(JSON.stringify(error));
//     }
//   };
  
//   // Handlers
  
//   _onReceiveSms = (event) => {
//     alert(event.message);
//     // SmsRetriever.removeSmsListener();
//   };
  
//   // Render
  
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>{WELCOME_TEXT}</Text>
        
//         <View style={styles.space} />
        
//         <Button 
//           style={styles.button} 
//           title={PHONE_NUMBER_TITLE}
//           onPress={this._onPhoneNumberPressed}
//         />
//         <View style={styles.space} />

//         <TextInput placeholder={'otp fdsafsdfas  '} textContentType={'oneTimeCode'} />
        
//         <View style={styles.space} />
        
//         <Button
//           style={styles.button}
//           title={ADD_SMS_LISTENER_TITLE}
//           onPress={this._onSmsListenerPressed}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center'
//   },
//   space: {
//     margin: 20
//   }
// });