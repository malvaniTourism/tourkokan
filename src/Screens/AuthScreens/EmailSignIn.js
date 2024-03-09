import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, BackHandler, Image, ImageBackground } from "react-native";
import TextField from "../../Components/Customs/TextField";
import { Email, SignInFields } from "../../Services/Constants/FIELDS";
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
import { navigateTo } from "../../Services/CommonMethods";
import GlobalText from "../../Components/Customs/Text";
import SQLite from "react-native-sqlite-storage"
import Popup from "../../Components/Common/Popup";
import STRING from "../../Services/Constants/STRINGS";
import AppLogo from "../../Assets/Images/tourKokan.png";
import EmailPassword from "./LoginComponents/EmailPassword";
import LoginChoice from "./LoginComponents/LoginChoice";
import EmailOtp from "./LoginComponents/EmailOtp";

const EmailSignIn = ({ navigation, route, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOtp, setIsOtp] = useState(route.params?.isOtp || false);
  const [isPassword, setIsPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    // openDB()
    // createUserTable();
    const backHandler = BackHandler.addEventListener(STRING.EVENT.HARDWARE_BACK_PRESS, () => navigateTo(navigation, STRING.SCREEN.EMAIL_SIGN_IN));
    return () => {
      backHandler.remove();
      setIsAlert(false);
      setAlertMessage("");
    };
  }, []);

  const openDB = () => {
    const db = SQLite.openDatabase({ name: "mydb.db", createFromLocation: "~mydata.db" });
    if (db) {
      // Database initialization successful, proceed with queries
    } else {
      console.error("Failed to initialize the database.");
    }
  }

  const createUserTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)"
      );
    });
  }

  const createUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        ["John Doe", "john@example.com"],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log("Record inserted successfully.");
          } else {
            console.log("Failed to insert record.");
          }
        }
      );
    });
  }

  const getUserData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users",
        [],
        (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i++) {
            const { id, name, email } = results.rows.item(i);
            console.log(`User ${id}: ${name} (${email})`);
          }
        }
      );
    });
  }

  const setValue = (val, isVal, index) => {
    switch (index) {
      case 0:
        setEmail(val);
        break;
      case 1:
        setPassword(val);
        setOtp(val)
        break;
    }
    if (val == "" || val == null) setIsButtonDisabled(true)
    else setIsButtonDisabled(false)
  };

  const getValue = (i) => {
    switch (i) {
      case 0:
        return email;
      case 1:
        return password;
    }
  };

  const getOtpValue = (i) => {
    switch (i) {
      case 0:
        return email;
      case 1:
        return otp;
    }
  };

  const verifyOtp = () => {
    props.setLoader(true);
    const data = {
      email,
      otp,
    };
    comnPost("auth/verifyOtp", data)
      .then((res) => {
        if (res.data.success) {
          // setIsAlert(true);
          // setAlertMessage(res.data.message);
          AsyncStorage.setItem(STRING.STORAGE.ACCESS_TOKEN, res.data.data.access_token);
          AsyncStorage.setItem(STRING.STORAGE.USER_ID, res.data.data.user.id);
          props.saveAccess_token(res.data.data.access_token);
          props.setLoader(false);
          // setIsSuccess(true)
          AsyncStorage.setItem(STRING.STORAGE.IS_FIRST_TIME, JSON.stringify(true))
          navigateTo(navigation, STRING.SCREEN.HOME);
        } else {
          setIsAlert(true);
          setAlertMessage(res.data.message.email ? res.data.message.email : res.data.message);
          props.setLoader(false);
          setIsSuccess(false)
        }
      })
      .catch((err) => {
        setIsAlert(true);
        setIsSuccess(false)
        setAlertMessage(STRING.ALERT.WENT_WRONG);
        props.setLoader(false);
      });
  };

  const closePopup = () => {
    if (isSuccess) {
      AsyncStorage.setItem(STRING.STORAGE.IS_FIRST_TIME, JSON.stringify(true))
      navigateTo(navigation, STRING.SCREEN.HOME);
    }
    setIsAlert(false)
  }

  const signUpScreen = () => {
    navigateTo(navigation, STRING.SCREEN.SIGN_UP);
  };

  const selectOtp = () => {
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
    navigateTo(navigation, STRING.SCREEN.VERIFY_OTP, { email })
  }

  const selectPassword = () => {
    navigateTo(navigation, STRING.SCREEN.PASSWORD_LOGIN, { email })
  }

  return (
    <View style={{ alignItems: "center" }}>
      {/* <ImageBackground style={styles.loginImage} source={require("../../Assets/Images/kokan1.jpeg")} /> */}
      {/* <Header
        name={""}
        startIcon={<View></View>}
        style={styles.loginHeader}
      /> */}

      <View style={styles.appName}>
        <Image source={AppLogo} style={styles.appLogo} />
      </View>

      <Loader />
      <View style={{ justifyContent: "center", padding: 10 }}>
        <GlobalText text={STRING.LOG_IN} style={styles.loginText} />
        <GlobalText text={STRING.LOG_IN_SUB} style={styles.loginSubText} />
        {Email.map((field, index) => {
          return (
            <TextField
              name={field.name}
              label={field.name}
              placeholder={field.placeholder}
              fieldType={field.type}
              length={field.length}
              required={field.required}
              disabled={false}
              value={getValue(index)}
              setChild={(v, i) => setValue(v, i, index)}
              style={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              isSecure={field.isSecure}
            />
          );
        })}
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: DIMENSIONS.bannerWidth, alignSelf: "center" }}>
          <TextButton
            title={STRING.BUTTON.OTP}
            seeMoreStyle={styles.buttonView}
            containerStyle={styles.choiceButtonContainer}
            buttonStyle={styles.choiceButtonStyle}
            titleStyle={styles.buttonTitle}
            isDisabled={isButtonDisabled}
            raised={true}
            onPress={() => selectOtp()}
          />
          <TextButton
            title={STRING.BUTTON.PASSWORD}
            seeMoreStyle={styles.buttonView}
            containerStyle={styles.choiceButtonContainer}
            buttonStyle={styles.choiceButtonStyle}
            titleStyle={styles.buttonTitle}
            isDisabled={isButtonDisabled}
            raised={true}
            onPress={() => selectPassword()}
          />
        </View>
      </View>
      <View style={styles.haveAcc}>
        <GlobalText text={STRING.DONT_HAVE_ACC} />
        <TouchableOpacity onPress={() => signUpScreen()}>
          <GlobalText text={STRING.SIGN_UP} />
        </TouchableOpacity>
      </View>

      <Popup
        message={alertMessage}
        onPress={closePopup}
        visible={isAlert}
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailSignIn);
