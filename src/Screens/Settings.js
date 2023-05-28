import React from "react";
import { View } from "react-native";
import TopComponent from "../Components/Common/TopComponent";
import Loader from "../Components/Customs/Loader";

const Settings = ({ navigation, ...props }) => {
  return (
    <View>
      <Loader />
      <TopComponent navigation={navigation} />
    </View>
  );
};

export default Settings;
