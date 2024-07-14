import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
// import { Gallery } from 'react-native-gallery-view';

const GalleryView = ({ navigation, route, navigator }) => {
    const [images, setImages] = useState([{
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRpGmKrfBFE90_MyomlXre9OJhLyjMvfGm5w&usqp=CAU",
        id: "12345"
    }, {
        src: "https://st.depositphotos.com/1007995/1274/i/600/depositphotos_12746726-stock-photo-fashion-man-wearing- sunglasses-thinking.jpg",
        id: "12346"
    }, {
        src: "https://i.pinimg.com/736x/36/fc/e9/36fce9ed325c3303d858b01257bd76c3.jpg",
        id: "12347"
    }]);

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}

        >
            <ScrollView
                style={{
                    flex: 1,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Basic Usage */}
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginVertical: 20
                    }}
                >
                    Basic Usage for React Native Gallery View
                </Text>
                {/* <Gallery
                    images={images}
                    activeIndex={0}
                    navigator={navigator}
                /> */}

                {/* Basic Usage */}
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginVertical: 20
                    }}
                >
                    Customized usage of React Native Gallery View
                </Text>
                {/* <Gallery
                    thumbnailImageStyles={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                    }}
                    mainImageStyle={{
                        height: 200,
                    }}
                    loaderColor="yellow"
                    borderColor="orange"
                    images={images}
                    activeIndex={0}
                    navigator={navigator}
                    noImageFoundText={"No Image found custom text"}
                /> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default GalleryView;
