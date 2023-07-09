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

const TopComponent = ({ navigation, openLocationSheet }) => {
  const [bannerImages, setBannerImages] = useState([
    "https://c4.wallpaperflare.com/wallpaper/766/970/409/cities-city-building-cityscape-wallpaper-preview.jpg",
    "https://c4.wallpaperflare.com/wallpaper/631/683/713/nature-bridge-sky-city-wallpaper-preview.jpg",
    "https://c4.wallpaperflare.com/wallpaper/977/138/381/tbilisi-georgia-wallpaper-preview.jpg",
    "https://4kwallpapers.com/images/walls/thumbs_3t/912.jpg",
  ]);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const openProfile = () => {
    navigateTo(navigation, "Profile");
  };

  return (
    <View style={styles.topComponent}>
      <StatusBar backgroundColor={COLOR.themeComicBlue} />
      <View style={styles.topMenu}>
        <View style={styles.locationView}>
          <Ionicons
            name="menu"
            color={COLOR.white}
            size={DIMENSIONS.userIconSize}
            style={{ marginRight: 20 }}
            onPress={() => openDrawer()}
          />
          <GlobalText text={"Devgad"} style={styles.fontBold} />
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
      <Banner bannerImages={bannerImages} />
      {/* <Image
        source={require("../../Assets/Images/pngtree.png")}
        style={{ height: 220, width: 400 }}
      /> */}
    </View>
  );
};

export default TopComponent;
