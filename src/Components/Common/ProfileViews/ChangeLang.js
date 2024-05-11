import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import GlobalText from '../../Customs/Text'
import STRING from '../../../Services/Constants/STRINGS'
import ProfileChip from '../ProfileChip'
import { Dropdown } from "react-native-element-dropdown";
import styles from './Styles'
import TextButton from '../../Customs/Buttons/TextButton'
import { useTranslation } from 'react-i18next';
import { comnPost } from '../../../Services/Api/CommonServices'

const ChangeLang = ({ refreshOption, setLoader }) => {
    const { t, i18n } = useTranslation();

    const [list, setList] = useState(
        [{ label: 'English', value: 'en' },
        { label: 'Marathi', value: 'mr' },]
    )
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        setValue(t("LANG"))
    }, [])

    const saveLang = () => {
        setLoader(true)
        let data = {
            Language: value
        }
        comnPost("v2/updateProfile", data)
            .then(res => {
            })
            .catch(err => {
            })
        i18n.changeLanguage(value);
        setLoader(false)
        refreshOption()
    }

    return (
        <View>
            <GlobalText text={STRING.CHIPS.CHANGE_LANGUAGE} style={{ textAlign: "left" }} />
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.dropdownIcon}
                data={list}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
            <TextButton
                title={STRING.BUTTON.SAVE}
                buttonView={styles.langButtonStyle}
                titleStyle={styles.buttonTitleStyle}
                onPress={saveLang}
            />
        </View>
    )
}

export default ChangeLang
