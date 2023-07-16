import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import SmallCard from "../../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import { comnPost } from "../../Services/Api/CommonServices";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook from your navigation library
import Loader from "../../Components/Customs/Loader";
import Header from "../../Components/Common/Header";
import { setLoader } from "../../Reducers/CommonActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Styles";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../../Services/CommonMethods";

const ProjectList = ({ navigation, ...props }) => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    props.setLoader(true);
    getProjects()
    return () => {
      backHandler.remove()
    }
  }, []);

  const getProjects = () => {
    const data = {}
    comnPost("v1/projects", data)
      .then((res) => {
        setProjects(res.data.data.data); // Update projects state with response data
        props.setLoader(false);
      })
      .catch((error) => {
        props.setLoader(false);
        setError(error.message); // Update error state with error message
      });
  }

  const handleSmallCardClick = (id) => {
    navigateTo(navigation, "ProjectDetails", { id });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Loader />
        <Header name={'Projects'}
          startIcon={
            <Ionicons
              name="chevron-back-outline"
              color={COLOR.white}
              size={DIMENSIONS.userIconSize}
              onPress={() => backPage(navigation)}
            />
          }
        />
        <View style={styles.cardsWrap}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
