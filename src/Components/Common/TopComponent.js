import React, { useState } from "react";
import { ImageBackground, StatusBar, View, Text } from "react-native";
import styles from "./Styles";
import FontIcons from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { Image } from "@rneui/themed";
import { PngTree } from "../../Assets/Images/pngtree.png";
import Banner from "../Customs/Banner";
import { navigateTo } from "../../Services/CommonMethods";
import GlobalText from "../Customs/Text";
import STRING from "../../Services/Constants/STRINGS";

const TopComponent = ({ navigation, openLocationSheet, currentCity, gotoProfile }) => {

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const openProfile = () => {
    gotoProfile()
  };

  return (
    <View style={styles.topComponent}>
      <StatusBar backgroundColor={COLOR.logoBlue} />
      <View style={styles.topMenu}>
        <View style={styles.locationView}>
          <Ionicons
            name="menu"
            color={COLOR.white}
            size={DIMENSIONS.userIconSize}
            style={{ marginRight: 20 }}
            onPress={() => openDrawer()}
          />
          <GlobalText text={currentCity} style={styles.whiteBold} />
          <Ionicons
            name="chevron-down"
            color={COLOR.white}
            size={DIMENSIONS.iconMedium}
            onPress={() => openLocationSheet()}
          />
        </View>
        <FontIcons
          name="user-circle"
          color={COLOR.white}
          size={DIMENSIONS.userIconSize}
          style={styles.userIcon}
          onPress={() => openProfile()}
        />
      </View>
    </View>
  );
};

export default TopComponent;
