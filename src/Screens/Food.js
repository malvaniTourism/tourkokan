import React, { useEffect } from "react";
import { View } from "react-native";
import TopComponent from "../Components/Common/TopComponent";
import Loader from "../Components/Customs/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkLogin, goBackHandler } from "../Services/CommonMethods";

const Food = ({ navigation, ...props }) => {

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    return () => {
      backHandler.remove()
    }
  }, [])

  return (
    <View>
      <Loader />
      <TopComponent navigation={navigation} />
    </View>
  );
};

export default Food;
