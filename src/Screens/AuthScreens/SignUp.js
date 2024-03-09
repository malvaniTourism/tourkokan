import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, BackHandler, Image, ScrollView, ImageBackground, Animated, PermissionsAndroid } from "react-native";
import { OTP, SignUpFields } from "../../Services/Constants/FIELDS";
import TextField from "../../Components/Customs/TextField";
import Header from "../../Components/Common/Header";
import TextButton from "../../Components/Customs/Buttons/TextButton";
import styles from "./Styles";
import { comnGet, comnPost } from "../../Services/Api/CommonServices";
import Loader from "../../Components/Customs/Loader";
import { connect } from "react-redux";
import { setLoader, saveAccess_token } from "../../Reducers/CommonActions";
import DropDown from "../../Components/Customs/DropDown";
import { navigateTo } from "../../Services/CommonMethods";
import { launchImageLibrary } from "react-native-image-picker"
import GlobalText from "../../Components/Customs/Text";
import COLOR from "../../Services/Constants/COLORS";
import Popup from "../../Components/Common/Popup";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import Feather from "react-native-vector-icons/Feather";
import FontIcons from "react-native-vector-icons/FontAwesome5";
import IonIcons from "react-native-vector-icons/Ionicons";
import STRING from "../../Services/Constants/STRINGS";
import * as Animatable from 'react-native-animatable';
import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation, ...props }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [otp, setOtp] = useState([]);
  const [errMsg, setErrorMsg] = useState("");
  const [imageSource, setImageSource] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [latitude, setCurrentLatitude] = useState(null);
  const [longitude, setCurrentLongitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [watchID, setWatchID] = useState("");
  const [sec, setSec] = useState(30);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(STRING.EVENT.HARDWARE_BACK_PRESS, () => navigateTo(navigation, STRING.SCREEN.EMAIL_SIGN_IN));
    props.setLoader(true);
    getRoles()
    return () => {
      backHandler.remove();
    }
  }, []);


  useEffect(() => {
    const animateRipple = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start(animateRipple);
    };

    animateRipple();

    return () => {
      // Cleanup on component unmount
      Animated.timing(opacity).stop();
    };
  }, [opacity]);

  const getRoles = () => {
    comnGet("v2/roleDD")
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
      case 3:
        setPassword(val);
        break;
      case 4:
        setCpassword(val);
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
      case 3:
        return password;
      case 4:
        return cpassword;
      default:
        return role;
    }
  };

  const handleImageUpload = () => {
    launchImageLibrary(
      {
        mediaType: `${STRING.TYPE.PHOTO}`,
        includeBase64: true,
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

  const Register = () => {
    if (latitude == null || longitude == null) {
      setLocationError(true)
    } else {
      props.setLoader(true);
      const data = {
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        password_confirmation: cpassword,
        role_id: role.id,
        profile_picture: uploadImage,
        latitude,
        longitude
      };
      comnPost("auth/register", data)
        .then((res) => {
          if (res.data.success) {
            props.setLoader(false);
            setIsVerify(true);
            setIsSuccess(false);
            setTimeout(() => {
              timer();
            }, 1000);
          } else {
            props.setLoader(false);
            setAlertMessage(res.data.message.email ? res.data.message.email : res.data.message.mobile ? res.data.message.mobile : res.data.message.profile_picture);
            setIsSuccess(false)
            setIsAlert(true);
          }
        })
        .catch((err) => {
          props.setLoader(false);
          setIsAlert(true);
          setIsSuccess(false)
          setAlertMessage(STRING.ALERT.WENT_WRONG);
        });
    }
  };

  const verifyOtp = () => {
    props.setLoader(true);
    const data = {
      email,
      otp
    };
    comnPost("auth/verifyOtp", data)
      .then((res) => {
        if (res.data.success) {
          props.setLoader(false);
          AsyncStorage.setItem(STRING.STORAGE.ACCESS_TOKEN, res.data.data.access_token);
          AsyncStorage.setItem(STRING.STORAGE.USER_ID, res.data.data.user.id);
          props.saveAccess_token(res.data.data.access_token);
          setIsVerify(false);
          // setAlertMessage(STRING.ALERT.REGI_SUCCESS);
          // setIsAlert(true);
          // setIsSuccess(true)
          AsyncStorage.setItem(STRING.STORAGE.IS_FIRST_TIME, JSON.stringify(true))
          navigateTo(navigation, STRING.SCREEN.HOME);
        } else {
          props.setLoader(false);
          setAlertMessage(res.data.message.email ? res.data.message.email : res.data.message.mobile ? res.data.message.mobile : res.data.message.otp ? res.data.message.otp : res.data.message);
          setIsSuccess(false)
          setIsAlert(true);
        }
      })
      .catch((err) => {
        props.setLoader(false);
        setIsAlert(true);
        setIsSuccess(false)
        setAlertMessage(STRING.ALERT.WENT_WRONG);
      });
  };

  const resend = () => {
    props.setLoader(true);
    const data = {
      email,
    };
    comnPost("auth/sendOtp", data)
      .then((res) => {
        props.setLoader(false);
        setSec(30);
      })
      .catch((err) => {
        props.setLoader(false);
      });
  };

  const signInScreen = () => {
    navigateTo(navigation, STRING.SCREEN.EMAIL_SIGN_IN);
  };

  const closePopup = () => {
    console.log('alertMessage:: ', alertMessage);
    if (isSuccess) {
      AsyncStorage.setItem(STRING.STORAGE.IS_FIRST_TIME, JSON.stringify(true))
      navigateTo(navigation, STRING.SCREEN.HOME);
    } else if (alertMessage[0].includes("email has already")) {
      props.setLoader(true)
      const data = {
        email,
      };
      comnPost("auth/sendOtp", data)
        .then((res) => {
          props.setLoader(false);
          setSec(30);
        })
        .catch((err) => {
          props.setLoader(false);
        });
      navigateTo(navigation, STRING.SCREEN.VERIFY_OTP, { email });
    }
    setIsAlert(false)
  }

  const myLocationPress = async () => {
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
  }

  const getOneTimeLocation = () => {
    setLocationStatus(STRING.GETTING_LOCATION);
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus(STRING.YOU_ARE_HERE);
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
        setLocationError(false)
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
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
        setLocationError(false)
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, maximumAge: 1000 }
    );
    setWatchID(WatchID)
  };

  const timer = () => {
    if (sec) {
      setSec(sec - 1);
    }
  };

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      {/* <ImageBackground style={styles.loginImage} source={require("../../Assets/Images/kokan1.jpeg")} /> */}

      <Loader />
      <View style={{ marginTop: 20 }}>
        <ScrollView>
          {/* <Header
          name={""}
          startIcon={<View></View>}
          style={styles.loginHeader}
        /> */}
          <GlobalText text={STRING.SIGN_UP} style={styles.loginText} />
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
              <TouchableOpacity
                style={styles.imageContainerStyle}
                onPress={handleImageUpload}
              >
                {imageSource ?
                  <Image
                    source={{ uri: imageSource }}
                    style={styles.imageSourceView}
                  />
                  :
                  <FontIcons
                    name="user-circle"
                    color={COLOR.themeComicBlue}
                    size={DIMENSIONS.iconLarge}
                    style={styles.userIcon}
                  />
                }
              </TouchableOpacity>
              <TouchableOpacity
                style={locationError ? styles.errorImageContainerStyle : styles.imageContainerStyle}
                onPress={myLocationPress}
              >
                {/* <Animated.View
                  style={{
                    width: DIMENSIONS.iconLarge,
                    height: DIMENSIONS.iconLarge,
                    borderRadius: 150,
                    backgroundColor: '#bfbfbf',
                    opacity: opacity,
                  }}
                > */}
                {locationError ?
                  <IonIcons
                    name="location"
                    color={COLOR.red}
                    size={DIMENSIONS.iconLarge}
                    style={styles.userIcon}
                  />
                  :
                  <IonIcons
                    name="location"
                    color={COLOR.themeComicBlue}
                    size={DIMENSIONS.iconLarge}
                    style={styles.userIcon}
                  />
                }
                {/* </Animated.View> */}
              </TouchableOpacity>
            </View>

            <DropDown
              setChild={(v, i) => setValue(v, i)}
              name={STRING.ROLE}
              label={STRING.ROLE}
              value={role}
              disable={false}
              style={styles.roleDropDown}
              fieldType={STRING.TYPE.DROP_DWN}
              helperMsg={STRING.SELECT_ROLE}
              List={roles}
              parentDetails={{ label: "role" }}
              selectedTextStyle={styles.selectedTextStyle}
            />
            {SignUpFields.map((field, index) => {
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
                  inputContainerStyle={styles.inputContainerStyle}
                  isSecure={field.isSecure}
                  rightIcon={
                    field.type == `${STRING.TYPE.PASSWORD}` &&
                    <Feather
                      name={field.isSecure ? "eye" : "eye-off"}
                      size={24}
                      color={COLOR.themeComicBlue}
                      onPress={() => {
                        field.isSecure = !showPassword
                        setShowPassword(!showPassword)
                      }}
                      style={styles.eyeIcon}
                    />
                  }
                />
              );
            })}
            <TextButton
              title={STRING.BUTTON.REGISTER}
              seeMoreStyle={styles.buttonView}
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonTitle}
              disabled={false}
              raised={true}
              onPress={() => Register()}
            />
            <GlobalText text={errMsg} />
            <View style={styles.haveAcc}>
              <GlobalText text={STRING.HAVE_ACC} />
              <TouchableOpacity onPress={() => signInScreen()}>
                <GlobalText text={STRING.SIGN_IN} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Popup
          message={STRING.ALERT.OTP_SENT}
          visible={isVerify}
          Component={
            <View>
              {OTP.map((field, index) => {
                return (
                  <TextField
                    name={field.name}
                    label={field.name}
                    placeholder={field.placeholder}
                    fieldType={field.type}
                    length={field.length}
                    required={field.required}
                    disabled={field.disabled}
                    value={otp}
                    setChild={(v) => setOtp(v)}
                    style={styles.otpContainerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    isSecure={field.isSecure}
                  />
                );
              })}
              <View style={{ marginVertical: 10 }}>
                {sec >= 1 ? (
                  <GlobalText text={`${STRING.RESEND_WITHIN}${sec > 9 ? sec : "0" + sec})`} style={styles.whiteText} />
                ) : (
                  <View>
                    <GlobalText text={STRING.DIDNT_RECEIVE} />
                    <TouchableOpacity onPress={() => resend()}>
                      <GlobalText text={STRING.RESEND} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          }
          onPress={verifyOtp}
          toggleOverlay={() => setIsVerify(false)}
        />
        <Popup
          message={alertMessage}
          visible={isAlert}
          onPress={closePopup}
        />
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
    saveAccess_token: (data) => {
      dispatch(saveAccess_token(data));
    },
    setLoader: (data) => {
      dispatch(setLoader(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
