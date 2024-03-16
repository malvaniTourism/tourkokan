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

const ProfileView = ({ navigation, route, ...props }) => {
  const [currentLatitude, setCurrentLatitude] = useState(37.4220936);
  const [currentLongitude, setCurrentLongitude] = useState(-122.083922);
  const [locationStatus, setLocationStatus] = useState("");
  const [watchID, setWatchID] = useState("");
  const [showLocModal, setShowLocModal] = useState(false);
  const [initialRegion, setInitialRegion] = useState(
    {
      latitude: currentLatitude,
      longitude: currentLongitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  )
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false)

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
      latitude: lat || 37.4220936,
      longitude: long || -122.083922,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setInitialRegion(myInitialRegion)
  }

  const getUserProfile = () => {
    comnPost("v2/user-profile", props.access_token)
      .then((res) => {
        if (res && res.data.data)
          saveToStorage(STRING.STORAGE.PROFILE_RESPONSE, JSON.stringify(res))
        setProfile(res.data.data); // Update places state with response data
        // setCurrentLatitude(parseInt(res.data.data?.addresses[0]?.latitude))
        // setCurrentLongitude(parseInt(res.data.data?.addresses[0]?.longitude))
        props.setLoader(false);
      })
      .catch((error) => {
        setError(error.message); // Update error state with error message
        props.setLoader(false);
      });
  }

  const handleLogout = () => {
    props.setLoader(true);
    comnPost("v2/logout")
      .then((res) => {
        if (res.data.success) {
          props.setLoader(false);
          AsyncStorage.clear()
          navigateTo(navigation, STRING.SCREEN.EMAIL_SIGN_IN);
        }
      })
      .catch((error) => {
        props.setLoader(false);
      });
  };

  const handleEditPress = () => {
    navigateTo(navigation, STRING.SCREEN.PROFILE)
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
      <CheckNet isOff={offline} />
      <Header
        // style={{ backgroundColor: "transparent", zIndex: 10 }}
        name={""}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            size={24}
            onPress={() => backPage(navigation)}
            color={COLOR.white}
          />
        }
      />
      <Loader />

      <View style={styles.headerContainer}>
        {currentLatitude &&
          <View style={styles.profileMapView}>
            <MapView style={styles.map} initialRegion={initialRegion}>
              <Marker
                coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
              />
            </MapView>
          </View>
        }
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={{ uri: `${profile.profile_picture ? Path.FTP_PATH + profile.profile_picture : "https://api-private.atlassian.com/users/2143ab39b9c73bcab4fe6562fff8d23d/avatar"}` }}
          />
          <GlobalText text={profile.name} style={styles.pricingOptionTitle} />
        </View>
      </View>
      <View style={styles.bioContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <GlobalText text={profile.email} style={styles.bioText} />
            <GlobalText text={profile.mobile} style={styles.bioText} />
          </View>
          {!profile.isVerified ?
            <View>
              <MaterialIcons
                name="verified"
                size={24}
                color={COLOR.verified}
              />
            </View>
            : null
          }
        </View>
        <GlobalText text={JSON.stringify(profile)} style={styles.bioText}></GlobalText>
      </View>
      {/* <View style={styles.statsContainer}>
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
      </View> */}

      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 30 }}>
        <TextButton
          title={STRING.BUTTON.EDIT_PROFILE}
          seeMoreStyle={styles.editSeeMoreStyle}
          containerStyle={styles.editButtonContainer}
          buttonStyle={styles.editButtonStyle}
          titleStyle={styles.planButtonTitleStyle}
          raised={true}
          onPress={handleEditPress}
        />
        <TextButton
          title={STRING.BUTTON.UPDATE_LOCATION}
          seeMoreStyle={styles.updateSeeMoreStyle}
          containerStyle={styles.editButtonContainer}
          buttonStyle={styles.editButtonStyle}
          titleStyle={styles.planButtonTitleStyle}
          raised={true}
          onPress={() => setShowLocModal(true)}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 30 }}>
        <TextButton
          title={STRING.BUTTON.LOGOUT}
          seeMoreStyle={styles.logoutStyle}
          containerStyle={styles.editButtonContainer}
          buttonStyle={styles.editButtonStyle}
          titleStyle={styles.planButtonTitleStyle}
          raised={true}
          onPress={() => handleLogout()}
        />
      </View>

      <Overlay style={styles.locationModal} isVisible={showLocModal} onBackdropPress={() => setShowLocModal(false)}>
        <GlobalText text={STRING.SET_LOCATION} style={styles.locationModal} />
        <View>
          <TextButton
            title={STRING.BUTTON.HOME_LOCATION}
            containerStyle={styles.showMore}
            seeMoreStyle={styles.locBtnStyle}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            raised={false}
            onPress={setHomeLocation}
            startIcon={
              <Ionicons
                name="home"
                size={24}
                color={COLOR.logoBlue}
              />
            }
          />
          <TextButton
            title={STRING.BUTTON.CURRENT_LOCATION}
            containerStyle={styles.showMore}
            seeMoreStyle={styles.locBtnStyle}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            raised={false}
            onPress={setCurrLocation}
            startIcon={
              <Ionicons
                name="location"
                size={24}
                color={COLOR.logoBlue}
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