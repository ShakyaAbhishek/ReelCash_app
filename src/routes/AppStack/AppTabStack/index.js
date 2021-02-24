import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Constants from "../../../constants";
import DeviceInfo from "react-native-device-info";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";

import {
  HomeScreen,
  LiveWellScreen,
  EventsCalanderScreen,
  ProfileScreen,
  FishCalculatorScreen,
  LoginScreen,
} from "../../../containers";

const Tab = createBottomTabNavigator();

const hasNotch = DeviceInfo.hasNotch();

const styles = ScaledSheet.create({
  tabBar: {
    backgroundColor: "transparent",
  },
  tabStyle: {
    backgroundColor: "transparent",
    position: "relative",
    alignSelf: "center",
    justifyContent: "center",
  },
  customTab: {
    height: Platform.OS === "ios" ? "50@ms" : "58@ms",
    position: "relative",
    width: "100%",
    // backgroundColor:'green',
    alignSelf: "center",
    // backgroundColor: Constants.Colors.DarkGrayColor,
    bottom: Platform.OS === "ios" ? (hasNotch ? "19@ms" : "5@ms") : "9@ms",
    justifyContent: "center",
    alignItems: "center",
  },
  mainTabContainer: {
    position: "relative",
    alignSelf: "center",
    paddingTop: "10@ms",
    bottom: 0,
    paddingHorizontal: "10@ms",
    flexDirection: "row",
    height: Platform.OS === "ios" ? "65@ms" : "65@ms",
    width: "100%",
    // backgroundColor:'yellow',
    backgroundColor: Constants.Colors.DarkGrayColor,
  },
  tabWrapper: {
    height: "50@ms",
    width: "100@ms",
    // backgroundColor:'red',
  },
  tabWrapper1: {
    flex: 1,
    justifyContent: "center",
  },
  alignCenter: {
    alignItems: "center",
  },
  alignFlexEnd: {
    alignItems: "flex-end",
  },
  flexRow: {
    flexDirection: "row",
  },
  flexColumn: {
    flexDirection: "column",
  },
  selectedTab: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "8@ms",
    paddingHorizontal: "12@ms",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: "20@ms",
  },
  tabImageWrapper: {
    height: "16@ms",
    width: "20@ms",
    marginRight: "10@ms",
  },
  backgroundColorGreen: {
    backgroundColor: Constants.Colors.GreenColor,
  },
  backgroundColorWhite: {
    backgroundColor: Constants.Colors.WhiteColor,
  },
  selectedTabText: {
    fontFamily: "ProximaNova-Regular",
    fontSize: 10,
    color: Constants.Colors.GreenColor,
    paddingTop: "3@ms",
    paddingLeft: "5@ms",
  },
});

export default function TabStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "red",
        style: styles.tabBar,
        tabStyle: styles.tabStyle,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="LiveWell" component={LiveWellScreen} />
      <Tab.Screen name="Fish Calculator" component={FishCalculatorScreen} />
      <Tab.Screen name="Events" component={EventsCalanderScreen} />
    </Tab.Navigator>
  );
}

const MyTabBar = ({ state, descriptors, navigation }) => {
  const [usersToken, setUsersToken] = useState("");
  const user = useSelector((state) => state.user);


  useEffect(() => {
    console.warn("appTabstack", JSON.stringify(user, undefined, 2));
    // alert("dd");
    const { userToken } = user;
    if (userToken != "") {
      setUsersToken(userToken);
    } else {
      setUsersToken('');
    }
  }, [user]);


  return (
    <View style={styles.mainTabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          // console.warn("fjffjfjf", route);
          if (route.name == "LiveWell") {
            if (usersToken == "") {
              navigation.navigate("LoginScreen");
            } else {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }
          } else if (route.name == "Events") {
            if (usersToken == "") {
              navigation.navigate("LoginScreen");
            } else {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }
          } else {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            // onLongPress={onLongPress}
            style={{
              flex: 1,
              bottom: 0,
              padding: 10,
            }}
          >
            <View style={styles.customTab}>
              {label === "Home" ? (
                <View style={styles.tabWrapper}>
                  <View
                    style={[
                      styles.tabWrapper1,
                      isFocused ? styles.alignFlexEnd : styles.alignCenter,
                    ]}
                  >
                    {isFocused ? (
                      <View
                        style={[
                          styles.selectedTab,
                          isFocused && styles.flexRow,
                        ]}
                      >
                        <Image source={Constants.Images.HomeGreenIcon} />
                        <Text style={styles.selectedTabText}>Home</Text>
                      </View>
                    ) : (
                        <Image
                          style={{ tintColor: Constants.Colors.TextGrayColor }}
                          source={Constants.Images.HomeGreenIcon}
                        />
                      )}
                  </View>
                </View>
              ) : label === "LiveWell" ? (
                <View style={styles.tabWrapper}>
                  <View
                    style={[
                      styles.tabWrapper1,
                      isFocused ? styles.alignFlexEnd : styles.alignCenter,
                    ]}
                  >
                    {isFocused ? (
                      <View
                        style={[
                          styles.selectedTab,
                          isFocused && styles.flexRow,
                        ]}
                      >
                        <Image
                          style={{ tintColor: Constants.Colors.GreenColor }}
                          source={Constants.Images.FishGrayIcon}
                        />
                        <Text style={styles.selectedTabText}>LiveWell</Text>
                      </View>
                    ) : (
                        <Image source={Constants.Images.FishGrayIcon} />
                      )}
                  </View>
                </View>
              ) : label === "Events" ? (
                <View style={styles.tabWrapper}>
                  <View
                    style={[
                      styles.tabWrapper1,
                      isFocused ? styles.alignFlexEnd : styles.alignCenter,
                    ]}
                  >
                    {isFocused ? (
                      <View
                        style={[
                          styles.selectedTab,
                          isFocused && styles.flexRow,
                        ]}
                      >
                        <Image source={Constants.Images.CalanderGreenIcon} />
                        <Text style={styles.selectedTabText}>Events</Text>
                      </View>
                    ) : (
                        <Image
                          style={{ tintColor: Constants.Colors.TextGrayColor }}
                          source={Constants.Images.CalanderGreenIcon}
                        />
                      )}
                  </View>
                </View>
              ) : (
                      <View style={styles.tabWrapper}>
                        <View
                          style={[
                            styles.tabWrapper1,
                            isFocused ? styles.alignCenter : styles.alignCenter,
                          ]}
                        >
                          {isFocused ? (
                            <View
                              style={[
                                styles.selectedTab,
                                isFocused && styles.flexRow,
                              ]}
                            >
                              <Image
                                style={{ tintColor: Constants.Colors.GreenColor }}
                                source={Constants.Images.GreenFishAncorLogo}
                              />
                              <Text style={styles.selectedTabText}>
                                Fish Calculator
                        </Text>
                            </View>
                          ) : (
                              <Image
                                style={{ tintColor: Constants.Colors.GrayColor }}
                                source={Constants.Images.GreenFishAncorLogo}
                              />
                            )}
                        </View>
                      </View>
                    )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
