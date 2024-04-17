import React, { useEffect, useState } from "react";
import { FlatList, View, Text, SafeAreaView } from "react-native";
import { ListItem } from "@rneui/themed";
import Header from "../Components/Common/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import COLOR from "../Services/Constants/COLORS";
import DIMENSIONS from "../Services/Constants/DIMENSIONS";
import RouteLine from "../Components/Customs/RouteLines/RouteLine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backPage, checkLogin, goBackHandler, navigateTo } from "../Services/CommonMethods";
import { ContactUsFields } from "../Services/Constants/FIELDS";
import TextField from "../Components/Customs/TextField";
import TextButton from "../Components/Customs/Buttons/TextButton";
import styles from "./Styles";
import { comnPost } from "../Services/Api/CommonServices";
import Popup from "../Components/Common/Popup";
import Loader from "../Components/Customs/Loader";
import { setLoader } from "../Reducers/CommonActions";
import { connect } from "react-redux";
import STRING from "../Services/Constants/STRINGS";
import { useTranslation } from 'react-i18next';

const ContactUs = ({ navigation, route, ...props }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlert, setIsAlert] = useState(false)

  useEffect(async () => {
    setEmail(await AsyncStorage.getItem(STRING.STORAGE.USER_EMAIL))
    const backHandler = goBackHandler(navigation)
    checkLogin(navigation)
    return () => {
      backHandler.remove()
    }
  }, []);

  const setValue = (val, isVal, index) => {
    switch (index) {
      case 0:
        setEmail(val);
        break;
      case 1:
        setPhone(val);
        break;
      case 2:
        setMessage(val);
        break;
    }
  };

  const getValue = (i) => {
    switch (i) {
      case 0:
        return email;
      case 1:
        return phone;
      case 2:
        return message;
    }
  };

  const submit = async () => {
    props.setLoader(true);
    let data = {
      user_id: await AsyncStorage.getItem(STRING.STORAGE.USER_ID),
      name: await AsyncStorage.getItem(STRING.STORAGE.USER_NAME),
      email,
      phone,
      message
    }

    comnPost("v2/addQuery", data)
      .then(res => {
        setIsAlert(true);
        setAlertMessage(res.data.message);
        props.setLoader(false);
        setEmail("")
        setPhone("")
        setMessage("")
      })
      .catch(err => {
        setIsAlert(true);
        setAlertMessage(STRING.ALERT.FAILED);
        props.setLoader(false);
      })
  }

  const closePopup = () => {
    setIsAlert(false)
  }

  return (
    <View style={{ backgroundColor: COLOR.white }}>
      <Header
        name={STRING.HEADER.CONTACT_US}
        goBack={() => backPage(navigation)}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            size={24}
            onPress={() => backPage(navigation)}
            color={COLOR.black}
          />
        }
        endIcon={
          <></>
        }
      />
      <Loader />
      <SafeAreaView style={{ alignItems: "center", height: DIMENSIONS.screenHeight, backgroundColor: COLOR.white }}>
        {ContactUsFields.map((field, index) => {
          return (
            <TextField
              name={field.name}
              label={field.name}
              placeholder={field.placeholder}
              fieldType={field.type}
              length={field.length}
              required={field.required}
              disabled={index == 0}
              value={getValue(index)}
              setChild={(v, i) => setValue(v, i, index)}
              style={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              multiline={field.multiline}
            />
          );
        })}
        <TextButton
          title={STRING.BUTTON.SUBMIT}
          buttonView={styles.buttonView}
          containerStyle={styles.contactButtonContainer}
          buttonStyle={styles.contactButtonStyle}
          titleStyle={styles.buttonTitle}
          disabled={false}
          raised={true}
          onPress={() => submit()}
        />
      </SafeAreaView>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: (data) => {
      dispatch(setLoader(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
