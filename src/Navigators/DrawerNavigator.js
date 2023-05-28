import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../Screens/Profile";
import Settings from "../Screens/Settings";
import SearchList from "../Screens/SearchList";
import TabNavigator from "./TabNavigator";
import MapScreen from "../Screens/MapScreen";
import SignIn from "../Screens/AuthScreens/SignIn";
import SignUp from "../Screens/AuthScreens/SignUp";
import EmailSignIn from "../Screens/AuthScreens/EmailSignIn";
import VerifyOTP from "../Screens/AuthScreens/VerifyOTP";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Search List" component={SearchList} />
      <Drawer.Screen name="Map Screen" component={MapScreen} />
      <Drawer.Screen name="Login" component={SignIn} />
      <Drawer.Screen name="EmailSignIn" component={EmailSignIn} />
      <Drawer.Screen name="VerifyOTP" component={VerifyOTP} />
      <Drawer.Screen name="SignUp" component={SignUp} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
