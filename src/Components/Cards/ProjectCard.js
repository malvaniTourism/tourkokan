import React from 'react'
import { ImageBackground, View } from 'react-native'
import styles from './Styles'
import { Text } from '@rneui/base'
import Path from '../../Services/Api/BaseUrl'
import GlobalText from '../Customs/Text'

const ProjectCard = ({ project }) => {
    return (
        <View style={styles.projectCard}>
            <View>
                <View style={styles.overlay} />
                <ImageBackground
                    source={{ uri: Path.FTP_PATH + project.logo }}
                    style={styles.projectImage}
                    imageStyle={styles.projectImageStyle}
                    resizeMode="cover"
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                <GlobalText text={project.domain_name} />
            </View>
        </View>
    )
}

export default ProjectCard
