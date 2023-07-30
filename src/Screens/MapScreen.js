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
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
// import Geojson, { kml } from 'react-native-geojson';
// import {kml} from '@tmcw/togeojson';
import { DOMParser } from 'xmldom';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import CustomButton from "../Components/Customs/Button";

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
  const [myPlace, setMyPlace] = useState();

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
    latitude: currentLocation?.latitude || 16.1668,
    longitude: currentLocation?.longitude || 73.5594,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const pickAFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: ['application/vnd.google-earth.kml+xml'],
        allowMultiSelection: false,
      });
  
      const read = await readFile(res[0].uri);
      const theKml = new DOMParser().parseFromString(read);
  
      // Extract the coordinates data from theKml object
      const coordinatesElements = theKml.getElementsByTagName('coordinates');
      if (!coordinatesElements || coordinatesElements.length === 0) {
        throw new Error('No coordinates found in the KML data.');
      }
  
      const coordinatesData = coordinatesElements[0].textContent;
  
      // console.log('Coordinates Data:', coordinatesData);

    // Process the coordinates data (Assuming it's in the format "longitude,latitude longitude,latitude ...")
    const coordinatesArray = coordinatesData.split(' ').map(coord => {
      const [longitude, latitude] = coord.split(',').map(parseFloat);
      return [longitude, latitude];
    });

    // Flatten the coordinates array to match the GeoJSON format
    const flattenedCoordinates = coordinatesArray;

    console.log("flattenedCoordinates: ", flattenedCoordinates[0]);
    // Create a GeoJSON representation of the polygon
    const myPlaceGeojson = {
      type: 'Polygon',
      coordinates: [flattenedCoordinates],
    };

    // Set the GeoJSON data to the state to display on the map
    setMyPlace(myPlaceGeojson);
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  const readFile = async MyPath => {
    try {
      const path = MyPath;
      const contents = await RNFS.readFile(path, 'utf8');
      return '' + contents;
    } catch (e) {
      throw e;
    }
  };
  // console.log('myPlace: ',myPlace);
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
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
      >
        {/* Display the current location marker */}
        {currentLocation && <Marker coordinate={currentLocation} />}

        {/* Draw the district boundary polygon */}
        {myPlace && (
    <Polygon
      coordinates={myPlace.coordinates[0]} // Extract the coordinates from the myPlace object
      strokeColor="red"
      fillColor="green"
      strokeWidth={4}
      onPress={() => {}}
    />
  )}
      </MapView>

      <View>
        <CustomButton
          title={"Load KML"}
          containerStyle={styles.searchButtonContainerStyle}
          buttonStyle={styles.searchButtonStyle}
          titleStyle={styles.buttonTitleStyle}
          isDisabled={false}
          raised={true}
          type={"Submit"}
          onPress={pickAFile}
        />
      </View>
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
