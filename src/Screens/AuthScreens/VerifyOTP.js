import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import TextField from "../../Components/Customs/TextField";
import { OTP, SignInFields } from "../../Services/Constants/FIELDS";
import Header from "../../Components/Common/Header";
import CustomButton from "../../Components/Customs/Button";
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
import {
  getHash,
  startOtpListener,
  useOtpVerify,
} from "react-native-otp-verify";
import Alert from "../../Components/Customs/Alert";
import { navigateTo } from "../../Services/CommonMethods";
import GlobalText from "../../Components/Customs/Text";
import Popup from "../../Components/Common/Popup";

const VerifyOTP = ({ navigation, route, ...props }) => {
  const [otp, setOtp] = useState(1234);
  const [mobile, setMobile] = useState(route.params.mobile);
  const [sec, setSec] = useState(30);
  const [isAlert, setIsAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => navigateTo(navigation, 'Login'));
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
          AsyncStorage.setItem("access_token", res.data.data.access_token);
          AsyncStorage.setItem("userId", res.data.data.user.id);
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
        setAlertMessage("Something went wrong...");
        props.setLoader(false);
        isSuccess(false)
      });
  };

  const closePopup = () => {
    if (isSuccess) {
      navigateTo(navigation, "Home");
      AsyncStorage.setItem("isFirstTime", true)
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
    <View style={{ alignItems: "center" }}>
      <Header name={"Verify OTP"} style={{ marginBottom: 50 }}
        startIcon={<></>}
      />
      <Loader />
      <FontIcons
        name="user-circle"
        color={COLOR.black}
        size={DIMENSIONS.userIconSize}
        style={styles.appLogo}
      />
      <View>
        <View style={{ marginTop: "5%", marginLeft: "10%" }}>
          <GlobalText text={"OTP Verification"} style={styles.otpHead} />
          <GlobalText text={"We have sent an OTP to verify your phone number."} style={styles.otpSubHead} />
          <GlobalText text={`Sent to +91 ${route.params.mobile}`} style={styles.otpMobile} />
        </View>
        <OtpInputs
          style={{ flexDirection: "row" }}
          numberOfInputs={6}
          inputStyles={{
            height: 50,
            width: 40,
            margin: 10,
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: "#26AE60",
            textAlign: "center",
            fontSize: 24,
            color: "#26AE60",
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
      <CustomButton
        title={"Verify"}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonTitle}
        disabled={false}
        raised={true}
        type={"Submit"}
        onPress={() => verifyOtp()}
      />
      {sec >= 1 ? (
        <GlobalText text={`You can resend your OTP within (00:${sec > 9 ? sec : "0" + sec})`} style={styles.countertext} />
      ) : (
        <View>
          <GlobalText text={"I didn't receive a code"} />
          <TouchableOpacity onPress={() => resend()}>
            <GlobalText text={"Resend"} style={styles.counterText1} />
          </TouchableOpacity>
        </View>
      )}
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
