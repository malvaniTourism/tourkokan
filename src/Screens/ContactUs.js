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
import CustomButton from "../Components/Customs/Button";
import styles from "./Styles";

const ContactUs = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
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
        setMobile(val);
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
        return mobile;
      case 2:
        return message;
    }
  };

  const submit = () => {

  }

  return (
    <View>
      <Header
        name="Contact Us"
        goBack={() => backPage(navigation)}
        startIcon={
          <Ionicons
            name="chevron-back-outline"
            size={24}
            onPress={() => backPage(navigation)}
            color={COLOR.white}
          />
        }
        endIcon={
          <></>
        }
      />
      <SafeAreaView style={{alignItems: "center"}}>
        {ContactUsFields.map((field, index) => {
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
          title={"Submit"}
          seeMoreStyle={styles.buttonView}
          containerStyle={styles.contactButtonContainer}
          buttonStyle={styles.contactButtonStyle}
          titleStyle={styles.buttonTitle}
          disabled={false}
          raised={true}
          type={"Submit"}
          onPress={() => submit()}
        />
      </SafeAreaView>
    </View>
  );
};

export default ContactUs;
