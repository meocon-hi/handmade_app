import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PickUpScreen from './screens/PickUpScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import Admin from './screens/admin';
import AdminProductScreen from './screens/AdminProductScreen';
import ManageOrdersScreen from './screens/ManageOrdersScreen';
import ManageUsersScreen from './screens/ManageUsersScreen';
import OrdersStatsScreen from './screens/OrdersStatsScreen';
import Login2Screen from './screens/Login2Screen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import hehe from './screens/hehe';
const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
     
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
      
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="PickUp" component={PickUpScreen} options={{headerShown:false}} />
        <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
        <Stack.Screen name=" OrderHistoryScreen" component={OrderHistoryScreen} options={{headerShown:false}} />
        <Stack.Screen name="hehe" component={hehe} options={{headerShown:false}} />
        <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login2" component={Login2Screen} options={{headerShown:false}} />
          <Stack.Screen name="Admin" component={Admin} options={{headerShown:false}} />
        <Stack.Screen name="AdminProductScreen" component={AdminProductScreen} options={{headerShown:false}} />
        <Stack.Screen name="ManageOrdersScreen" component={ManageOrdersScreen} options={{headerShown:false}} />
          
        <Stack.Screen name="ManageUsersScreen" component={ManageUsersScreen} options={{headerShown:false}} />
        <Stack.Screen name="OrderStatsScreen" component={OrdersStatsScreen} options={{headerShown:false}} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})