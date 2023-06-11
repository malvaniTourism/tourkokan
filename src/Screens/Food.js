import React, { useEffect } from "react";
import { View } from "react-native";
import TopComponent from "../Components/Common/TopComponent";
import Loader from "../Components/Customs/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Food = ({ navigation, ...props }) => {

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

  return (
    <View>
      <Loader />
      <TopComponent navigation={navigation} />
    </View>
  );
};

export default Food;
