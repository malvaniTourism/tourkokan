import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './Styles'
import { Image } from '@rneui/base'

const ImageButton = ({ onPress, buttonStyle, text }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[buttonStyle, styles.imageButtonContainer]}>
            <TouchableOpacity style={[styles.imageButtonCircle]}>
                <Image
                    source={require('../../../Assets/Images/beach.png')}
                    style={styles.catCardIcon}
                />
            </TouchableOpacity>
            {text}
        </TouchableOpacity>
    )
}

export default ImageButton
