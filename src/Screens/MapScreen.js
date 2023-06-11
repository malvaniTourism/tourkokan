import React, { useEffect } from "react";
import { View } from "react-native";
// import MapView from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";

const MapScreen = () => {

  useEffect(() => {
    checkLogin();
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
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
    </View>
  );
};

export default MapScreen;
