import React, { useEffect } from "react";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../Components/Common/Header";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BusTimings = ({ navigation }) => {

  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    if (
      (await AsyncStorage.getItem("access_token")) == null ||
      (await AsyncStorage.getItem("access_token")) == ""
    ) {
      navigation.navigate("Login");
    }
  }

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Header
        name={"Bus Timings"}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            color={COLOR.black}
            size={DIMENSIONS.userIconSize}
            onPress={() => goBack()}
          />
        }
      />
    </View>
  );
};

export default BusTimings;
