import React from "react"
import { View } from "react-native"
import ProfileChip from "../ProfileChip"
import STRING from "../../../Services/Constants/STRINGS"
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./Styles";
import COLOR from "../../../Services/Constants/COLORS";
import GlobalText from "../../Customs/Text";
import { useTranslation } from 'react-i18next';

const ChipOptions = ({ userLang, languageClick, locationClick, profileClick, settingsClick, logoutClick }) => {
    const { t } = useTranslation();

    return (
        <View>
            <ProfileChip name={STRING.CHIPS.LANGUAGE}
                icon={
                    <View style={styles.chipIcon}>
                        <FontAwesome
                            name="language"
                            size={20}
                            color={COLOR.white}
                        />
                    </View>
                }
                clickChip={languageClick}
                meta={<GlobalText text={t([userLang]) || t('LANGUAGE')} />}
            />
            <ProfileChip name={STRING.CHIPS.UPDATE_LOCATION}
                icon={
                    <View style={styles.chipIcon}>
                        <Ionicons
                            name="location-outline"
                            size={20}
                            color={COLOR.white}
                        />
                    </View>
                }
                clickChip={locationClick}
            />
            <ProfileChip name={STRING.CHIPS.UPDATE_PROFILE}
                icon={
                    <View style={styles.chipIcon}>
                        <Feather
                            name="user"
                            size={20}
                            color={COLOR.white}
                        />
                    </View>
                }
                clickChip={profileClick}
            />
            {/* <ProfileChip name={STRING.CHIPS.SETTINGS}
                icon={
                    <View style={styles.chipIcon}>
                        <Ionicons
                            name="settings-outline"
                            size={20}
                            color={COLOR.white}
                        />
                    </View>
                }
                clickChip={settingsClick}
            /> */}
            <ProfileChip name={STRING.CHIPS.LOGOUT}
                icon={
                    <View style={styles.chipIcon}>
                        <MaterialIcons
                            name="logout"
                            size={20}
                            color={COLOR.white}
                        />
                    </View>
                }
                clickChip={logoutClick}
            />
        </View>
    )
}

export default ChipOptions
