import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MasonryList from 'react-native-masonry-list';
import Path from '../../Services/Api/BaseUrl';

const MasonryGrid = ({ data }) => {
    const images = data.map(item => ({
        uri: Path.FTP_PATH1 + item.image_url,
        text: item.name,
        dimensions: { width: 200, height: 120.58 }, // Adjust dimensions as needed
    }));

    console.log('----------', images);

    return (
        <MasonryList
            images={images}
            spacing={1} // Set spacing as needed
            renderIndividualItem={({ item }) => (
                <View style={styles.container}>
                    <Image
                        source={{ uri: item.uri }}
                        style={styles.image}
                    />
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            )}
            onPressImage={(image, index) => console.log(index)}
            sorted // Enable to show images in order
        />
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        height: 100,
        resizeMode: 'contain',
        width: 200,
    },
    text: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
    },
});

export default MasonryGrid;
