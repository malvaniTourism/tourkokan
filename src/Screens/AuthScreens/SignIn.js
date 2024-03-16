import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, BackHandler, ToastAndroid, Image, StatusBar, ImageBackground } from "react-native";
import TextField from "../../Components/Customs/TextField";
import { MobileNo, SignInFields } from "../../Services/Constants/FIELDS";
import Header from "../../Components/Common/Header";
import TextButton from "../../Components/Customs/Buttons/TextButton";
import styles from "./Styles";
import { comnPost } from "../../Services/Api/CommonServices";
import { connect } from "react-redux";
import { saveAccess_token, setLoader } from "../../Reducers/CommonActions";
import Loader from "../../Components/Customs/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontIcons from "react-native-vector-icons/FontAwesome5";
import COLOR from "../../Services/Constants/COLORS";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import Alert from "../../Components/Customs/Alert";
import { exitApp, navigateTo } from "../../Services/CommonMethods";
import GlobalText from "../../Components/Customs/Text";
import Popup from "../../Components/Common/Popup";
import Feather from "react-native-vector-icons/Feather";
import STRING from "../../Services/Constants/STRINGS";
import AppLogo from "../../Assets/Images/tourKokan.png";

const SignIn = ({ navigation, ...props }) => {
  const [mobile, setMobile] = useState("");
  const [isAlert, setIsAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [successAlert, setSuccessAlert] = useState(false)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(STRING.EVENT.HARDWARE_BACK_PRESS, () => exitApp());
    return () => {
      backHandler.remove();
      setIsAlert(false);
      setAlertMessage("");
    };
  }, []);

  const setValue = (val, isVal, index) => {
    switch (index) {
      case 0:
        setMobile(val);
        break;
    }
  };

  const getValue = (i) => {
    switch (i) {
      case 0:
        return mobile;
    }
  };

  const sendOTP = () => {
    props.setLoader(true);
    const data = {
      mobile,
    };
    comnPost("v2/auth/sendOtp", data)
      .then((res) => {
        if (res.data.success) {
          setIsAlert(true);
          setAlertMessage(res.data.message);
          props.setLoader(false);
          setSuccessAlert(true)
        } else {
          if (res.data.message.mobile) {
            setIsAlert(true);
            setAlertMessage(res.data.message.mobile[0]);
            props.setLoader(false);
          }
        }
      })
      .catch((err) => {
        props.setLoader(false);
        setIsAlert(true);
        setAlertMessage(STRING.ALERT.WENT_WRONG);
      });
  };

  const closePopup = () => {
    setIsAlert(false)
  }

  const proceed = () => {
    setIsAlert(false)
    navigateTo(navigation, STRING.SCREEN.VERIFY_OTP, { mobile });
  }

  const signUpScreen = () => {
    navigateTo(navigation, STRING.SCREEN.SIGN_UP);
  };

  const emailLogin = () => {
    navigateTo(navigation, STRING.SCREEN.EMAIL_SIGN_IN);
  };

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <ImageBackground style={styles.loginImage} source={require("../../Assets/Images/kokan1.jpeg")} />
      {/* <Header
        name={""}
        startIcon={<View></View>}
        style={styles.loginHeader}
      /> */}

      <View style={styles.appName}>
        <Image source={AppLogo} style={styles.appLogo} />
      </View>

      <Loader />
      <View style={styles.loginContentsBox}>
        <GlobalText text={STRING.LOG_IN} style={styles.loginText} />
        {MobileNo.map((field, index) => {
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
            />
          );
        })}
        <TextButton
          title={STRING.BUTTON.SEND_OTP}
          seeMoreStyle={styles.buttonView}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
          disabled={false}
          raised={true}
          onPress={() => sendOTP()}
        />

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <GlobalText text={STRING.OR} style={styles.whiteText} />
          <TextButton
            title={STRING.BUTTON.LOGIN_WITH_EMAIL}
            seeMoreStyle={styles.buttonView}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
            disabled={false}
            raised={true}
            onPress={() => emailLogin()}
          />
        </View>

        <View style={styles.haveAcc}>
          <GlobalText style={styles.whiteText} text={STRING.DONT_HAVE_ACC} />
          <TouchableOpacity onPress={() => signUpScreen()}>
            <GlobalText style={styles.whiteText} text={STRING.SIGN_UP} />
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
