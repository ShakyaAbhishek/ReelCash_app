import React, { useEffect, useState } from "react";
import { createStackNavigator, CardStyleInterpolators, TransitionPresets  } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack/AppMainStack";

const Stack = createStackNavigator();
const config = {
  animation: 'timing',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
let Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureDirection:'horizontal',
    ...TransitionPresets.SlideFromRightIOS}} animation="fade" headerMode='screen'>
      {/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}
          <Stack.Screen name="AppStack" component={AppStack} />
      {/* {screenName == false ? (
        <>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="AppStack" component={AppStack} />
        </>
      ) : (
        <Stack.Screen name="AppStack" component={AppStack} />
      )} */}
    </Stack.Navigator>
  );
};

export default Navigator;
