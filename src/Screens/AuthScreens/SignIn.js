import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TextField from "../../Components/Customs/TextField";
import { MobileNo, SignInFields } from "../../Services/Constants/FIELDS";
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
import Alert from "../../Components/Customs/Alert";

const SignIn = ({ navigation, ...props }) => {
  const [mobile, setMobile] = useState("");
  const [isAlert, setIsAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    return () => {
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
    comnPost("auth/sendOtp", data)
      .then((res) => {
        if (res.data.success) {
          setIsAlert(true);
          setAlertMessage(res.data.message);
          props.setLoader(false);
          navigation.navigate("VerifyOTP", { mobile });
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
      });
  };

  const signUpScreen = () => {
    navigation.navigate("SignUp");
  };

  const emailLogin = () => {
    navigation.navigate("EmailSignIn");
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Header
        name={"Login"}
        style={{ marginBottom: 50 }}
        startIcon={<View></View>}
      />
      <Loader />
      <FontIcons
        name="user-circle"
        color={COLOR.black}
        size={DIMENSIONS.userIconSize}
        style={styles.appLogo}
      />
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
          />
        );
      })}
      <CustomButton
        title={"Send OTP"}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonTitle}
        disabled={false}
        raised={true}
        type={"Submit"}
        onPress={() => sendOTP()}
      />

      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Text style={{ marginBottom: 20 }}>---------- OR ----------</Text>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            paddingHorizontal: 25,
            backgroundColor: COLOR.themeDarkGreen,
          }}
          onPress={() => emailLogin()}
        >
          <Text style={{ color: COLOR.white }}>Login with Email</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.haveAcc}>
        <Text>Don't have an Account? </Text>
        <TouchableOpacity onPress={() => signUpScreen()}>
          <Text> Sign Up</Text>
        </TouchableOpacity>
      </View>

      {isAlert && (
        <Alert
          alertMessage={alertMessage}
          closeAlert={() => setIsAlert(false)}
        />
      )}
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
