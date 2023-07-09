import React from "react";
import { FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import MapScreen from "../Screens/MapScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import Exlore from "../Screens/ListPages/Explore";
import ProjectList from "../Screens/ListPages/ProjectList";
import RoutesList from "../Screens/RoutesList";
import SearchList from "../Screens/SearchList";
import { PngTree } from "../../Assets/Images/pngtree.png";
import SvgUri from 'react-native-svg-uri';
import BusImg from "../Assets/Images/B3.svg"

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
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
      {/* <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Fontisto
              name="compass-alt"
              color={COLOR.black}
              size={DIMENSIONS.iconSize}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Exlore"
        component={Exlore}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            // <Ionicons
            //   name="location-outline"
            //   color={COLOR.black}
            //   size={DIMENSIONS.iconSize}
            // />
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
            // <Ionicons
            //   name="md-bus"
            //   color={COLOR.black}
            //   size={DIMENSIONS.iconSize + 15}
            // />
            // <SvgUri
            //   width={35}
            //   height={35}
            //   // source={require('../Assets/Images/simp.svg')}
            //   source={require('../Assets/Images/Bus1_png_high.svg')}
            // />
            <Image
              source={require('../Assets/Images/Bus1_png_high.png')}
              style={{ width: 40, height: 40 }}
            />
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name="ProjectList"
        component={ProjectList}
        options={{
          tabBarLabel: "Bussiness",
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

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    // backgroundColor: 'red',
    aspectRatio: 1,
    width: '100%',
    // flex: 1,
  },
});