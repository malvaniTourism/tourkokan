import React, { useEffect } from "react";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../Components/Common/Header";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler } from "../Services/CommonMethods";

const BusTimings = ({ navigation }) => {

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    return () => {
      backHandler.remove()
    }
  }, [])

  return (
    <View>
      <Header
        name={"Bus Timings"}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            color={COLOR.white}
            size={DIMENSIONS.userIconSize}
            onPress={() => backPage(navigation)}
          />
        }
      />
    </View>
  );
};

export default BusTimings;
