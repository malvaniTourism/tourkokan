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
import Feather from "react-native-vector-icons/Feather";

const PasswordLogin = ({ navigation, route, ...props }) => {
    const [email, setEmail] = useState(route?.params?.email);
    const [password, setPassword] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        // openDB()
        // createUserTable();
        const backHandler = BackHandler.addEventListener(STRING.EVENT.HARDWARE_BACK_PRESS, () => navigateTo(navigation, STRING.SCREEN.AUTH_SCREEN));
        return () => {
            backHandler.remove();
            setIsAlert(false);
            setAlertMessage("");
        };
    }, []);

    const setValue = (val, isVal, index) => {
        switch (index) {
            case 0:
                setEmail(val);
                break;
            case 1:
                setPassword(val);
                setIsButtonDisabled(false)
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


    const login = () => {
        props.setLoader(true);
        const data = {
            email,
            password,
        };
        // createUser()
        comnPost("auth/login", data)
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
                    setAlertMessage(res.data.message.email ? res.data.message.email : res.data.message.password ? res.data.message.password : res.data.message);
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

    return (
        <View style={{ alignItems: "center" }}>
            <ImageBackground style={styles.loginImage} source={require("../../Assets/Images/Intro/login_background.png")} />
            {/* <Header
        name={""}
        startIcon={<View></View>}
        style={styles.loginHeader}
      /> */}

            <View style={styles.appName}>
                <Image source={AppLogo} style={styles.appLogo} />
            </View>

            <Loader />
            <View style={{ justifyContent: "center", padding: 10, marginTop: 70 }}>
                <GlobalText text={STRING.LOG_IN} style={styles.loginText} />
                {SignInFields.map((field, index) => {
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
                            isSecure={field.isSecure}
                            rightIcon={
                                field.type == `${STRING.TYPE.PASSWORD}` &&
                                <Feather
                                    name={field.isSecure ? "eye" : "eye-off"}
                                    size={24}
                                    color={COLOR.themeBlue}
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
            </View>
            <TextButton
                title={STRING.BUTTON.LOGIN}
                buttonView={styles.buttonView}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitle}
                isDisabled={false}
                raised={true}
                onPress={() => login()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordLogin);
