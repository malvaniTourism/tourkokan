import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, BackHandler, ImageBackground, Image } from "react-native";
import TextField from "../../Components/Customs/TextField";
import { Email, OTP, Password, SignInFields } from "../../Services/Constants/FIELDS";
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
import OtpInputs from "react-native-otp-inputs";
// import {
//   getHash,
//   startOtpListener,
//   useOtpVerify,
// } from "react-native-otp-verify";
import Alert from "../../Components/Customs/Alert";
import { navigateTo } from "../../Services/CommonMethods";
import GlobalText from "../../Components/Customs/Text";
import Popup from "../../Components/Common/Popup";
import STRING from "../../Services/Constants/STRINGS";
import AppLogo from "../../Assets/Images/tourKokan.png";
import Feather from "react-native-vector-icons/Feather";

const VerifyOTP = ({ navigation, route, ...props }) => {
  const [otp, setOtp] = useState(null);
  const [email, setEmail] = useState(route.params?.email);
  const [sec, setSec] = useState(30);
  const [isAlert, setIsAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false)
  const [password, setPassword] = useState("");
  const [isNeedOtp, setIsNeedOtp] = useState(true);
  const [choiceText, setChoiceText] = useState(STRING.BUTTON.LOGINPASS);
  const [showPassword, setShowPassword] = useState(false)
  const [isVerified, setIsVerified] = useState(route?.params?.isVerified);
  const [isOtpSent, setIsOtpSent] = useState(false)

  useEffect(() => {
    resend()
    if (!isVerified) {
      setIsOtpSent(true)
    }
    const backHandler = BackHandler.addEventListener(STRING.EVENT.HARDWARE_BACK_PRESS, () => navigateTo(navigation, STRING.SCREEN.AUTH_SCREEN));
    // setInterval(() => timer(), 1000);
    startListeningForOtp();
    return () => {
      backHandler.remove();
      setIsAlert(false);
      setAlertMessage("");
    };
  }, []);

  useEffect(() => {
    let timerInterval;
    if (sec > 0) {
      timerInterval = setInterval(() => {
        setSec(prevSec => prevSec - 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [sec]);

  const loginClick = () => {
    props.setLoader(true);
    let data = {}
    let myUrl = ""
    if (isNeedOtp) {
      data = {
        email,
        otp,
      };
      myUrl = "v2/auth/verifyOtp"
    } else {
      data = {
        email,
        password,
      };
      myUrl = "v2/auth/login"
    }

    comnPost(myUrl, data)
      .then((res) => {
        if (res.data.success) {
          AsyncStorage.setItem(STRING.STORAGE.ACCESS_TOKEN, res.data.data.access_token);
          AsyncStorage.setItem(STRING.STORAGE.USER_ID, res.data.data.user.id);
          props.saveAccess_token(res.data.data.access_token);
          props.setLoader(false);
          AsyncStorage.setItem(STRING.STORAGE.IS_FIRST_TIME, JSON.stringify(true))
          navigateTo(navigation, STRING.SCREEN.HOME);
        } else {
          setIsAlert(true);
          setAlertMessage(res.data.message?.otp ? res.data.message?.otp : res.data.message);
          props.setLoader(false);
          setIsSuccess(false)
        }
      })
      .catch((err) => {
        setIsAlert(true);
        setIsSuccess(false)
        setAlertMessage(STRING.ALERT.WENT_WRONG);
        setIsSuccess(false)
        props.setLoader(false);
      });
  };

  const closePopup = () => {
    setIsAlert(false)
  }

  const resend = () => {
    props.setLoader(true);
    const data = {
      email,
    };
    setOtp(null)
    comnPost("v2/auth/sendOtp", data)
      .then((res) => {
        props.setLoader(false);
        setSec(30);
        setIsOtpSent(true);
      })
      .catch((err) => {
        props.setLoader(false);
      });
  };

  const timer = () => {
    if (sec > 0) {
      setTimeout(() => {
        setSec(sec - 1);
      }, 1000);
    }
  };

  const startListeningForOtp = () => {
    try {
      RNOtpVerify.getOtp()
        .then((p) => RNOtpVerify.addListener(otpHandler))
        .catch((p) => console.log(p));
    } catch (e) {
    }
  };

  const otpHandler = (message) => {
    try {
      if (message) {
        const otp = /(\d{4})/g.exec(message)[1];
        if (otp !== null && otp !== undefined) {
          setOtp(otp);
        }
        RNOtpVerify.removeListener();
      }
    } catch (e) {
    }
  };

  const changeChoice = () => {
    setIsNeedOtp(!isNeedOtp);
    if (!isNeedOtp) {
      setChoiceText(STRING.BUTTON.LOGINPASS)
      resend()
    } else {
      setChoiceText(STRING.BUTTON.LOGINOTP)
    }
  }

  return (
    <View style={styles.verifyOtpView}>
      {/* <ImageBackground style={styles.loginImage} source={require("../../Assets/Images/kokan1.jpeg")} /> */}
      {/* <Header name={STRING.HEADER.VERIFY_OTP} style={{ marginBottom: 50 }}
        startIcon={<></>}
      /> */}
      <View style={styles.appName}>
        <Image source={AppLogo} style={styles.appLogo} />
      </View>

      <Loader />
      <View style={styles.loginContentsBox}>
        <View>
          <View>
            <GlobalText text={STRING.LOG_IN} style={styles.loginText} />
            {/* <GlobalText text={STRING.WE_HAVE_SENT} />
            <GlobalText text={`${STRING.SENT_TO} ${route.params?.email}`} /> */}
          </View>
          {isNeedOtp ?
            <OtpInputs
              style={{ flexDirection: "row" }}
              numberOfInputs={6}
              inputStyles={{
                height: 50,
                width: 40,
                margin: 10,
                backgroundColor: COLOR.white,
                borderWidth: 1,
                borderColor: COLOR.lightGreen,
                textAlign: "center",
                fontSize: 24,
                color: COLOR.lightGreen,
              }}
              inputContainerStyles={{ marginVertical: 10 }}
              autofillFromClipboard={true}
              defaultValue={otp}
              // code={this.state.fillOtp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onChangeText={code => { this.setState({ otp: code }) }}
              handleChange={(code) => {
                setOtp(code);
              }}
            // onCodeChanged={code => { this.setState({ otp: code }) }}
            // autoFocusOnLoad
            // codeInputFieldStyle={styles.underlineStyleBase}
            // codeInputHighlightStyle={styles.underlineStyleHighLighted}
            // onCodeFilled = {(code => this.setState({otp: code}))}
            />
            :
            <View style={{ marginVertical: 12 }}>
              {Password.map((field, index) => {
                return (
                  <TextField
                    name={field.name}
                    label={field.name}
                    placeholder={field.placeholder}
                    fieldType={field.type}
                    length={field.length}
                    required={field.required}
                    disabled={false}
                    value={password}
                    setChild={(v) => setPassword(v)}
                    style={styles.containerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    isSecure={field.isSecure}
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
            </View>}
          {isVerified &&
            <TouchableOpacity onPress={() => changeChoice()}>
              <GlobalText text={choiceText} style={styles.choiceText} />
            </TouchableOpacity>
          }
        </View>
        <TextButton
          title={!isVerified ? STRING.BUTTON.VERIFY : STRING.BUTTON.LOGIN}
          disabled={false}
          raised={true}
          onPress={() => loginClick()}
        />
        <View style={styles.resendContainer}>
          {isNeedOtp &&
            <>
              {sec >= 1 ? (
                <GlobalText text={`${STRING.RESEND_WITHIN}${sec > 9 ? sec : "0" + sec})`} />
              ) : (
                <View>
                  {isOtpSent && <GlobalText text={STRING.DIDNT_RECEIVE} />}
                  <TouchableOpacity onPress={() => resend()}>
                    <GlobalText text={isOtpSent ? STRING.RESEND : STRING.SEND_OTP} style={styles.sendOTPText} />
                  </TouchableOpacity>
                </View>
              )}
            </>
          }
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
    loader: state.commonState.loader,
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);
