import React, { useState, lazy, Suspense } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigator from "./DrawerNavigator";
import TabNavigator from "./TabNavigator";

const SignIn = lazy(() => import("../Screens/AuthScreens/SignIn"));
const SignUp = lazy(() => import("../Screens/AuthScreens/SignUp"));
const SearchList = lazy(() => import("../Screens/SearchList"));
const RoutesList = lazy(() => import("../Screens/RoutesList"));
const BusTimings = lazy(() => import("../Screens/BusTimings"));
const CategoryProjects = lazy(() => import("../Screens/CategoryProjects"));
const CityDetails = lazy(() => import("../Screens/CityDetails"));
const CityList = lazy(() => import("../Screens/ListPages/CityList"));
const PlaceList = lazy(() => import("../Screens/ListPages/PlaceList"));
const ProjectList = lazy(() => import("../Screens/ListPages/ProjectList"));
const StopList = lazy(() => import("../Screens/ListPages/StopList"));
const EmailSignIn = lazy(() => import("../Screens/AuthScreens/EmailSignIn"));
const VerifyOTP = lazy(() => import("../Screens/AuthScreens/VerifyOTP"));
const PlaceDetails = lazy(() => import("../Screens/PlaceDetails"));
const SearchPlace = lazy(() => import("../Screens/SearchPlace"));

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          // Screens for logged in users
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Root"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
          </Stack.Group>
        ) : (
          // Auth screens
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
          </Stack.Group>
        )}
        {/* Common modal screens */}
        <Stack.Group
          screenOptions={{ headerShown: false, presentation: "modal" }}
        >
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SearchList" component={SearchList} />
          <Stack.Screen name="RoutesList" component={RoutesList} />
          <Stack.Screen name="BusTimings" component={BusTimings} />
          <Stack.Screen name="Login" component={SignIn} />
          <Stack.Screen name="EmailSignIn" component={EmailSignIn} />
          <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="CategoryProjects" component={CategoryProjects} />
          <Stack.Screen name="CityList" component={CityList} />
          <Stack.Screen name="PlaceList" component={PlaceList} />
          <Stack.Screen name="ProjectList" component={ProjectList} />
          <Stack.Screen name="StopList" component={StopList} />
          <Stack.Screen name="CityDetails" component={CityDetails} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
          <Stack.Screen name="SearchPlace" component={SearchPlace} />
          {/* <Stack.Screen name="Invite" component={Invite} /> */}
          {/* <Stack.Screen name="Feed" component={Feed} /> */}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
    </Suspense>
  );
};

export default StackNavigator;
