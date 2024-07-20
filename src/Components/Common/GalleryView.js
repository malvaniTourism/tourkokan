import React, { useState } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import ImageViewing from "react-native-image-viewing";
import styles from "./Styles";
import Path from "../../Services/Api/BaseUrl";

const ImageViewer = ({ images }) => {
    console.log("images -  ", images);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [isVisible, setIsVisible] = useState(false);

    const openImageViewer = (image) => {
        setSelectedImage(image);
        setIsVisible(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => openImageViewer(item)}>
            <Image
                source={{ uri: Path.FTP_PATH + item.path }}
                style={styles.thumbnail}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.galleryContainer}>
            <Image
                source={{ uri: Path.FTP_PATH + selectedImage.path }}
                style={styles.mainImage}
            />
            <View style={styles.thumbnailView}>
                <FlatList
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    style={styles.thumbnailList}
                />
            </View>
            {/* <ImageViewing
        images={[{ uri: selectedImage.uri }]}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      /> */}
        </View>
    );
};

export default ImageViewer;
