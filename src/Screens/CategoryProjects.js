import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, ImageBackground } from "react-native";
import SmallCard from "../Components/Customs/SmallCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import { comnGet } from "../Services/Api/CommonServices";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook from your navigation library
import Loader from "../Components/Customs/Loader";
import Header from "../Components/Common/Header";
import { setLoader } from "../Reducers/CommonActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../Services/CommonMethods";
import Path from "../Services/Api/BaseUrl";
import styles from "./Styles";
import ProjectCard from "../Components/Cards/ProjectCard";

const CategoryProjects = ({ navigation, route, ...props }) => {
  const [projects, setProjects] = useState([]); // State to store Projects
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    props.setLoader(true);
    getAllProjects()
    return () => {
      backHandler.remove()
    }
  }, []);

  const getAllProjects = () => {
    comnGet(`v1/category/${route.params.id}/projects`, props.access_token)
      .then((res) => {
        console.log('res- ', res.data.data);
        setProjects(res.data.data[0]); // Update Projects state with response data
        props.setLoader(false);
      })
      .catch((error) => {
        props.setLoader(false);
        setError(error.message); // Update error state with error message
      });
  }

  // Function to handle SmallCard click
  const handleSmallCardClick = (id) => {
    navigateTo(navigation, "ProjectDetails", { id });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Loader />
        <Header name={route.params.name}
          startIcon={
            <Ionicons
              name="chevron-back-outline"
              color={COLOR.black}
              size={DIMENSIONS.userIconSize}
              onPress={() => backPage(navigation)}
            />
          }
        />
        {projects &&
          <View>
            <View style={{ marginBottom: 20 }}>
              <View style={styles.overlay} />
              <ImageBackground
                source={{ uri: Path.FTP_PATH + projects.image_url }}
                style={styles.categoryBack}
                imageStyle={styles.categoryBackImageStyle}
                resizeMode="cover"
              />
              <View style={styles.categoryImageDetails}>
                <Text style={styles.catTitle}>{projects.name}</Text>
                <Text style={styles.catSubTitle}>{projects.description}</Text>
              </View>
            </View>

            {projects.projects && projects.projects.map(project => (
              <ProjectCard project={project} />
            ))}


            <Text style={{ marginTop: 50 }}>{JSON.stringify(projects.projects)}</Text>
          </View>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProjects);
