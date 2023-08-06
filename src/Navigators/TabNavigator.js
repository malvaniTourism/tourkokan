import React from "react";
import { FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import MapScreen from "../Screens/MapScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import Explore from "../Screens/ListPages/Explore";
import ProjectList from "../Screens/ListPages/ProjectList";
import RoutesList from "../Screens/ListPages/RoutesList";
import SearchList from "../Screens/SearchList";
import { PngTree } from "../../Assets/Images/pngtree.png";
import SvgUri from 'react-native-svg-uri';
import BusImg from "../Assets/Images/B3.svg"

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
      tabBarOptions={{
        activeTintColor: COLOR.themeComicBlue, // Set the active tab color
        inactiveTintColor: COLOR.black, // Set the inactive tab color
        labelStyle: { paddingBottom: 4 }, // Add padding to the tab labels
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              color={COLOR.black}
              size={DIMENSIONS.iconSize}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cities"
        component={Explore}
        options={{
          pageName: "Cities",
          tabBarLabel: "Cities",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="location-outline"
              color={COLOR.black}
              size={DIMENSIONS.iconSize}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Routes"
        component={SearchList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../Assets/Images/Bus1_png_high.png')}
              style={{ width: 40, height: 40 }}
            />
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name="Places"
        component={Explore}
        options={{
          pageName: "Places",
          tabBarLabel: "Places",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="md-person-circle-sharp"
              color={COLOR.black}
              size={DIMENSIONS.iconSize}
            />
          ),
        }}
      />

      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="map-outline"
              color={COLOR.black}
              size={DIMENSIONS.iconSize}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
