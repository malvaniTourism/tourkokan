import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
// import MapView from 'react-native-maps';
import Loader from "../Components/Customs/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkLogin, goBackHandler } from "../Services/CommonMethods";
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageZoomViewer from '../Components/Customs/ImageZoomViewer';
import TopComponent from "../Components/Common/TopComponent";
//import ImageViewer which will help us to zoom Image
import { Dimensions } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";

const screenWidth = Dimensions.get('window').width;
const districtCoordinates = [
  // Replace these coordinates with the ones defining your district boundary
  { latitude: 40.7128, longitude: -74.0060 },
  { latitude: 40.7128, longitude: -74.0160 },
  { latitude: 40.7228, longitude: -74.0160 },
  // Add more coordinates as needed to define the boundary polygon
];

const MapScreen = ({ navigation }) => {
  const districtCenter = { latitude: 16.349219, longitude: 73.559413 };
  const [currentLocation, setCurrentLocation] = useState(null);

  const [selectedPolygonId, setSelectedPolygonId] = useState(null);

  const imageAspectRatio = 16 / 9; // Replace this with the actual aspect ratio of your images if they are not fixed
  const imageHeight = screenWidth / imageAspectRatio;
  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.log("Error getting current location: ", error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    return () => {
      backHandler.remove()
    }
  }, [])

  const handlePolygonPress = (event) => {
    // When a polygon is pressed, update the state with its id (if you have multiple polygons)
    const { id } = event.nativeEvent;
    setSelectedPolygonId(id);
    // You can perform any other action you want when a polygon is pressed
  };
  // const images = [
  //   {
  //     url:
  //       'https://1.bp.blogspot.com/-zptGfC-a3qI/UXVesv5E2-I/AAAAAAAABBE/HjTocA5xnWE/s1600/Map.jpg',
  //     width: screenWidth,
  //     height: imageHeight,
  //   }
  // ];

  const initialRegion = {
    latitude: currentLocation?.latitude || 40.7128,
    longitude: currentLocation?.longitude || -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //    <View style={styles.container}>
    //     <ImageViewer
    //       imageUrls={images}
    //       renderIndicator={() => null}
    //     />
    //   </View> 
    // </SafeAreaView>

    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {/* Display the current location marker */}
        {currentLocation && <Marker coordinate={currentLocation} />}

        {/* Draw the district boundary polygon */}
        <Polygon
          coordinates={districtCoordinates}
          strokeColor="rgba(0, 0, 255, 0.5)"
          fillColor={
            selectedPolygonId === "district1"
              ? "rgba(0, 0, 255, 0.5)"
              : "rgba(0, 0, 255, 0.1)"
          }
          strokeWidth={2}
          tappable // Enable tappable to make the polygon respond to touch events
          onPress={handlePolygonPress} // Add the onPress event handler for the polygon
          id="district1" // You can give an id to the polygon for identification
        />
      </MapView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5FCFF',
//     flex: 1,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;




// import React, { Component } from "react";
// import { View } from "react-native";
// import MapmyIndiaGL from 'mapmyindia-map-react-native-beta';

// MapmyIndiaGL.setMapSDKKey("b0919dc4a2edba9cb6814cf85ea53bca");//place your mapsdkKey
// MapmyIndiaGL.setRestAPIKey("b0919dc4a2edba9cb6814cf85ea53bca");//your restApiKey
// MapmyIndiaGL.setAtlasClientId("33OkryzDZsLDRr_vBZC8Op4OE18gLTV9WAD6xhJj1zBnECWgQ85iOF4tUM0tO870Rzpw_IUcLXWV_Epdm158DBh_RCThRWnP");//your atlasClientId key
// MapmyIndiaGL.setAtlasClientSecret("lrFxI-iSEg-cyFWdzHkcE_uCn8M0kew8XxZDqd0W4rvbGCd3e5u_z6A2jreA68FkV9r8uoiFedVRSOGnIYJdFE8ibWq5aKPJd-sMj3s6I5Y="); //your atlasClientSecret key
// MapmyIndiaGL.setAtlasGrantType("Map SDK Key");

// const MapScreen = ({ navigation }) => {
//   <View style={{ flex: 1 }}>
//     <MapmyIndiaGL.MapView style={{ flex: 1 }} >
//       <MapmyIndiaGL.Camera
//         ref={c => (this.camera = c)}
//         zoomLevel={12}
//         minZoomLevel={4}
//         maxZoomLevel={22}
//         centerCoordinate={[77.231409, 28.6162]}
//       />
//     </MapmyIndiaGL.MapView>
//   </View>
// };

// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: '#F5FCFF',
// //     flex: 1,
// //   },
// // });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default MapScreen;
