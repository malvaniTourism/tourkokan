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

const ProfileView = ({ navigation, ...props }) => {

  const handleEditPress = () => {

  }
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
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
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
    checkLogin(navigation)

    // props.setLoader(true);
    getUserProfile();
    return () => {
      backHandler.remove()
    }
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
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

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus('You are Here');
        //Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
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
  };
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

      <View style={styles.containerHome}>
        <View style={styles.containerHome}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{ width: 100, height: 100 }}
          />
          <Text style={styles.boldTextHome}>{locationStatus}</Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>
          <View style={{ marginTop: 20 }}>
            <Button title="Button" onPress={getOneTimeLocation} />
          </View>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          React Native Geolocation
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
      </View>
      <View style={styles.headerContainer}>
        <Image
          style={styles.coverPhoto}
          source={{ uri: 'https://www.bootdey.com/image/280x280/1E90FF/1E90FF' }}
        />
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

      <GlobalText text={JSON.stringify(profile)} />
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