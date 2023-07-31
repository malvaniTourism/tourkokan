import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  TextInput,
  StyleSheet,
  LogBox,
  FlatList,
  SafeAreaView,
  PermissionsAndroid,
  Button,
  Platform
} from 'react-native';
import React, { useState, useEffect } from "react";
import Header from "../Components/Common/Header";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { comnGet, comnPost } from "../Services/Api/CommonServices";
import { connect } from "react-redux";
import Loader from "../Components/Customs/Loader";
import TopComponent from "../Components/Common/TopComponent";
import { setLoader } from "../Reducers/CommonActions";
import { Image } from "@rneui/themed";
import styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkLogin, backPage, goBackHandler, navigateTo } from "../Services/CommonMethods";
import SvgUri from 'react-native-svg-uri';
import GlobalText from "../Components/Customs/Text";
import CustomButton from '../Components/Customs/Button';
import Geolocation from '@react-native-community/geolocation';
import { Overlay } from '@rneui/themed';
import MapView, { Marker, Polygon } from 'react-native-maps';

const ProfileView = ({ navigation, ...props }) => {
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');
  const [watchID, setWatchID] = useState("");
  const [showLocModal, setShowLocModal] = useState(true);
  const [initialRegion, setInitialRegion] = useState(
    {
      latitude: currentLatitude || 37.4220936,
      longitude: currentLongitude || -122.083922,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  )

  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    // requestLocationPermission();
    checkLogin(navigation)
    getUserProfile();
    return () => {
      Geolocation.clearWatch(watchID);
      backHandler.remove()
    };
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      subscribeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
          subscribeLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
        setInitialLocation(position.coords.longitude, position.coords.latitude)
        const currentLongitude = position.coords.longitude;
        //getting the Longitude from the location json
        const currentLatitude = position.coords.latitude;
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 }
    );
  };

  const subscribeLocation = () => {
    let WatchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus('You are Here');
        //Will give you the location on location change
        console.log(position);
        const currentLongitude = position.coords.longitude;
        //getting the Longitude from the location json
        const currentLatitude = position.coords.latitude;
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, maximumAge: 1000 }
    );
    setWatchID(WatchID)
  };

  const setInitialLocation = (lat, long) => {
    let myInitialRegion = {
      latitude: lat || 37.4220936,
      longitude: long || -122.083922,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setInitialRegion(myInitialRegion)
  }

  const getUserProfile = () => {
    comnGet("v1/user-profile", props.access_token)
      .then((res) => {
        setProfile(res.data.data); // Update places state with response data
        props.setLoader(false);
      })
      .catch((error) => {
        setError(error.message); // Update error state with error message
        props.setLoader(false);
      });
  }

  const handleLogout = () => {
    props.setLoader(true);
    comnPost("v1/logout")
      .then((res) => {
        if (res.data.success) {
          props.setLoader(false);
          AsyncStorage.clear()
          navigateTo(navigation, "Login");
        }
      })
      .catch((error) => {
        props.setLoader(false);
      });
  };

  const handleEditPress = () => {

  }

  const setHomeLocation = () => {
    requestLocationPermission();
    setShowLocModal(false)
  }

  const setCurrLocation = () => {
    requestLocationPermission();
    setShowLocModal(false)
  }

  return (
    <ScrollView style={styles.container}>
      <Header
        // style={{ backgroundColor: 'transparent', zIndex: 10 }}
        name={""}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            size={24}
            onPress={() => backPage(navigation)}
            color={COLOR.white}
          />
        }
        endIcon={
          <TouchableOpacity onPress={handleLogout}>
            <GlobalText text={"Logout  "} style={{ color: '#fff' }} />
          </TouchableOpacity>
        }
      />
      <Loader />

      <View style={styles.headerContainer}>
        {/* <Image
          style={styles.coverPhoto}
          source={{ uri: 'https://www.bootdey.com/image/280x280/1E90FF/1E90FF' }}
        /> */}
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}
          />
          <GlobalText text={profile.name} style={styles.pricingOptionTitle} />
        </View>
      </View>
      <View style={styles.bioContainer}>
        <GlobalText text={profile.email} style={styles.bioText} />
        <GlobalText text={profile.mobile} style={styles.bioText} />
        <GlobalText text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etullamcorper nisi."} style={styles.bioText}></GlobalText>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <GlobalText text={"1234"} style={styles.statCount} />
          <GlobalText text={"Posts"} style={styles.statLabel} />
        </View>
        <View style={styles.statContainer}>
          <GlobalText text={"5678"} style={styles.statCount} />
          <GlobalText text={"Followers"} style={styles.statLabel} />
        </View>
        <View style={styles.statContainer}>
          <GlobalText text={"9101"} style={styles.statCount} />
          <GlobalText text={"Following"} style={styles.statLabel} />
        </View>
      </View>
      <CustomButton
        title={"Edit Profile"}
        containerStyle={styles.editButtonContainer}
        buttonStyle={styles.planButtonStyle}
        titleStyle={styles.planButtonTitleStyle}
        raised={true}
        type={"Submit"}
        onPress={handleEditPress}
      />

      {currentLatitude &&
        <View style={styles.profileMapView}>
          <MapView style={styles.map} initialRegion={initialRegion}>
            <Marker
              coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
            />
          </MapView>
        </View>}

      <Overlay style={styles.locationModal} isVisible={showLocModal} onBackdropPress={() => setShowLocModal(false)}>
        <GlobalText text={"Set Your Primary Location"} style={styles.locationModal} />
        <View>
          <CustomButton
            title={"Home Location"}
            containerStyle={styles.showMore}
            seeMoreStyle={styles.locBtnStyle}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            raised={false}
            type={"Submit"}
            onPress={setHomeLocation}
            startIcon={
              <Ionicons
                name="home"
                size={24}
                color={COLOR.themeComicBlue}
              />
            }
          />
          <CustomButton
            title={"Current Location"}
            containerStyle={styles.showMore}
            seeMoreStyle={styles.locBtnStyle}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            raised={false}
            type={"Submit"}
            onPress={setCurrLocation}
            startIcon={
              <Ionicons
                name="location"
                size={24}
                color={COLOR.themeComicBlue}
              />
            }
          />
        </View>
      </Overlay>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    access_token: state.commonState.access_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (data) => {
      dispatch(setLoader(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);