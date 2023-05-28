import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../Components/Common/Header";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import Ionicons from "react-native-vector-icons/Ionicons";
import { comnGet, comnPost } from "../Services/Api/CommonServices";
import { connect } from "react-redux";
import Loader from "../Components/Customs/Loader";
import TopComponent from "../Components/Common/TopComponent";
import { setLoader } from "../Reducers/CommonActions";

const Profile = ({ navigation, ...props }) => {
  const [profile, setProfile] = useState([]); // State to store places
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    props.setLoader(true);
    comnGet("v1/user-profile", props.access_token)
      .then((res) => {
        setProfile(res.data.data); // Update places state with response data
        props.setLoader(false);
      })
      .catch((error) => {
        setError(error.message); // Update error state with error message
        props.setLoader(false);
      });
  }, []);

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
        name={"Profile"}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            size={24}
            onPress={() => goBack()}
          />
        }
        endIcon={
          <TouchableOpacity onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        }
      />
      <Loader />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Name: {profile.name}</Text>
        <Text>Email: {profile.email}</Text>
        <Text>Profile: {profile.profile}</Text>
        <Text>Profile Picture: {profile.profile_picture}</Text>
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
