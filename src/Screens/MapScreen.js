import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// import MapView from 'react-native-maps';
import Loader from "../Components/Customs/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkLogin, goBackHandler } from "../Services/CommonMethods";
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageZoomViewer from '../Components/Customs/ImageZoomViewer';
import TopComponent from "../Components/Common/TopComponent";

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
      {/* <Loader />
      <TopComponent navigation={navigation} /> */}
      <View style={{ flex: 1 }}>
        {/* Your other components */}
        <ImageZoomViewer />
      </View>
    </View>
  );
};

export default MapScreen;
