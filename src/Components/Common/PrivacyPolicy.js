import React from 'react'
import { View } from 'react-native'
import WebView from 'react-native-webview'
import { useTranslation } from 'react-i18next'
import styles from './Styles'
import DIMENSIONS from '../../Services/Constants/DIMENSIONS'
import TextButton from '../Customs/Buttons/TextButton'

const PrivacyPolicy = ({ cancelClick, acceptClick }) => {
    const { t } = useTranslation()

    return (
        <View style={{ height: DIMENSIONS.screenHeight - 300, width: DIMENSIONS.bannerWidth }}>
            <WebView
                source={{ uri: 'https://dev.tourkokan.com/terms/true' }}
            />
            <View style={styles.spaceBetween}>
                <TextButton
                    title={t("BUTTON.CANCEL")}
                    buttonView={styles.privacyButtons}
                    raised={true}
                    onPress={cancelClick}
                />
                <TextButton
                    title={t("BUTTON.ACCEPT")}
                    buttonView={styles.privacyButtons}
                    raised={true}
                    onPress={acceptClick}
                />
            </View>
        </View>
    )
}

export default PrivacyPolicy
