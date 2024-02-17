import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, BackHandler, ImageBackground, Image } from "react-native";
import TextField from "../../Components/Customs/TextField";
import { OTP, SignInFields } from "../../Services/Constants/FIELDS";
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

const VerifyOTP = ({ navigation, route, ...props }) => {
  const [otp, setOtp] = useState(1234);
  const [mobile, setMobile] = useState(route.params.mobile);
  const [sec, setSec] = useState(30);
  const [isAlert, setIsAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(STRING.EVENT.HARDWARE_BACK_PRESS, () => navigateTo(navigation, STRING.SCREEN.EMAIL_SIGN_IN));
    // setInterval(() => timer(), 1000);
    startListeningForOtp();
    return () => {
      backHandler.remove();
      setIsAlert(false);
      setAlertMessage("");
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      timer();
    }, 1000);
  }, [sec]);

  const verifyOtp = () => {
    props.setLoader(true);
    const data = {
      mobile,
      otp,
    };
    comnPost("auth/verifyOtp", data)
      .then((res) => {
        if (res.data.success) {
          setIsAlert(true);
          setAlertMessage(res.data.message);
          AsyncStorage.setItem(STRING.STORAGE.ACCESS_TOKEN, res.data.data.access_token);
          AsyncStorage.setItem(STRING.STORAGE.USER_ID, res.data.data.user.id);
          props.saveAccess_token(res.data.data.access_token);
          props.setLoader(false);
          isSuccess(true)
        } else {
          setIsAlert(true);
          setAlertMessage(res.data.message);
          props.setLoader(false);
          isSuccess(false)
        }
      })
      .catch((err) => {
        setIsAlert(true);
        setIsSuccess(false)
        setAlertMessage(STRING.ALERT.WENT_WRONG);
        props.setLoader(false);
        isSuccess(false)
      });
  };

  const closePopup = () => {
    if (isSuccess) {
      AsyncStorage.setItem(STRING.STORAGE.IS_FIRST_TIME, JSON.stringify(true))
      navigateTo(navigation, STRING.SCREEN.HOME);
    }
    setIsAlert(false)
  }

  const resend = () => {
    props.setLoader(true);
    const data = {
      mobile,
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

  const timer = () => {
    if (sec) {
      setSec(sec - 1);
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

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <ImageBackground style={styles.loginImage} source={require("../../Assets/Images/kokan1.jpeg")} />
      {/* <Header name={STRING.HEADER.VERIFY_OTP} style={{ marginBottom: 50 }}
        startIcon={<></>}
      /> */}
      <View style={styles.appName}>
        <Image source={AppLogo} style={styles.appLogo} />
      </View>

      <Loader />
      <View style={styles.loginContentsBox}>
        <FontIcons
          name="user-circle"
          color={COLOR.white}
          size={DIMENSIONS.userIconSize}
          style={styles.appLogo}
        />
        <View>
          <View style={{ marginLeft: "10%" }}>
            <GlobalText text={STRING.OTP_VERIFICATION} style={styles.whiteText} />
            <GlobalText text={STRING.WE_HAVE_SENT} style={styles.whiteText} />
            <GlobalText text={`${STRING.SENT_TO} ${route.params.mobile}`} style={styles.whiteText} />
          </View>
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
            inputContainerStyles={{ marginVertical: 45 }}
            // autofillFromClipboard={true}
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
        </View>
        <TextButton
          title={STRING.BUTTON.VERIFY}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
          disabled={false}
          raised={true}
          onPress={() => verifyOtp()}
        />
        <View style={{marginVertical: 10}}>
          {sec >= 1 ? (
            <GlobalText text={`${STRING.RESEND_WITHIN}${sec > 9 ? sec : "0" + sec})`} style={styles.whiteText} />
          ) : (
            <View>
              <GlobalText style={styles.whiteText} text={STRING.DIDNT_RECEIVE} />
              <TouchableOpacity onPress={() => resend()}>
                <GlobalText text={STRING.RESEND} style={styles.whiteText} />
              </TouchableOpacity>
            </View>
          )}
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
