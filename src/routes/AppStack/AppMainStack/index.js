import React from "react";
import { Easing } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from "@react-navigation/stack";
import {
  HomeScreen,
  LiveWellScreen,
  EventsCalanderScreen,
  ProfileScreen,
  TournamentDetailScreen,
  MyStatisticsScreen,
  OperatorScreen,
  JoinTournamentScreen,
  FishDetailScreen,
  TopPlayersScreen,
  UploadImageScreen,
  FishDetailFormScreen,
  CommentsScreen,
  EditProfileScreen,
  FishSpeciesScreen,
  SelectTournamentScreen,
  TransactionScreen,
  ConfirmCatchScreen,
  FishCalculatorScreen,
  LocationScreen,
  //auth screens
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  WelcomeScreen,
  SplashScreens,
} from "../../../containers";
import TabStack from "../AppTabStack";
import ViewSubmission from "../../../containers/AppScreen/ViewSubmission/ViewSubmission";
const Stack = createStackNavigator();

function AppMainStack() {
  return (
    <Stack.Navigator initialRouteName={"HomeScreen"}
      screenOptions={{ gestureDirection: 'horizontal', ...TransitionPresets.SlideFromRightIOS }}
    >
      {/* <Stack.Screen
        name="SplashScreen"
        component={SplashScreens}
        options={{ header: () => null }}
      /> */}
      <Stack.Screen
        name="HomeScreen"
        component={TabStack}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="LiveWellScreen"
        component={LiveWellScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="EventsCalanderScreen"
        component={EventsCalanderScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="TournamentDetailScreen"
        component={TournamentDetailScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="MyStatisticsScreen"
        component={MyStatisticsScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="OperatorScreen"
        component={OperatorScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="JoinTournamentScreen"
        component={JoinTournamentScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="FishDetailScreen"
        component={FishDetailScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="TopPlayersScreen"
        component={TopPlayersScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="UploadImageScreen"
        component={UploadImageScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="FishDetailFormScreen"
        component={FishDetailFormScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="FishSpeciesScreen"
        component={FishSpeciesScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="SelectTournamentScreen"
        component={SelectTournamentScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ConfirmCatchScreen"
        component={ConfirmCatchScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="FishCalculatorScreen"
        component={FishCalculatorScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{ header: () => null }}
      />
      {/* auth Screens */}
      {/* <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ header: () => null }}
      /> */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ViewSubmission"
        component={ViewSubmission}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}

export default AppMainStack;
