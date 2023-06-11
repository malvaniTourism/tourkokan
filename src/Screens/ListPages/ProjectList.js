import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import SmallCard from "../../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { comnGet } from "../../Services/Api/CommonServices";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook from your navigation library
import Loader from "../../Components/Customs/Loader";
import Header from "../../Components/Common/Header";
import { setLoader } from "../../Reducers/CommonActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProjectList = ({ navigation, ...props }) => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    checkLogin()
    props.setLoader(true);
    comnGet("v1/projects", props.access_token)
      .then((res) => {
        setProjects(res.data.data.data); // Update projects state with response data
        props.setLoader(false);
      })
      .catch((error) => {
        props.setLoader(false);
        setError(error.message); // Update error state with error message
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

  // Function to handle SmallCard click
  const handleSmallCardClick = (id) => {
    navigation.navigate("ProjectDetails", { id });
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Loader />
        <Header name={'Projects'}
          startIcon={
            <Ionicons
              name="chevron-back-outline"
              color={COLOR.black}
              size={DIMENSIONS.userIconSize}
              onPress={() => goBack()}
            />
          }
        />
        <View style={{ flexDirection: "row" }}>
          {projects.map((project) => (
              <SmallCard
                Icon={
                  <Ionicons
                    name="bus"
                    color={COLOR.yellow}
                    size={DIMENSIONS.iconSize}
                  />
                }
                title={project.name}
                onPress={() => handleSmallCardClick(project.id)}
              />
          ))}
        </View>
      </View>
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

export default connect (mapStateToProps, mapDispatchToProps) (ProjectList);
