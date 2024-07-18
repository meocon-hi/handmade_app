import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProductDetailScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.details}>{item.details}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
        <FontAwesome5 name="arrow-left" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333',
    textAlign: 'center',
  },
  price: {
    fontSize: 22,
    color: '#888',
    marginVertical: 8,
    textAlign: 'center',
  },
  detailsContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
  },
  details: {
    fontSize: 18,
    color: '#666',
    textAlign: 'justify',
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
});

export default ProductDetailScreen;
