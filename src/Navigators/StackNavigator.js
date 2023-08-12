import React, { useState, lazy, Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigator from "./DrawerNavigator";
import TabNavigator from "./TabNavigator";
import GlobalText from "../Components/Customs/Text";
import STRING from "../Services/Constants/STRINGS";

const SignIn = lazy(() => import("../Screens/AuthScreens/SignIn"));
const SignUp = lazy(() => import("../Screens/AuthScreens/SignUp"));
const SearchList = lazy(() => import("../Screens/ListPages/SearchList"));
const RoutesList = lazy(() => import("../Screens/ListPages/RoutesList"));
const BusTimings = lazy(() => import("../Screens/BusTimings"));
const CategoryProjects = lazy(() => import("../Screens/CategoryProjects"));
const CityDetails = lazy(() => import("../Screens/DetailPages/CityDetails"));
const CityList = lazy(() => import("../Screens/ListPages/CityList"));
const Explore = lazy(() => import("../Screens/ListPages/Explore"));
const ProjectList = lazy(() => import("../Screens/ListPages/ProjectList"));
const CityPlaceSearch = lazy(() => import("../Screens/ListPages/CityPlaceSearch"));
const StopList = lazy(() => import("../Screens/ListPages/StopList"));
const EmailSignIn = lazy(() => import("../Screens/AuthScreens/EmailSignIn"));
const VerifyOTP = lazy(() => import("../Screens/AuthScreens/VerifyOTP"));
const PlaceDetails = lazy(() => import("../Screens/DetailPages/PlaceDetails"));
const ProjectDetails = lazy(() => import("../Screens/DetailPages/ProjectDetails"));
const StopDetails = lazy(() => import("../Screens/DetailPages/StopDetails"));
const SearchPlace = lazy(() => import("../Screens/SearchPlace"));
const MapScreen = lazy(() => import("../Screens/MapScreen"));
const ProfileView = lazy(() => import("../Screens/ProfileView"));
const Profile = lazy(() => import("../Screens/Profile"));

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Suspense fallback={<GlobalText text={STRING.ALERT.LOADING} />}>
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          // Screens for logged in users
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name={STRING.SCREEN.ROOT}
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
          </Stack.Group>
        ) : (
          // Auth screens
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name={STRING.SCREEN.LOGIN} component={SignIn} />
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
          <Stack.Screen name={STRING.SCREEN.SEARCH_LIST} component={SearchList} />
          <Stack.Screen name={STRING.SCREEN.ROUTES_LIST} component={RoutesList} />
          <Stack.Screen name={STRING.SCREEN.BUS_TIMINGS} component={BusTimings} />
          <Stack.Screen name={STRING.SCREEN.LOGIN} component={SignIn} />
          <Stack.Screen name={STRING.SCREEN.EMAIL_SIGN_IN} component={EmailSignIn} />
          <Stack.Screen name={STRING.SCREEN.VERIFY_OTP} component={VerifyOTP} />
          <Stack.Screen name={STRING.SCREEN.SIGN_UP} component={SignUp} />
          <Stack.Screen name={STRING.SCREEN.CATEGORY_PROJECTS} component={CategoryProjects} />
          <Stack.Screen name={STRING.SCREEN.CITY_LIST} component={CityList} />
          <Stack.Screen name={STRING.SCREEN.EXPLORE} component={Explore} />
          <Stack.Screen name={STRING.SCREEN.PROJECT_LIST} component={ProjectList} />
          <Stack.Screen name={STRING.SCREEN.STOP_LIST} component={StopList} />
          <Stack.Screen name={STRING.SCREEN.CITY_DETAILS} component={CityDetails} />
          <Stack.Screen name={STRING.SCREEN.PLACE_DETAILS} component={PlaceDetails} />
          <Stack.Screen name={STRING.SCREEN.PROJECT_DETAILS} component={ProjectDetails} />
          <Stack.Screen name={STRING.SCREEN.STOP_DETAILS} component={StopDetails} />
          <Stack.Screen name={STRING.SCREEN.SEARCH_PLACE} component={SearchPlace} />
          <Stack.Screen name={STRING.SCREEN.MAP_SCREEN} component={MapScreen} />
          <Stack.Screen name={STRING.SCREEN.CITY_PLACE_SEARCH} component={CityPlaceSearch} />
          <Stack.Screen name={STRING.SCREEN.PROFILE_VIEW} component={ProfileView} />
          <Stack.Screen name={STRING.SCREEN.PROFILE} component={Profile} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
    </Suspense>
  );
};

export default StackNavigator;
