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
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../Components/Common/Header";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { comnGet, comnPost, dataSync, saveToStorage } from "../Services/Api/CommonServices";
import { connect } from "react-redux";
import Loader from "../Components/Customs/Loader";
import TopComponent from "../Components/Common/TopComponent";
import { setLoader } from "../Reducers/CommonActions";
import { Image } from "@rneui/themed";
import styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkLogin, backPage, goBackHandler, navigateTo } from "../Services/CommonMethods";
import GlobalText from "../Components/Customs/Text";
import TextButton from "../Components/Customs/Buttons/TextButton";
import Geolocation from "@react-native-community/geolocation";
import { Overlay } from "@rneui/themed";
import MapView, { Marker, Polygon } from "react-native-maps";
import Path from "../Services/Api/BaseUrl";
import STRING from "../Services/Constants/STRINGS";
import NetInfo from "@react-native-community/netinfo";
import CheckNet from "../Components/Common/CheckNet";
import { useTranslation } from 'react-i18next';
import ProfileChip from "../Components/Common/ProfileChip";
import ChipOptions from "../Components/Common/ProfileViews/ChipOptions";

const ProfileView = ({ navigation, route, ...props }) => {
  const { t, i18n } = useTranslation();

  const [currentLatitude, setCurrentLatitude] = useState();
  const [currentLongitude, setCurrentLongitude] = useState();
  const [locationStatus, setLocationStatus] = useState("");
  const [watchID, setWatchID] = useState("");
  const [showLocModal, setShowLocModal] = useState(false);
  const [initialRegion, setInitialRegion] = useState({})
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);
  const [option, setOption] = useState(0);

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    // requestLocationPermission();
    checkLogin(navigation)
    // getUserProfile();
    const unsubscribeFocus = navigation.addListener(STRING.EVENT.FOCUS, () => {
      getUserProfile();
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setOffline(false)
      dataSync(STRING.STORAGE.PROFILE_RESPONSE, getUserProfile())
        .then(resp => {
          let res = JSON.parse(resp)
          if (res.data && res.data.data) {
            setProfile(res.data.data);
          } else if (resp) {
            setOffline(true)
          }
          props.setLoader(false);
        })
      // removeFromStorage(STRING.STORAGE.LANDING_RESPONSE)
    });
    return () => {
      Geolocation.clearWatch(watchID);
      backHandler.remove()
      unsubscribeFocus()
      unsubscribe();
    };
  }, [route]);

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      getOneTimeLocation();
      subscribeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: STRING.LOCATION_ACCESS_REQUIRED,
            message: STRING.NEEDS_TO_ACCESS,
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
          subscribeLocation();
        } else {
          setLocationStatus(STRING.PERMISSION_DENIED);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getOneTimeLocation = () => {
    setLocationStatus(STRING.GETTING_LOCATION);
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus(STRING.YOU_ARE_HERE);
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
        setLocationStatus(STRING.YOU_ARE_HERE);
        //Will give you the location on location change
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
      latitude: parseFloat(lat) || 47.4220936,
      longitude: parseFloat(long) || -122.083922,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    console.log(myInitialRegion);
    setInitialRegion(myInitialRegion)
  }

  const setLocationMap = (lat, long) => {
    setInitialLocation(lat, long)
    setCurrentLatitude(parseFloat(lat));
    setCurrentLongitude(parseFloat(long))
  }

  const getUserProfile = () => {
    comnPost("v2/user-profile", props.access_token, navigation)
      .then((res) => {
        if (res && res.data.data)
          saveToStorage(STRING.STORAGE.PROFILE_RESPONSE, JSON.stringify(res))
        setProfile(res.data.data); // Update places state with response data
        setLocationMap(res.data.data.addresses[0].latitude, res.data.data.addresses[0].longitude)
        props.setLoader(false);
      })
      .catch((error) => {
        setError(error.message); // Update error state with error message
        props.setLoader(false);
      });
  }

  const handleLogout = () => {
    // Logout
    props.setLoader(true);
    comnPost("v2/logout")
      .then((res) => {
        if (res.data.success) {
          props.setLoader(false);
          AsyncStorage.clear()
          navigateTo(navigation, STRING.SCREEN.AUTH_SCREEN);
        }
      })
      .catch((error) => {
        props.setLoader(false);
      });
  };

  const handleEditPress = () => {
    navigateTo(navigation, STRING.SCREEN.PROFILE)
    // Edit Profile
  }

  const setHomeLocation = () => {
    // Update Location
    requestLocationPermission();
    setShowLocModal(false)
  }

  const setCurrLocation = () => {
    requestLocationPermission();
    setShowLocModal(false)
  }

  const changeLang = () => {
    // Lang
    i18n.changeLanguage("en")
  }

  return (
    <ScrollView style={styles.container}>
      <CheckNet isOff={offline} />
      <Header
        // style={{ backgroundColor: "transparent", zIndex: 10 }}
        name={""}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            size={24}
            onPress={() => backPage(navigation)}
            color={COLOR.black}
          />
        }
      />
      <Loader />

      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePhoto}
          source={{ uri: `${profile.profile_picture ? Path.FTP_PATH + profile.profile_picture : "https://api-private.atlassian.com/users/2143ab39b9c73bcab4fe6562fff8d23d/avatar"}` }}
        />
        <GlobalText text={profile.email} style={styles.pricingOptionTitle} />
      </View>

      <View style={styles.headerContainer}>
        <GlobalText text={STRING.ADDRESS} />
        {initialRegion.latitude &&
          <View style={styles.profileMapView}>
            <MapView style={styles.map} initialRegion={initialRegion}>
              <Marker
                coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
              />
            </MapView>
          </View>
        }
      </View>

      <View style={styles.chipContainer}>
        {
          option == 0 ?
            <ChipOptions />
            :
            <ProfileChip />
        }
      </View>

      <Overlay style={styles.locationModal} isVisible={showLocModal} onBackdropPress={() => setShowLocModal(false)}>
        <GlobalText text={STRING.SET_LOCATION} style={styles.locationModal} />
        <View>
          <TextButton
            title={STRING.BUTTON.HOME_LOCATION}
            containerStyle={styles.showMore}
            buttonView={styles.locBtnStyle}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            raised={false}
            onPress={setHomeLocation}
            startIcon={
              <Ionicons
                name="home"
                size={24}
                color={COLOR.themeBlue}
              />
            }
          />
          <TextButton
            title={STRING.BUTTON.CURRENT_LOCATION}
            containerStyle={styles.showMore}
            buttonView={styles.locBtnStyle}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            raised={false}
            onPress={setCurrLocation}
            startIcon={
              <Ionicons
                name="location"
                size={24}
                color={COLOR.themeBlue}
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