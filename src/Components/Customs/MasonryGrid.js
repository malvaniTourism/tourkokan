import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Path from '../../Services/Api/BaseUrl';

const MasonryGrid = ({ data, loadMore }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateDimensions = () => {
            setScreenWidth(Dimensions.get('window').width);
        };

        Dimensions.addEventListener('change', updateDimensions);

        return () => {
            Dimensions.removeEventListener('change', updateDimensions);
        };
    }, []);

    const handleLongPress = (image) => {
        console.log('Long pressed on image:', image);
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const calculateImageDimensions = () => {
        const numColumns = 3; // Adjust the number of columns as needed
        const margin = 0; // Adjust the margin between images as needed
        const totalMargin = (numColumns - 1) * margin;
        const imageWidth = (screenWidth - totalMargin) / numColumns;
        const imageHeight = imageWidth * 1.5; // Adjust the aspect ratio as needed

        return { width: imageWidth, height: imageHeight };
    };

    const images = data.map((item, index) => {
        const { width, height } = calculateImageDimensions();
        return {
            uri: Path.FTP_PATH1 + item.image,
            text: item.name,
            dimensions: { width, height },
            index,
        };
    });

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onLongPress={() => handleLongPress(item)}
        >
            <View style={[styles.container, { width: item.dimensions.width, height: item.dimensions.height }]}>
                <Image
                    source={{ uri: item.uri }}
                    style={styles.image}
                />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                data={images}
                numColumns={3}
                keyExtractor={(item) => item.index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContainer}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
            />

            <Modal
                visible={selectedImage !== null}
                transparent
                animationType="slide"
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalContainer}>
                        <Image
                            source={{ uri: selectedImage?.uri }}
                            style={styles.modalImage}
                        />
                        <Text style={styles.modalText}>{selectedImage?.text}</Text>
                        <TouchableOpacity onPress={closeModal}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
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
    flatListContainer: {
        justifyContent: 'space-between',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        height: '80%', // Adjust the size as needed
        width: '80%', // Adjust the size as needed
        resizeMode: 'contain',
    },
    modalText: {
        color: 'white',
        marginTop: 10,
    },
    closeButton: {
        color: 'white',
        marginTop: 20,
    },
});

export default MasonryGrid;
