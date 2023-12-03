import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, BackHandler, Image, ScrollView } from "react-native";
import { SignUpFields } from "../../Services/Constants/FIELDS";
import TextField from "../../Components/Customs/TextField";
import Header from "../../Components/Common/Header";
import CustomButton from "../../Components/Customs/Buttons/TextButton";
import styles from "./Styles";
import { comnGet, comnPost } from "../../Services/Api/CommonServices";
import Loader from "../../Components/Customs/Loader";
import { connect } from "react-redux";
import { setLoader } from "../../Reducers/CommonActions";
import DropDown from "../../Components/Customs/DropDown";
import { navigateTo } from "../../Services/CommonMethods";
import { launchImageLibrary } from 'react-native-image-picker'
import GlobalText from "../../Components/Customs/Text";
import COLOR from "../../Services/Constants/COLORS";
import Popup from "../../Components/Common/Popup";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import Feather from "react-native-vector-icons/Feather";
import FontIcons from "react-native-vector-icons/FontAwesome5";
import STRING from "../../Services/Constants/STRINGS";

const SignUp = ({ navigation, ...props }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [errMsg, setErrorMsg] = useState("");
  const [imageSource, setImageSource] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(STRING.EVENT.HARDWARE_BACK_PRESS, () => navigateTo(navigation, STRING.SCREEN.LOGIN));
    props.setLoader(true);
    getRoles()
    return () => {
      backHandler.remove()
    }
  }, []);

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
    props.setLoader(true);
    const data = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      password_confirmation: cpassword,
      role_id: role.id,
      profile_picture: uploadImage
    };
    console.log('data: ', data);
    comnPost("auth/register", data)
      .then((res) => {
        console.log('res: ', res);
        if (res.data.success) {
          props.setLoader(false);
          setAlertMessage(STRING.ALERT.REGI_SUCCESS);
          setIsAlert(true);
          setIsSuccess(true)
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
  };

  const signInScreen = () => {
    navigateTo(navigation, STRING.SCREEN.LOGIN);
  };

  const closePopup = () => {
    if (isSuccess) {
      navigateTo(navigation, STRING.SCREEN.LOGIN);
    }
    setIsAlert(false)
  }

  return (
    <View style={{ alignItems: "center" }}>
      <ScrollView>
        <Header
          name={""}
          startIcon={<View></View>}
          style={styles.loginHeader}
        />
        <Loader />
        <View>
          <Image style={styles.loginImage} source={require('../../Assets/Images/tour_set.jpg')} />
          <GlobalText text={STRING.SIGN_UP} style={styles.loginText} />
        </View>
        <View style={{ alignItems: "center" }}>
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
                    name={field.isSecure ? 'eye' : 'eye-off'}
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
          <CustomButton
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
    saveAccess_token: (data) => {
      dispatch(saveAccess_token(data));
    },
    setLoader: (data) => {
      dispatch(setLoader(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
