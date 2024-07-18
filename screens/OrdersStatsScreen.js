// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet } from 'react-native';
// // import { db } from '../firebase'; // Import Firestore database
// // import { collection, getDocs, query, where } from 'firebase/firestore';
// // import { BarChart } from 'react-native-chart-kit';

// // const UserOrdersStatsScreen = () => {
// //   const [usersOrdersCount, setUsersOrdersCount] = useState([]);

// //   useEffect(() => {
// //     fetchUsersOrdersCount();
// //   }, []);

// //   const fetchUsersOrdersCount = async () => {
// //     try {
// //       const usersRef = collection(db, 'users');
// //       const querySnapshot = await getDocs(usersRef);

// //       const usersOrdersCountArray = [];

// //       for (const userDoc of querySnapshot.docs) {
// //         const userId = userDoc.id;
// //         const ordersRef = collection(db, `users/${userId}/orders`);
// //         const ordersSnapshot = await getDocs(ordersRef);

// //         const ordersCount = ordersSnapshot.size; // Count number of orders for this user

// //         usersOrdersCountArray.push({ userId, ordersCount });
// //       }

// //       setUsersOrdersCount(usersOrdersCountArray);
// //     } catch (error) {
// //       console.error('Error fetching users orders count: ', error);
// //     }
// //   };

// //   const renderBarChart = () => {
// //     const data = {
// //       labels: usersOrdersCount.map(user => `User ${user.userId.substr(0, 5)}`), // Display only the first 5 characters of userId
// //       datasets: [{
// //         data: usersOrdersCount.map(user => user.ordersCount),
// //       }],
// //     };

// //     return (
// //       <BarChart
// //         data={data}
// //         width={300}
// //         height={220}
// //         yAxisLabel="Orders Count"
// //         chartConfig={{
// //           backgroundColor: '#fff',
// //           backgroundGradientFrom: '#fff',
// //           backgroundGradientTo: '#fff',
// //           decimalPlaces: 0,
// //           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
// //         }}
// //         style={{ marginVertical: 8, borderRadius: 16 }}
// //       />
// //     );
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Users Orders Statistics</Text>
// //       <View style={styles.chartContainer}>
// //         {usersOrdersCount.length > 0 ? (
// //           renderBarChart()
// //         ) : (
// //           <Text>No data available</Text>
// //         )}
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //     textAlign: 'center',
// //   },
// //   chartContainer: {
// //     marginTop: 20,
// //   },
// // });

// // export default UserOrdersStatsScreen;
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { db } from '../firebase'; // Import Firestore database
// import { collection, getDocs } from 'firebase/firestore';
// import { BarChart } from 'react-native-chart-kit';

// const UserOrdersStatsScreen = () => {
//   const [usersOrdersCount, setUsersOrdersCount] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsersOrdersCount();
//   }, []);

//   const fetchUsersOrdersCount = async () => {
//     try {
//       const usersRef = collection(db, 'users');
//       const querySnapshot = await getDocs(usersRef);

//       const usersOrdersCountArray = [];

//       for (const userDoc of querySnapshot.docs) {
//         const userId = userDoc.id;
//         const ordersRef = collection(db, `users/${userId}/orders`);
//         const ordersSnapshot = await getDocs(ordersRef);

//         const ordersCount = ordersSnapshot.size; // Count number of orders for this user

//         usersOrdersCountArray.push({ userId, ordersCount });
//       }

//       setUsersOrdersCount(usersOrdersCountArray);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching users orders count: ', error);
//       setLoading(false);
//     }
//   };

//   const renderBarChart = () => {
//     if (usersOrdersCount.length === 0) {
//       return <Text>No data available</Text>;
//     }

//     const data = {
//       labels: usersOrdersCount.map((user) => `User ${user.userId.substr(0, 5)}`),
//       datasets: [{
//         data: usersOrdersCount.map((user) => user.ordersCount),
//       }],
//     };

//     return (
//       <BarChart
//         data={data}
//         width={350}
//         height={220}
//         yAxisLabel="Product" // Thay đổi nhãn trục y thành "Product"
//         chartConfig={{
//           backgroundColor: '#ffffff',
//           backgroundGradientFrom: '#ffffff',
//           backgroundGradientTo: '#ffffff',
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           propsForDots: {
//             r: '3',
//             strokeWidth: '2',
//             stroke: '#ffa726',
//           },
//         }}
//         style={{ marginVertical: 8, borderRadius: 16 }}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Users Orders Statistics</Text>
//       <View style={styles.chartContainer}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : (
//           renderBarChart()
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#ffffff',
//     justifyContent: 'center', // Căn giữa theo chiều dọc
//     alignItems: 'center', // Căn giữa theo chiều ngang
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   chartContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
// });

// export default UserOrdersStatsScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebase'; // Import Firestore database
import { collection, getDocs } from 'firebase/firestore';
import { BarChart } from 'react-native-chart-kit';

const UserOrdersStatsScreen = () => {
  const [usersOrdersCount, setUsersOrdersCount] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsersOrdersCount();
  }, []);

  const fetchUsersOrdersCount = async () => {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);

      const usersOrdersCountArray = [];
      let totalOrdersCount = 0;

      for (const userDoc of querySnapshot.docs) {
        const userId = userDoc.id;
        const ordersRef = collection(db, `users/${userId}/orders`);
        const ordersSnapshot = await getDocs(ordersRef);

        const ordersCount = ordersSnapshot.size; // Count number of orders for this user
        totalOrdersCount += ordersCount;

        usersOrdersCountArray.push({ userId, ordersCount });
      }

      setUsersOrdersCount(usersOrdersCountArray);
      setTotalOrders(totalOrdersCount);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users orders count: ', error);
      setLoading(false);
    }
  };

  const renderBarChart = () => {
    if (usersOrdersCount.length === 0) {
      return <Text>No data available</Text>;
    }

    const data = {
      labels: usersOrdersCount.map((user) => `User ${user.userId.substr(0, 5)}`),
      datasets: [{
        data: usersOrdersCount.map((user) => user.ordersCount),
      }],
    };

    return (
      <View>
        <BarChart
          data={data}
          width={350}
          height={220}
          yAxisLabel="Orders Count"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '3',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
        <Text style={styles.totalOrdersText}>Total Orders: {totalOrders}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users Orders Statistics</Text>
      <View style={styles.chartContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          renderBarChart()
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalOrdersText: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default UserOrdersStatsScreen;
