import React from 'react'
import { Email, SignInFields } from '../../../Services/Constants/FIELDS';
import { View } from 'react-native';
import TextField from '../../../Components/Customs/TextField';
import TextButton from '../../../Components/Customs/Buttons/TextButton';
import Feather from "react-native-vector-icons/Feather";
import styles from '../Styles';
import STRING from '../../../Services/Constants/STRINGS';
import COLOR from '../../../Services/Constants/COLORS';
import DIMENSIONS from '../../../Services/Constants/DIMENSIONS';
import GlobalText from '../../../Components/Customs/Text';

const LoginChoice = ({ selectOtp, selectPassword }) => {

    return (
        <View style={{ justifyContent: "center", alignItems: "center", padding: 10 }}>
            <GlobalText text={STRING.LOG_IN} style={styles.loginText} />
            <GlobalText text={STRING.SELECT_OPTION} style={styles.selectText} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: DIMENSIONS.bannerWidth }}>
            <TextButton
                title={STRING.BUTTON.OTP}
                seeMoreStyle={styles.buttonView}
                containerStyle={styles.choiceButtonContainer}
                buttonStyle={styles.choiceButtonStyle}
                titleStyle={styles.buttonTitle}
                disabled={false}
                raised={true}
                onPress={() => selectOtp()}
            />
            <TextButton
                title={STRING.BUTTON.PASSWORD}
                seeMoreStyle={styles.buttonView}
                containerStyle={styles.choiceButtonContainer}
                buttonStyle={styles.choiceButtonStyle}
                titleStyle={styles.buttonTitle}
                disabled={false}
                raised={true}
                onPress={() => selectPassword()}
            />
            </View>
            <TextButton
                title={STRING.BUTTON.LOGIN}
                seeMoreStyle={styles.buttonView}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitle}
                isDisabled={true}
                raised={true}
                onPress={() => Login()}
            />
        </View>
    )
}

export default LoginChoice
