import React from 'react'
import { ImageBackground, StatusBar, View } from 'react-native'
import styles from './Styles'
import COLOR from '../../Services/Constants/COLORS'
import GlobalText from '../../Components/Customs/Text'
import STRING from '../../Services/Constants/STRINGS'
import TextButton from '../../Components/Customs/Buttons/TextButton'
import { navigateTo } from '../../Services/CommonMethods'

const AuthScreen = ({ navigation }) => {

    const goTo = (screen) => {
        navigateTo(navigation, screen)
    }

    return (
        <View>
            <StatusBar backgroundColor={COLOR.loginImageBlue} />
            <ImageBackground style={styles.loginImage} source={require("../../Assets/Images/Intro/login_beach.png")} />

            <View style={styles.authScreenView}>
                <View style={styles.loginAppName}>
                    <GlobalText text={STRING.appName} style={styles.loginName} />
                </View>

                <View>
                    <GlobalText text={STRING.EXPLORE} style={styles.exploreText} />
                    <GlobalText text={STRING.KOKAN} style={styles.boldKokan} />
                    <GlobalText text={STRING.COMPANION} style={styles.textLeft} />
                    <TextButton
                        title={STRING.BUTTON.LOGIN}
                        buttonView={styles.loginButton}
                        isDisabled={false}
                        raised={true}
                        onPress={() => goTo(STRING.SCREEN.EMAIL_SIGN_IN)}
                    />
                    <TextButton
                        title={STRING.BUTTON.SIGNUP}
                        buttonView={styles.signUpButton}
                        titleStyle={styles.buttonTitle}
                        isDisabled={false}
                        raised={true}
                        onPress={() => goTo(STRING.SCREEN.SIGN_UP)}
                    />
                </View>
            </View>
        </View>
    )
}

export default AuthScreen
