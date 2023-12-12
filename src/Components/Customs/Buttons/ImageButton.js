import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './Styles'
import { Image } from '@rneui/base'
import GlobalText from '../Text'

const ImageButton = ({ onPress, buttonStyle, text, isSelected }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[buttonStyle, styles.imageButtonContainer, isSelected && styles.selectedButton]}>
            <TouchableOpacity onPress={onPress} style={[styles.imageButtonCircle, isSelected && styles.selectedCircle]}>
                <Image
                    source={require('../../../Assets/Images/beach.png')}
                    style={styles.catCardIcon}
                />
            </TouchableOpacity>
            <GlobalText text={text} style={isSelected && styles.selectedText} />
        </TouchableOpacity>
    )
}

export default ImageButton
