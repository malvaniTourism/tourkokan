import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, BackHandler, Image } from "react-native";
import TextField from "../../Components/Customs/TextField";
import { SignInFields } from "../../Services/Constants/FIELDS";
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
import SQLite from 'react-native-sqlite-storage'
import Popup from "../../Components/Common/Popup";
import Feather from "react-native-vector-icons/Feather";
import STRING from "../../Services/Constants/STRINGS";

const EmailSignIn = ({ navigation, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    // openDB()
    // createUserTable();
    const backHandler = BackHandler.addEventListener(STRING.EVENT.HARDWARE_BACK_PRESS, () => navigateTo(navigation, STRING.SCREEN.LOGIN));
    return () => {
      backHandler.remove();
      setIsAlert(false);
      setAlertMessage("");
    };
  }, []);

  const openDB = () => {
    const db = SQLite.openDatabase({ name: 'mydb.db', createFromLocation: '~mydata.db' });
    if (db) {
      // Database initialization successful, proceed with queries
    } else {
      console.error('Failed to initialize the database.');
    }
  }

  const createUserTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)'
      );
    });
  }

  const createUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        ['John Doe', 'john@example.com'],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Record inserted successfully.');
          } else {
            console.log('Failed to insert record.');
          }
        }
      );
    });
  }

  const getUserData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users',
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
        break;
    }
  };

  const getValue = (i) => {
    switch (i) {
      case 0:
        return email;
      case 1:
        return password;
    }
  };

  const Login = () => {
    props.setLoader(true);
    const data = {
      email,
      password,
    };
    // createUser()
    comnPost("auth/login", data)
      .then((res) => {
        if (res.data.success) {
          setIsAlert(true);
          setAlertMessage(res.data.message);
          AsyncStorage.setItem(STRING.STORAGE.ACCESS_TOKEN, res.data.data.access_token);
          AsyncStorage.setItem(STRING.STORAGE.USER_ID, res.data.data.user.id);
          props.saveAccess_token(res.data.data.access_token);
          props.setLoader(false);
          setIsSuccess(true)
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
      navigateTo(navigation, STRING.SCREEN.HOME);
      AsyncStorage.setItem(STRING.STORAGE.IS_FIRST_TIME, JSON.stringify(true))
    }
    setIsAlert(false)
  }

  const signUpScreen = () => {
    navigateTo(navigation, STRING.SCREEN.SIGN_UP);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Header
        name={""}
        startIcon={<View></View>}
        style={styles.loginHeader}
      />
      <View>
        <Image style={styles.loginImage} source={require('../../Assets/Images/tour_set.jpg')} />
        <GlobalText text={"Log-in"} style={styles.loginText} />
      </View>
      <Loader />
      {SignInFields.map((field, index) => {
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
      <TextButton
        title={STRING.BUTTON.LOGIN}
        seeMoreStyle={styles.buttonView}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonTitle}
        disabled={false}
        raised={true}
        onPress={() => Login()}
      />
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
