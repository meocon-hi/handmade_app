import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';

const Admin = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Loading your location...');
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        'Location services not enabled',
        'Please enable the location services',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission denied',
        'Allow the app to use the location services',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.subregion} ${item.region} ${item.country}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Admin</Text>
          <Text style={styles.locationText}>{displayCurrentAddress}</Text>
        </View>
        <View style={styles.carouselContainer}>
          <Image 
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4pQ6KMP3_RDmuc8iyecXPYHnb_tGDnDhxoDlca8oNr4F0KwlvHwSK_i3gqgcoPX5aGKs&usqp=CAU' }} // Thay bằng URL của ảnh bạn muốn hiển thị
            style={styles.image}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}  onPress={() => navigation.navigate("ManageUsersScreen")}>Quản lý Khách hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AdminProductScreen")}>
            <Text style={styles.buttonText}>Quản lý Sản phẩm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate("ManageOrdersScreen")}>Quản lý Đơn hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}  onPress={() => navigation.navigate("OrderStatsScreen")}>Thống kê</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: 30,
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  locationText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  carouselContainer: {
    marginVertical: 20,
    marginLeft: 50, // Dịch chuyển khung ảnh sang phải 50 đơn vị
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 150,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 15,
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
