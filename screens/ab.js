import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db } from '../firebase'; // Import Firestore database
import { collection, getDocs } from 'firebase/firestore';
import { PieChart } from 'react-native-chart-kit';

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const UserOrderStatsScreen = () => {
  const [usersOrdersCount, setUsersOrdersCount] = useState([]);

  useEffect(() => {
    fetchUsersOrdersCount();
  }, []);

  const fetchUsersOrdersCount = async () => {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      const usersOrdersCountArray = [];

      querySnapshot.forEach((userDoc) => {
        const user = userDoc.data();
        const userOrders = user.orders || {}; // Ensure orders exists and is an object
        const userOrdersCount = Object.keys(userOrders).length;

        usersOrdersCountArray.push({ userId: userDoc.id, ordersCount: userOrdersCount });
      });

      setUsersOrdersCount(usersOrdersCountArray);
    } catch (error) {
      console.error('Error fetching users orders count: ', error);
    }
  };

  const calculateTotalOrders = () => {
    return usersOrdersCount.reduce((total, user) => total + user.ordersCount, 0);
  };

  const renderPieChart = () => {
    const data = usersOrdersCount.map((user) => ({
      name: `User ${user.userId.substr(0, 5)}`, // Display only the first 5 characters of userId
      ordersCount: user.ordersCount,
      color: getRandomColor(), // Generate random color for each pie chart slice
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));

    return (
      <PieChart
        data={data}
        width={300}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="ordersCount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users Orders Statistics</Text>
      <Text style={styles.totalOrdersText}>Total Orders: {calculateTotalOrders()}</Text>
      <View style={styles.chartContainer}>{renderPieChart()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  totalOrdersText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  chartContainer: {
    marginTop: 20,
  },
});

export default UserOrderStatsScreen;
