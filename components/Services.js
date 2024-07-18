import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";

const Services = () => {
  const services = [
    {
      id: "0",
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmso9de3pexr70",
      name: "Key Wool",
    },
    {
      id: "11",
      image:
        "https://img.lazcdn.com/g/ff/kf/Sb387dc27a6d54868b16f3278a67168fcf.jpg_720x720q80.jpg",
      name: "Bag",
    },
    {
      id: "12",
      image:
        "https://down-vn.img.susercontent.com/file/f725222125868c41e72bb4626f266fdd_tn",
      name: "Shirt",
    },
    {
      id: "13",
      image:
        "https://down-vn.img.susercontent.com/vn-11134207-7r98o-lmq7h5e9xginf0",
      name: "Flower",
    },
  ];
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        Catergory
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable
            style={{
              margin: 10,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 7,
            }}
            key={index}
          >
            <Image
              source={{ uri: service.image }}
              style={{ width: 70, height: 70, borderRadius: 35 }}
            />

            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {service.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
