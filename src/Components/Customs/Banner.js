import React, { Component } from "react";
import { View, Text, Animated, ImageBackground, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import DIMENSIONS from "../../Services/Constants/DIMENSIONS";
import styles from "./Styles";

class AnimationStyle extends Component {
  state = {
    opacity: new Animated.Value(0),
  };

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                }),
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}

const Banner = ({ style, bannerImages }) => {
  return (
    <View style={[styles.banner, style]}>
      <Carousel
        loop
        // mode={'parallax'}
        // customAnimation={animationStyle}
        width={DIMENSIONS.bannerWidth}
        height={DIMENSIONS.windowWidth / 2}
        autoPlay={true}
        data={bannerImages}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <AnimationStyle
            source={{ uri: `${bannerImages[index]}` }}
            style={styles.bannerImage}
          ></AnimationStyle>
        )}
      />
    </View>
  );
};

export default Banner;
