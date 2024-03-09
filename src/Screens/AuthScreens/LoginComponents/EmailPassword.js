import React, { useState } from 'react'
import { SignInFields } from '../../../Services/Constants/FIELDS';
import { TouchableOpacity, View } from 'react-native';
import TextField from '../../../Components/Customs/TextField';
import TextButton from '../../../Components/Customs/Buttons/TextButton';
import Feather from "react-native-vector-icons/Feather";
import styles from '../Styles';
import STRING from '../../../Services/Constants/STRINGS';
import COLOR from '../../../Services/Constants/COLORS';
import GlobalText from '../../../Components/Customs/Text';

const EmailPassword = ({ setValue, getValue, Login, changeChoice }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={changeChoice}>
                <GlobalText text={STRING.CHANGE} style={styles.changeOption} />
            </TouchableOpacity>
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
                                name={field.isSecure ? "eye" : "eye-off"}
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
        </View>
    )
}

export default EmailPassword
