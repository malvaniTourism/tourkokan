import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../Screens/Profile";
import Settings from "../Screens/Settings";
import SearchList from "../Screens/SearchList";
import TabNavigator from "./TabNavigator";
import MapScreen from "../Screens/MapScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="All Routes" component={SearchList} />
      {/* <Drawer.Screen name="Routes Map" component={MapScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
