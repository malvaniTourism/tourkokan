import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../Screens/Profile";
import Settings from "../Screens/Settings";
import SearchList from "../Screens/ListPages/SearchList";
import TabNavigator from "./TabNavigator";
import Pricing from "../Screens/Pricing";
import ContactUs from "../Screens/ContactUs";
import ProfileView from "../Screens/ProfileView";
import Weather from "../Screens/Weather";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      {/* <Drawer.Screen name="ProfileView" component={ProfileView} /> */}
      {/* <Drawer.Screen name="Settings" component={Settings} /> */}
      {/* <Drawer.Screen name="All Routes" component={SearchList} /> */}
      <Drawer.Screen name="Pricing" component={Pricing} />
      <Drawer.Screen name="Contact Us" component={ContactUs} />
      <Drawer.Screen name="Emergency" component={ContactUs} />
      <Drawer.Screen name="Weather" component={Weather} />
      {/* <Drawer.Screen name="Routes Map" component={MapScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
