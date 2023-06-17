import React, { useEffect } from "react";
import { View } from "react-native";
// import MapView from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkLogin, goBackHandler } from "../Services/CommonMethods";

const MapScreen = ({ navigation }) => {

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    return () => {
      backHandler.remove()
    }
  }, [])

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
