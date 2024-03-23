import React, { useEffect, useState } from 'react'
import { EmailOtpFields, SignInFields } from '../../../Services/Constants/FIELDS';
import { TouchableOpacity, View } from 'react-native';
import TextField from '../../../Components/Customs/TextField';
import TextButton from '../../../Components/Customs/Buttons/TextButton';
import Feather from "react-native-vector-icons/Feather";
import styles from '../Styles';
import STRING from '../../../Services/Constants/STRINGS';
import COLOR from '../../../Services/Constants/COLORS';
import GlobalText from '../../../Components/Customs/Text';

const EmailOtp = ({ setValue, getValue, Login, changeChoice, isOtpSent, resend }) => {
    const [sec, setSec] = useState(30);
    const [otpSent, setOtpSent] = useState(isOtpSent)

    const sendOtp = () => {
        setSec(30)
        resend()
        setOtpSent(true)
    }

    useEffect(() => {
        let intervalId;
        if (otpSent) {
            intervalId = setInterval(timer, 1000);
        }
        return () => clearInterval(intervalId);
    }, [otpSent, sec]);

    const timer = () => {
        if (sec) {
            setSec(sec - 1);
        }
    };

    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={changeChoice}>
                <GlobalText text={STRING.CHANGE} style={styles.changeOption} />
            </TouchableOpacity>
            {EmailOtpFields.map((field, index) => {
                return (
                    <TextField
                        name={field.name}
                        label={field.name}
                        placeholder={field.placeholder}
                        fieldType={field.type}
                        length={field.length}
                        required={field.required}
                        disabled={index == 1 && !otpSent}
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
            <View style={{ marginVertical: 10 }}>
                {otpSent ?
                    sec >= 1 ? (
                        <GlobalText text={`${STRING.RESEND_WITHIN}${sec > 9 ? sec : "0" + sec})`} style={styles.whiteText} />
                    ) : (
                        <View>
                            <GlobalText style={styles.whiteText} text={STRING.DIDNT_RECEIVE} />
                            <TouchableOpacity onPress={() => resend()}>
                                <GlobalText text={STRING.RESEND} style={styles.whiteText} />
                            </TouchableOpacity>
                        </View>
                    )
                    :
                    <TextButton
                        title={STRING.BUTTON.SEND_OTP}
                        seeMoreStyle={styles.buttonView}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.buttonTitle}
                        disabled={false}
                        raised={true}
                        onPress={() => sendOtp()}
                    />
                }
            </View>
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
        </View>
    )
}

export default EmailOtp
