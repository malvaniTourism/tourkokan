import React, { useState } from 'react'
import { View } from 'react-native'
import { ProfileFields } from '../../../Services/Constants/FIELDS';
import TextField from '../../Customs/TextField';
import styles from './Styles';
import STRING from '../../../Services/Constants/STRINGS';
import TextButton from '../../Customs/Buttons/TextButton';
import Feather from "react-native-vector-icons/Feather";
import { useTranslation } from 'react-i18next';
import { comnPost } from '../../../Services/Api/CommonServices';

const UpdateProfile = ({ user, phone, refreshOption, setLoader }) => {
    const { t } = useTranslation();

    const [email, setEmail] = useState(user);
    const [mobile, setMobile] = useState(phone);
console.log('phone - - ', phone);
    const setValue = (val, isVal, index) => {
        switch (index) {
            case 0:
                setEmail(val);
                break;
            case 1:
                setMobile(val);
                break;
        }
    };

    const getValue = (i) => {
        switch (i) {
            case 0:
                return email;
            case 1:
                return mobile;
        }
    };

    const save = () => {
        setLoader(true)
        let data = {
            email,
            mobile
        }
        comnPost("v2/updateProfile", data)
            .then(res => {
            })
            .catch(err => {
            })
        refreshOption()
    }

    return (
        <View>
            {ProfileFields.map((field, index) => {
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
                        inputContainerStyle={styles.profileContainerStyle}
                        isSecure={field.isSecure}
                        leftIcon={
                            <Feather name={field.leftIcon} size={24} style={styles.leftIcon} />
                        }
                    />
                );
            })}

            <View>
                <TextButton
                    title={t("BUTTON.SAVE")}
                    buttonView={styles.profileButtonStyle}
                    titleStyle={styles.buttonTitleStyle}
                    onPress={save}
                />
            </View>
        </View>
    )
}

export default UpdateProfile
