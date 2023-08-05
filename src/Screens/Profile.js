import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, BackHandler, ScrollView } from "react-native";
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
import DropDown from "../Components/Customs/DropDown";
import { ProfileFields, SignUpFields } from "../Services/Constants/FIELDS";
import CustomButton from "../Components/Customs/Button";
import TextField from "../Components/Customs/TextField";

const Profile = ({ navigation, ...props }) => {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [picture, setPicture] = useState("")
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    props.setLoader(true);
    getUserProfile();
    getRoles()
    return () => {
      backHandler.remove()
    }
  }, []);

  const getUserProfile = () => {
    comnGet("v1/user-profile", props.access_token)
      .then((res) => {
        console.log(res.data.data);
        setProfile(res.data.data); // Update places state with response data
        props.setLoader(false);
        setRole(res.data.data.role_id)
        setName(res.data.data.name)
        setEmail(res.data.data.email)
        setMobile(res.data.data.mobile)
        setPicture(res.data.data.profile_picture)
      })
      .catch((error) => {
        setError(error.message); // Update error state with error message
        props.setLoader(false);
      });
  }

  const getRoles = () => {
    comnGet("v1/roleDD")
      .then((res) => {
        if (res.data.success) {
          props.setLoader(false);
          setRoles(res.data.data);
        } else {
          props.setLoader(false);
        }
      })
      .catch((err) => {
        props.setLoader(false);
      });
  }

  const setValue = (val, isVal, index) => {
    switch (index) {
      case 0:
        setName(val);
        break;
      case 1:
        setEmail(val);
        break;
      case 2:
        setMobile(val);
        break;
      default:
        setRole(val);
        break;
    }
  };

  const getValue = (i) => {
    switch (i) {
      case 0:
        return name;
      case 1:
        return email;
      case 2:
        return mobile;
      default:
        return role;
    }
  };

  const updateProfile = () => {

  }

  return (
    <View>
      <ScrollView>
        <Header
          style={{ backgroundColor: 'transparent', zIndex: 10 }}
          name={""}
          startIcon={
            <Ionicons
              name="chevron-back-outline"
              size={24}
              onPress={() => backPage(navigation)}
              color={COLOR.white}
            />
          }
          endIcon={<></>}
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
            <DropDown
              setChild={(v, i) => setValue(v, i)}
              name={"Role"}
              label={"Role"}
              value={role}
              disable={false}
              style={styles.roleDropDown}
              fieldType={"dropDwn"}
              helperMsg={"Select Role"}
              List={roles}
              parentDetails={{ label: "role" }}
            />
            {ProfileFields.map((field, index) => {
              return (
                <TextField
                  name={field.name}
                  label={field.name}
                  placeholder={field.placeholder}
                  fieldType={field.type}
                  length={field.length}
                  required={field.required}
                  disabled={field.disabled}
                  value={getValue(index)}
                  setChild={(v, i) => setValue(v, i, index)}
                  style={styles.containerStyle}
                  inputContainerStyle={styles.profileContainerStyle}
                  isSecure={field.isSecure}
                />
              );
            })}
            <CustomButton
              title={"Update"}
              seeMoreStyle={styles.buttonView}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.profileButtonStyle}
              titleStyle={styles.buttonTitle}
              disabled={false}
              raised={true}
              type={"Submit"}
              onPress={() => updateProfile()}
            />
          </View>
        </View>
      </ScrollView>
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
