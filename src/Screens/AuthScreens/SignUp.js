import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { SignUpFields } from "../../Services/Constants/FIELDS";
import TextField from "../../Components/Customs/TextField";
import Header from "../../Components/Common/Header";
import CustomButton from "../../Components/Customs/Button";
import styles from "./Styles";
import { comnGet, comnPost } from "../../Services/Api/CommonServices";
import Loader from "../../Components/Customs/Loader";
import { connect } from "react-redux";
import { setLoader } from "../../Reducers/CommonActions";
import DropDown from "../../Components/Customs/DropDown";
import ImagePicker from 'react-native-image-picker';
import { navigateTo } from "../../Services/CommonMethods";

const SignUp = ({ navigation, ...props }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [errMsg, setErrorMsg] = useState("");
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => navigateTo(navigation, 'Login'));
    props.setLoader(true);
    getRoles()
    return () => {
      backHandler.remove()
    }
  }, []);

  const getRoles = () => {
    comnGet("v1/roleDD")
      .then((res) => {
        if (res.data.success) {
          props.setLoader(false);
          setRoles(res.data.data);
        } else {
          props.setLoader(false);
        }
      })
      .catch((err) => {
        props.setLoader(false);
      });
  }

  const setValue = (val, isVal, index) => {
    switch (index) {
      case 0:
        setName(val);
        break;
      case 1:
        setEmail(val);
        break;
      case 2:
        setMobile(val);
        break;
      case 3:
        setPassword(val);
        break;
      case 4:
        setCpassword(val);
        break;
      default:
        setRole(val);
        break;
    }
  };

  const getValue = (i) => {
    switch (i) {
      case 0:
        return name;
      case 1:
        return email;
      case 2:
        return mobile;
      case 3:
        return password;
      case 4:
        return cpassword;
      default:
        return role;
    }
  };

  const Register = () => {
    props.setLoader(true);
    const data = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      password_confirmation: cpassword,
      role_id: role,
    };
    comnPost("auth/register", data)
      .then((res) => {
        if (res.data.success) {
          props.setLoader(false);
          navigateTo(navigation, "Login");
        } else if (res.data.message.email) {
          props.setLoader(false);
          setErrorMsg("The email has already been taken.");
        } else if (res.data.message.phone) {
          props.setLoader(false);
          setErrorMsg("The mobile has already been taken.");
        }
      })
      .catch((err) => {
        props.setLoader(false);
      });
  };

  const signInScreen = () => {
    navigateTo(navigation, "Login");
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // The selected image URI is in response.uri
        const source = { uri: response.uri };
        // Do something with the image source
        // For example, set it as the state of the component
        setImageSource(source);
      }
    });
  };


  return (
    <View style={{ alignItems: "center" }}>
      <Header
        name={"Register"}
        style={{ marginBottom: 50 }}
        startIcon={<View></View>}
      />
      <Loader />
      <DropDown
        setChild={(v, i) => setValue(v, i)}
        name={"Role"}
        label={"Role"}
        value={role}
        disable={false}
        style={styles.dropDown}
        fieldType={"dropDwn"}
        helperMsg={"Select Role"}
        List={roles}
        parentDetails={{ label: "role" }}
      />
      {SignUpFields.map((field, index) => {
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
      {imageSource && <Image source={imageSource} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity onPress={selectImage}>
        <Text>Upload Image</Text>
      </TouchableOpacity>
      <CustomButton
        title={"Register"}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonTitle}
        disabled={false}
        raised={true}
        type={"Submit"}
        onPress={() => Register()}
      />
      <Text>{errMsg}</Text>
      <View style={styles.haveAcc}>
        <Text>Already have an Account? </Text>
        <TouchableOpacity onPress={() => signInScreen()}>
          <Text> Sign In</Text>
        </TouchableOpacity>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
