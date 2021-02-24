import React from "react";
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from "@react-navigation/stack";
import { LoginScreen, RegisterScreen, WelcomeScreen, SplashScreens } from "../../containers";
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      gestureDirection:'horizontal',
      ...TransitionPresets.SlideFromRightIOS

    }}>
      <Stack.Screen
        name="SplashScreens"
        component={SplashScreens}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ header: () => null }}
      />
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
    </Stack.Navigator>
  );
}

export default AuthStack;
