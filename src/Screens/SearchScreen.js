import React, { useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = () => {

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

  return <View></View>;
};

export default SearchScreen;
