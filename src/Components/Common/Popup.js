import React, { useState } from 'react'
import { Modal, View } from 'react-native'
import { Overlay } from '@rneui/themed';
import GlobalText from '../Customs/Text';
import styles from './Styles';
import CustomButton from '../Customs/Button';

const Popup = ({ message, visible, toggleOverlay, onPress }) => {
    // const [isOpen, setIsOpen] = useState(visible)
    let isOpen = visible

    const closePopup = () => {
        isOpen = false
        onPress()
    }

    return (
        <Overlay style={styles.overlay} isVisible={isOpen} onBackdropPress={toggleOverlay}>
            <View style={styles.popupView}>
                <GlobalText style={styles.overlayMessage} text={message} />
            </View>
                <CustomButton
                    title={"Ok"}
                    containerStyle={styles.editButtonContainer}
                    buttonStyle={styles.planButtonStyle}
                    titleStyle={styles.planButtonTitleStyle}
                    raised={true}
                    type={"Submit"}
                    onPress={closePopup}
                />
        </Overlay>
    )
}

export default Popup
