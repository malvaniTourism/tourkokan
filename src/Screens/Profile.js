import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, BackHandler, ScrollView } from "react-native";
import Header from "../Components/Common/Header";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
import Path from "../Services/Api/BaseUrl";
import { launchImageLibrary } from 'react-native-image-picker'
import Popup from "../Components/Common/Popup";

const Profile = ({ navigation, ...props }) => {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [profile_picture, setPicture] = useState("")
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);

  useEffect(() => {
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    props.setLoader(true);
    getUserProfile();

    return () => {
      backHandler.remove()
    }
  }, []);

  const getUserProfile = () => {
    comnGet("v1/user-profile", props.access_token)
      .then((res) => {
        setProfile(res.data.data); // Update places state with response data
        props.setLoader(false);
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

  const setValue = (val, isVal, index) => {
    switch (index) {
      case 0:
        setName(val);
        break;
      case 1:
        setMobile(val);
        break;
      case 2:
        setEmail(val);
        break;
    }
  };

  const getValue = (i) => {
    switch (i) {
      case 0:
        return name;
      case 1:
        return mobile;
      case 2:
        return email;
    }
  };

  const handleImageUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true, // Set to true to include base64 data
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.assets) {
          // Upload the image to the API
          setUploadImage(`data:${response.assets[0].type};base64,${response.assets[0].base64}`);
          setImageSource(response.assets[0].uri);
        }
      }
    );
  };

  const updateProfile = () => {
    props.setLoader(true);
    let data = {
      email,
      profile_picture: uploadImage
    }

    comnPost("v1/updateProfile", data)
      .then(res => {
        setIsAlert(true);
        setAlertMessage(res.data.message);
        props.setLoader(false);
        if (res.data.success) setIsSuccess(true)
        else setIsSuccess(false)

      })
      .catch(err => {
        setIsAlert(true);
        setAlertMessage("Failed");
        props.setLoader(false);
      })
  }

  const closePopup = () => {
    if (isSuccess) {
      navigateTo(navigation, "ProfileView");
    }
    setIsAlert(false)
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
              color={COLOR.black}
            />
          }
          endIcon={<></>}
        />
        <Loader />
        <View>
          <TouchableOpacity style={styles.profileImageView} onPress={handleImageUpload}>
            {imageSource ?
              <Image source={{ uri: imageSource }} style={styles.profileImage} />
              :
              <Image
              source={{ uri: `${profile_picture ? Path.FTP_PATH1 + profile_picture : "https://api-private.atlassian.com/users/2143ab39b9c73bcab4fe6562fff8d23d/avatar"}` }}
              containerStyle={styles.profileImage}
              />
            }
            <View style={styles.handPointer}>
              <FontAwesome
                name="hand-pointer-o"
                size={35}
                color={COLOR.black}
              />
              <GlobalText text={"Click to Update"} />
            </View>
          </TouchableOpacity>
          <View style={styles.profileDetails}>
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

      <Popup
        message={alertMessage}
        visible={isAlert}
        onPress={closePopup}
      />
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
