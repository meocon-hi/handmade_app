import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://vn-test-11.slatic.net/p/1bf87370cf5a89a07ee5b32a9b133c4e.jpg",
    "https://down-vn.img.susercontent.com/file/cafe6cf6a128ce2f88074144bd0fbafa",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "90%",
          right: 18
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
