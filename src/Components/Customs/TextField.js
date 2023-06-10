import React, { Component, useState } from "react";
import { Input } from "@rneui/themed";
import { View } from "react-native";
import styles from "./Styles";
// import InputAdornment from '@material-ui/core/InputAdornment';
// import AccountCircle from '@material-ui/icons/AccountCircle';

const TextField = (props) => {
  const [errorText, setErrorText] = useState("");
  const [isValid, setIsValid] = useState("");
  const [value, setValue] = useState("");
  let x = {};

  const onChange = (value) => {
    let txtVal = value.trimLeft();
    if (txtVal !== "") {
      switch (props.fieldType) {
        case "text": {
          if (txtVal.match(/^([a-zA-Z])[a-zA-Z-_ ]*$/)) {
            setIsValid(false);
            setValue(txtVal);
            props.setChild(txtVal, true);
            break;
          } else {
            setErrorText(props.errMsg);
            setIsValid(true);
            setValue(txtVal);
            props.setChild(txtVal, false);
            break;
          }
        }
        case "password": {
          if (txtVal.match(/^([a-zA-Z])[a-zA-Z-_ ]*$/)) {
            setIsValid(false);
            setValue(txtVal);
            props.setChild(txtVal, true);
            break;
          } else {
            setErrorText(props.errMsg);
            setIsValid(true);
            setValue(txtVal);
            props.setChild(txtVal, false);
            break;
          }
        }
        case "num": {
          if (txtVal.match(/^[0-9]*$/)) {
            if (
              props.name === "Age" ||
              props.name === "ERInPast" ||
              props.name === "hospitalizedPast"
            ) {
              setIsValid(false);
              setValue(txtVal);
              props.setChild(txtVal, true);
              break;
            } else {
              if (txtVal > 0) {
                setErrorText("");
                setIsValid(false);
                setValue(txtVal);
                props.setChild(txtVal, true);
                break;
              } else {
                setErrorText(props.errMsg);
                setIsValid(true);
                setValue(txtVal);
                props.setChild(txtVal, false);
                break;
              }
            }
          } else {
            setErrorText(props.errMsg);
            setIsValid(true);
            setValue(txtVal);
            props.setChild(txtVal, false);
            break;
          }
        }
        case "phone": {
          if (txtVal.match(/^[0-9]{10}$/)) {
            let value = txtVal !== "" ? Number(txtVal) : "";
            if (value > 1111111111 && value <= 9999999999) {
              setErrorText("");
              setIsValid(false);
              setValue(txtVal);
              props.setChild(txtVal, true);
              break;
            } else {
              setErrorText(props.errMsg);
              setIsValid(true);
              setValue(txtVal);
              props.setChild(txtVal, false);
              break;
            }
          } else {
            setErrorText(props.errMsg);
            setIsValid(true);
            setValue(txtVal);
            props.setChild(txtVal, false);
            break;
          }
        }
        case "email": {
          if (
            txtVal.match(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
            )
          ) {
            var txt = txtVal.split("@")[1];
            var value = txt.split(".com").length - 1;
            if (value > 1 && value !== ".com.co") {
              setErrorText(props.errMsg);
              setIsValid(true);
              setValue(txtVal);
              props.setChild(txtVal, false);
              break;
            } else {
              setErrorText("");
              setIsValid(false);
              setValue(txtVal);
              props.setChild(txtVal, true);
              break;
            }
          } else {
            setErrorText(props.errMsg);
            setIsValid(true);
            setValue(txtVal);
            props.setChild(txtVal, false);
            break;
          }
        }
      }
    } else {
      if (props.reqFlag) {
        setErrorText(props.helperMsg);
        setIsValid(true);
        setValue(txtVal);
        props.setChild(txtVal, false);
      } else {
        setErrorText("");
        setIsValid(false);
        setValue(txtVal);
        props.setChild(txtVal, true);
      }
    }
  };

  if (props.label === "First Name") {
    x = {
      endAdornment: (
        <View></View>
        // <InputAdornment position="end">
        //     <AccountCircle />
        // </InputAdornment>
      ),
    };
  }

  return (
    <Input
      type={props.fieldType}
      error={props.isError || (props.value === "" && isValid)}
      placeholder={props.placeholder}
      name={props.name}
      variant="filled"
      autoComplete="off"
      value={props.value === "" && isValid ? value : props.value}
      style={[styles.textField, props.style]}
      containerStyle={[styles.textFieldContainer, props.containerStyle]}
      inputContainerStyle={props.inputContainerStyle}
      helperText={
        (props.value === "" && isValid) || props.value === "" ? errorText : ""
      }
      onChangeText={(value) => onChange(value)}
      disabled={props.disable}
      required={props.reqFlag}
      InputLabelProps={{
        style: { color: props.value === "" && isValid ? "#FA1515" : "" },
      }}
      inputProps={{
        maxLength: props.length,
      }}
      secureTextEntry={props.fieldType == 'password'}
      underlineColorAndroid="transparent"
      InputProps={x}
      onPressIn={props.onPress}
    />
  );
};

export default TextField;
