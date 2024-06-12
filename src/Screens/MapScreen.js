import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { checkLogin, goBackHandler } from "../Services/CommonMethods";
import { Dimensions } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import COLOR from "../Services/Constants/COLORS";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;
const districtCoordinates = [
    // Replace these coordinates with the ones defining your district boundary
    { latitude: 40.7128, longitude: -74.006 },
    { latitude: 40.7128, longitude: -74.016 },
    { latitude: 40.7228, longitude: -74.016 },
    // Add more coordinates as needed to define the boundary polygon
];

const MapScreen = ({ navigation }) => {
    const { t } = useTranslation();

    const districtCenter = { latitude: 16.349219, longitude: 73.559413 };
    const [currentLocation, setCurrentLocation] = useState(null);

    const [selectedPolygonId, setSelectedPolygonId] = useState(null);

    const imageAspectRatio = 16 / 9; // Replace this with the actual aspect ratio of your images if they are not fixed
    const imageHeight = screenWidth / imageAspectRatio;

    useEffect(() => {
        const backHandler = goBackHandler(navigation);
        checkLogin(navigation);
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
            },
            (error) => {
                console.log(t("ALERT.ERROR_CURRENT_LOCATION"), error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        return () => {
            backHandler.remove();
        };
    }, []);

    const handlePolygonPress = (event) => {
        // When a polygon is pressed, update the state with its id (if you have multiple polygons)
        const { id } = event.nativeEvent;
        setSelectedPolygonId(id);
        // You can perform any other action you want when a polygon is pressed
    };
    // const images = [
    //   {
    //     url:
    //       "https://1.bp.blogspot.com/-zptGfC-a3qI/UXVesv5E2-I/AAAAAAAABBE/HjTocA5xnWE/s1600/Map.jpg",
    //     width: screenWidth,
    //     height: imageHeight,
    //   }
    // ];

    const initialRegion = {
        latitude: currentLocation?.latitude || 40.7128,
        longitude: currentLocation?.longitude || -74.006,
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
                    strokeColor={COLOR.themeNaviBlue}
                    fillColor={
                        selectedPolygonId === "district1"
                            ? COLOR.themeNaviBlue
                            : COLOR.themeLightBlue
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
//     backgroundColor: "#F5FCFF",
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
// import MapmyIndiaGL from "mapmyindia-map-react-native-beta";

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
// //     backgroundColor: "#F5FCFF",
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
