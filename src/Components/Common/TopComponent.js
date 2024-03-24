import React, { useState } from "react";
import { ImageBackground, StatusBar, View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Styles";
import FontIcons from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { PngTree } from "../../Assets/Images/pngtree.png";
import Banner from "../Customs/Banner";
import { navigateTo } from "../../Services/CommonMethods";
import GlobalText from "../Customs/Text";
import STRING from "../../Services/Constants/STRINGS";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Path from "../../Services/Api/BaseUrl";

const TopComponent = ({ navigation, openLocationSheet, currentCity, gotoProfile, profilePhoto }) => {

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const openProfile = () => {
    gotoProfile()
  };

  return (
    <View style={styles.topComponent}>
      <StatusBar backgroundColor={COLOR.white} />
      <View style={styles.topMenu}>
        <View style={styles.locationView}>
          <Ionicons
            name="menu"
            color={COLOR.black}
            size={DIMENSIONS.userIconSize}
            style={{ marginRight: 20 }}
            onPress={() => openDrawer()}
          />
          <TouchableOpacity onPress={() => openLocationSheet()} style={styles.locationPill}>
            <MaterialIcons
              name="location-pin"
              color={COLOR.themeBlue}
              size={DIMENSIONS.iconMedium}
              style={styles.routeCardIcons}
            />
            <GlobalText text={currentCity} style={{ fontWeight: "500" }} />
            <Ionicons
              name="chevron-down"
              color={COLOR.themeBlue}
              size={DIMENSIONS.iconMedium}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => openProfile()} style={styles.profileIconView}>
          <Image source={{ uri: Path.FTP_PATH + profilePhoto }} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopComponent;
