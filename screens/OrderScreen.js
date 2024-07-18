import { StyleSheet, Text, View, SafeAreaView , TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = () => {
  const navigation = useNavigation();

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        source={require("../app.json")}
        style={styles.animation}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <Image
        source={{ uri: 'https://tiemmoclen.com/wp-content/uploads/2023/06/Logo-Tiem-Nha-Len-01-01.png' }}
        style={styles.avatar}
      />

      <Text style={styles.successMessage}>
        Your order has been placed
      </Text>

      <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
        <FontAwesome5 name="arrow-left" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.sparkleAnimation}>
        {/* 
          Uncomment and replace with your sparkle animation component
          <LottieView
            source={require("../assets/sparkle.json")}
            autoPlay
            loop={false}
            speed={0.7}
          />
        */}
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    marginTop:-400,
  },
  animation: {
    height: 360,
    width: 300,
    alignSelf: "center",
    marginTop: 40,
    justifyContent: "center",
  },
  avatar: {
    width: 120, // Increase width if necessary
    height: 120, // Increase height if necessary
    borderRadius: 60, // Half of width and height to make it circular
    marginBottom: 20,
    alignSelf: 'center', // Center horizontally
    marginTop: 20, // Adjust top margin as needed
  },
  successMessage: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#009999",
  },
  backButton: {
    backgroundColor: '#009999',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  sparkleAnimation: {
    position: "absolute",
    top: 100,
    width: 300,
    alignSelf: "center",
  },
});
