import React from "react";
import { ImageBackground, StatusBar, View } from "react-native";
import styles from "./Styles";
import FontIcons from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { Image } from "@rneui/themed";
import { PngTree } from "../../Assets/Images/pngtree.png";

const TopComponent = ({ navigation }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  const openProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.topComponent}>
      <StatusBar backgroundColor={COLOR.themeDarkGreen} />
      <View style={styles.topMenu}>
        <Ionicons
          name="menu"
          color={COLOR.black}
          size={DIMENSIONS.userIconSize}
          style={styles.userIcon}
          onPress={() => openDrawer()}
        />
        <FontIcons
          name="user-circle"
          color={COLOR.black}
          size={DIMENSIONS.userIconSize}
          style={styles.userIcon}
          onPress={() => openProfile()}
        />
      </View>
      <Image
        source={require("../../Assets/Images/pngtree.png")}
        style={{ height: 220, width: 400 }}
      />
    </View>
  );
};

export default TopComponent;
