import React, { useState } from 'react'
import { TouchableOpacity, View, Image } from 'react-native'
import styles from './Styles'
import { Text } from 'react-native-svg'
import SvgUri from 'react-native-svg-uri'
import DIMENSIONS from '../../Services/Constants/DIMENSIONS'

const CategoryCard = ({ data, getCategory }) => {
    const [cat, setCat] = useState(data)
    console.log(data.name);
    const onIconCLick = () => {
        getCategory()
    }

    return (
        <View style={styles.catCardContainer}>
            <TouchableOpacity style={styles.catCardIcon} onPress={() => onIconCLick()}>
                <Image
                    source={require('../../Assets/Images/beach.png')}
                    style={{ width: DIMENSIONS.bannerWidth / 4, height: DIMENSIONS.bannerWidth / 4 }}
                />
            </TouchableOpacity>
            {/* <View> */}
                {/* <Text>{data.name}</Text> */}
            {/* </View> */}
        </View>
    )
}

export default CategoryCard
