import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
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

const Profile = ({ navigation, ...props }) => {
  const [profile, setProfile] = useState([]); // State to store places
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    checkLogin();
    props.setLoader(true);
    comnGet("v1/user-profile", props.access_token)
      .then((res) => {
        console.log('profile daat-- ', res.data.data);
        setProfile(res.data.data); // Update places state with response data
        props.setLoader(false);
      })
      .catch((error) => {
        setError(error.message); // Update error state with error message
        props.setLoader(false);
      });
  }, []);

  const checkLogin = async () => {
    if (
      (await AsyncStorage.getItem("access_token")) == null ||
      (await AsyncStorage.getItem("access_token")) == ""
    ) {
      navigation.navigate("Login");
    }
  }

  const goBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    props.setLoader(true);
    // Call your logout API here
    // For example:
    comnPost("v1/logout")
      .then((res) => {
        if (res.data.success) {
          props.setLoader(false);
          AsyncStorage.clear()
          navigation.navigate("Login");
        }
        // Do something after successful logout, such as clearing your access_token from state
      })
      .catch((error) => {
        props.setLoader(false);
      });
  };
  return (
    <View>
      <Header
        style={{ backgroundColor: 'transparent', zIndex: 10 }}
        name={""}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            size={24}
            onPress={() => goBack()}
            color={'#fff'}
          />
        }
        endIcon={
          <TouchableOpacity onPress={handleLogout}>
            <Text style={{ color: '#fff' }}>Logout  </Text>
          </TouchableOpacity>
        }
      />
      <Loader />
      <View>
        <View style={styles.profileImageView}>
          <Image
            source={{ uri: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/128009228/original/8e8ad34b012b46ebd403bd4157f8fef6bb2c076b/design-minimalist-flat-cartoon-caricature-avatar-in-6-hours.jpg' }}
            containerStyle={styles.profileImage}
          />
        </View>
        <View style={styles.profileDetails}>
          <View style={styles.flexRow}>
            <View>
              <Text style={styles.boldText}>{profile.name}</Text>
              <Text>{profile.role_id}</Text>
            </View>
            {!profile.isVerified ?
              <View>
                <MaterialIcons
                  name="verified"
                  size={24}
                  onPress={() => goBack()}
                  color={'#3086e3'}
                />
              </View>
              : null
            }
          </View>
          <View style={styles.flexRow}>
            <View>
              <Text>{profile.email}</Text>
              <Text>{profile.mobile}</Text>
            </View>
            <View>
              <Text>{profile.dob}</Text>
              <Text>{profile.gender}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
