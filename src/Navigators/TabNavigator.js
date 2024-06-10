import React from "react";
import { FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import MapScreen from "../Screens/MapScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import Explore from "../Screens/ListPages/Explore";
import Categories from "../Screens/ListPages/Categories";
import ProjectList from "../Screens/ListPages/ProjectList";
import RoutesList from "../Screens/ListPages/RoutesList";
import SearchList from "../Screens/ListPages/SearchList";
import { PngTree } from "../../Assets/Images/pngtree.png";
import BusImg from "../Assets/Images/B3.svg"
import STRING from "../Services/Constants/STRINGS";
import ExploreGrid from "../Screens/ListPages/ExploreGrid";
import AllRoutesSearch from "../Screens/ListPages/AllRoutesSearch";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, presentation: "modal",
        activeTintColor: COLOR.themeBlue, // Set the active tab color
        inactiveTintColor: COLOR.black, // Set the inactive tab color
        labelStyle: { paddingBottom: 4 }, // Add padding to the tab labels
      }}
    >
      <Tab.Screen
        name={t("SCREEN.HOME")}
        component={HomeScreen}
        options={{
          tabBarLabel: `${t("SCREEN.HOME")}`,
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
        name={t("SCREEN.CITIES")}
        component={Explore}
        options={{
          pageName: `${t("SCREEN.EXPLORE")}`,
          tabBarLabel: `${t("SCREEN.CITIES")}`,
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
        name={t("SCREEN.ROUTES")}
        component={AllRoutesSearch}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../Assets/Images/Bus1_png_high.png")}
              style={{ width: 40, height: 40 }}
            />
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name={t("SCREEN.CATEGORIES")}
        component={Categories}
        options={{
          pageName: `${t("SCREEN.CATEGORIES")}`,
          tabBarLabel: `${t("SCREEN.CATEGORIES")}`,
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
        name={t("SCREEN.MAP_SCREEN")}
        component={MapScreen}
        options={{
          tabBarLabel: `${t("SCREEN.MAP")}`,
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
