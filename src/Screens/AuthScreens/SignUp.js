import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, BackHandler, Image, ScrollView, ImageBackground, Animated, PermissionsAndroid, KeyboardAvoidingView, Keyboard } from "react-native";
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
import { Dropdown } from "react-native-element-dropdown";
import { useTranslation } from 'react-i18next';
import { CheckBox } from "@rneui/themed";
import PrivacyPolicy from "../../Components/PrivacyPolicy";

const SignUp = ({ navigation, ...props }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const { i18n, t } = useTranslation();

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
  const [showPassword, setShowPassword] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [latitude, setCurrentLatitude] = useState(null);
  const [longitude, setCurrentLongitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [watchID, setWatchID] = useState("");
  const [sec, setSec] = useState(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [nameErr, setNameErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [mobileErr, setMobileErr] = useState(false)
  const [passErr, setPassErr] = useState(false)
  const [cPassErr, setCPassErr] = useState(false)
  const [notValid, setNotValid] = useState(false);
  const [fetchingText, setFetchingText] = useState("")
  const [list, setList] = useState(
    [{ label: 'English', value: 'en' },
    { label: 'मराठी', value: 'mr' },]
  )
  const [language, setLanguage] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(STRING.EVENT.HARDWARE_BACK_PRESS, () => navigateTo(navigation, STRING.SCREEN.AUTH_SCREEN));
    // getRoles()
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      backHandler.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
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
        if (isVal) setNameErr(false)
        else setNameErr(true)
        break;
      case 1:
        setEmail(val.trim());
        if (isVal) setEmailErr(false)
        else setEmailErr(true)
        break;
      case 2:
        setMobile(val);
        if (isVal) setMobileErr(false)
        else setMobileErr(true)
        break;
      case 3:
        setPassword(val.trim());
        if (isVal) setPassErr(false)
        else setPassErr(true)
        break;
      case 4:
        setCpassword(val.trim());
        if (isVal) setCPassErr(false)
        else setCPassErr(true)
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

  const checkValidation = () => {
    if (
      (name == "" || nameErr) ||
      (email == "" || emailErr)
    ) {
      setNotValid(true)
    } else {
      setNotValid(false)
      myLocationPress()
    }
  }

  const Register = (lat, long) => {
    props.setLoader(true);
    const data = {
      name: name,
      email: email,
      mobile: mobile,
      // password: password,
      // password_confirmation: cpassword,
      // role_id: role.id,
      profile_picture: uploadImage,
      latitude: lat.toString(),
      longitude: long.toString(),
      language
    };
    comnPost("v2/auth/register", data)
      .then((res) => {
        if (res.data.success) {
          props.setLoader(false);
          setIsSuccess(true);
          setIsAlert(true);
          setAlertMessage(res.data.message)
          i18n.changeLanguage(language);
        } else {
          props.setLoader(false);
          setAlertMessage(res.data.message.email ? res.data.message.email : res.data.message.mobile ? res.data.message.mobile : res.data.message);
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

  const signInScreen = () => {
    navigateTo(navigation, STRING.SCREEN.EMAIL);
  };

  const closePopup = () => {
    if (alertMessage[0].includes(STRING.TAKEN) || isSuccess) {
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
    props.setLoader(true);
    setFetchingText(STRING.ALERT.FETCHING_TEXT);
    setLocationStatus(STRING.GETTING_LOCATION);
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus(STRING.YOU_ARE_HERE);
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
        Register(currentLatitude, currentLongitude)
        props.setLoader(false)
        setFetchingText("")
      },
      (error) => {
        setLocationStatus(error.message);
        props.setLoader(false)
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 }
    );
  };

  const subscribeLocation = () => {
    let WatchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus(STRING.YOU_ARE_HERE);
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
        props.setLoader(false);
      },
      (error) => {
        setLocationStatus(error.message);
        props.setLoader(false)
      },
      { enableHighAccuracy: false, maximumAge: 1000 }
    );
    setWatchID(WatchID)
  };

  const privacyClicked = () => {
    setIsPrivacyChecked(!isPrivacyChecked)
    setShowPrivacy(true)
    setIsAlert(true)
    setAlertMessage(t("PRIVACY_POLICY"))
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.white }}>
      <ImageBackground style={styles.loginImage} source={require("../../Assets/Images/Intro/login_background.png")} />

      <View style={{ display: isKeyboardVisible ? "none" : "flex" }}>
        <Loader text={fetchingText} />
        <GlobalText text={STRING.WELCOME} style={styles.welcomeText} />
        <GlobalText text={STRING.APPNAME} style={styles.boldKokan} />
      </View>

      <View style={styles.middleFlex}>
        <GlobalText text={STRING.SIGN_UP} style={styles.loginText} />
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
          </View>

          {SignUpFields.map((field, index) => {
            return (
              <TextField
                name={field.name}
                label={field.name}
                leftIcon={
                  <Feather name={field.leftIcon} size={24} style={styles.leftIcon} />
                }
                placeholder={field.placeholder}
                fieldType={field.type}
                length={field.length}
                required={field.required}
                disabled={field.disabled}
                value={getValue(index)}
                setChild={(v, i) => setValue(v, i, index)}
                style={styles.signUpContainerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                isSecure={field.isSecure}
                isError={emailErr}
                rightIcon={
                  field.type == `${STRING.TYPE.PASSWORD}` &&
                  <Feather
                    name={field.isSecure ? "eye" : "eye-off"}
                    size={24}
                    color={COLOR.themeBlue}
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
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.itemTextStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            dropdownTextStyle={styles.dropdownText}
            iconStyle={styles.dropdownIcon}
            data={list}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select item'}
            value={language}
            onChange={item => {
              setLanguage(item.value);
            }}
          />
          {notValid &&
            <GlobalText text={STRING.PLEASE_FILL} style={{ color: "red", marginBottom: -10 }} />
          }
          <View style={{ justifyContent: "flex-start", width: DIMENSIONS.bannerWidth }}>
            <CheckBox title={t("PRIVACY_POLICY")} onPress={() => privacyClicked()} checked={isPrivacyChecked} />
          </View>
          <TextButton
            title={STRING.BUTTON.REGISTER}
            buttonView={styles.buttonView}
            isDisabled={false}
            raised={true}
            onPress={() => checkValidation()}
          />
          <GlobalText text={errMsg} />
          <View style={styles.haveAcc}>
            <GlobalText text={STRING.HAVE_ACC} />
            <TouchableOpacity onPress={() => signInScreen()}>
              <GlobalText text={STRING.SIGN_IN} style={{ fontWeight: "bold" }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      </KeyboardAvoidingView>
      <Popup
        message={alertMessage}
        visible={isAlert}
        onPress={closePopup}
        Component={showPrivacy && <PrivacyPolicy /> }
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
    saveAccess_token: (data) => {
      dispatch(saveAccess_token(data));
    },
    setLoader: (data) => {
      dispatch(setLoader(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
