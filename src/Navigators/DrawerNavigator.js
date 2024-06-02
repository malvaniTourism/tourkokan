import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import Pricing from "../Screens/Pricing";
import ContactUs from "../Screens/ContactUs";
import Weather from "../Screens/Weather";
import STRING from "../Services/Constants/STRINGS";
import Emergency from "../Screens/Emergency";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name={STRING.SCREEN.HOME} component={TabNavigator} />
      {/* <Drawer.Screen name={STRING.SCREEN.REQUEST_PAID_ADVERTISEMENT} component={Pricing} /> */}
      <Drawer.Screen name={STRING.SCREEN.EMERGENCY} component={Emergency} />
      <Drawer.Screen name={STRING.SCREEN.CONTACT_US} component={ContactUs} />
      {/* <Drawer.Screen name={STRING.SCREEN.WEATHER} component={Weather} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
