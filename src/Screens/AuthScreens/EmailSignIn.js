import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import TextField from "../../Components/Customs/TextField";
import { SignInFields } from "../../Services/Constants/FIELDS";
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
import { navigateTo } from "../../Services/CommonMethods";
import GlobalText from "../../Components/Customs/Text";
import SQLite from 'react-native-sqlite-storage'
import Popup from "../../Components/Common/Popup";

const EmailSignIn = ({ navigation, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // openDB()
    // createUserTable();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => navigateTo(navigation, 'Login'));
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
    console.log(data);
    comnPost("auth/login", data)
      .then((res) => {
        console.log('1', res.data);
        if (res.data.success) {
          setIsAlert(true);
          setAlertMessage(res.data.message);
          AsyncStorage.setItem("access_token", res.data.data.access_token);
          AsyncStorage.setItem("userId", res.data.data.user.id);
          props.saveAccess_token(res.data.data.access_token);
          props.setLoader(false);
          setIsSuccess(true)
        } else {
          setIsAlert(true);
          setAlertMessage(res.data.message);
          props.setLoader(false);
          setIsSuccess(false)
        }
      })
      .catch((err) => {
        setIsAlert(true);
        setIsSuccess(false)
        setAlertMessage("Something went wrong...");
        props.setLoader(false);
      });
  };

  const closePopup = () => {
    if (isSuccess) {
      navigateTo(navigation, "Home");
      AsyncStorage.setItem("isFirstTime", true)
    }
    setIsAlert(false)
  }

  const signUpScreen = () => {
    navigateTo(navigation, "SignUp");
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
          />
        );
      })}
      <CustomButton
        title={"Login"}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonTitle}
        disabled={false}
        raised={true}
        type={"Submit"}
        onPress={() => Login()}
      />
      <View style={styles.haveAcc}>
        <GlobalText text={"Don't have an Account? "} />
        <TouchableOpacity onPress={() => signUpScreen()}>
          <GlobalText text={" Sign Up"} />
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
