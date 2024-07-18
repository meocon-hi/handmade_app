// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
// import { auth, db } from '../firebase'; // Import Firestore database and authentication
// import { collection, getDocs } from 'firebase/firestore';

// const hehe = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const ordersRef = collection(db, `users/${user.uid}/orders`);
//         const ordersSnapshot = await getDocs(ordersRef);
//         const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setOrders(ordersData);
//       } else {
//         Alert.alert('Error', 'No user is logged in');
//       }
//     } catch (error) {
//       console.error('Error fetching orders: ', error);
//       Alert.alert('Error', 'Failed to fetch orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.orderContainer}>
//       <Text style={styles.orderId}>Order ID: {item.id}</Text>
//       {item.items && Object.keys(item.items).map((itemId) => (
//         <View key={itemId} style={styles.itemContainer}>
//           <Text style={styles.orderInfo}>Product ID: {item.items[itemId].id}</Text>
//           <Text style={styles.orderInfo}>Product Name: {item.items[itemId].name}</Text>
//           <Text style={styles.orderInfo}>Price: ₹{item.items[itemId].price}</Text>
//           <Text style={styles.orderInfo}>Quantity: {item.items[itemId].quantity}</Text>
//         </View>
//       ))}
//       {item.pickUpDetails ? (
//         <View style={styles.pickUpDetailsContainer}>
//           <Text style={styles.pickUpDetailsTitle}>Pick Up Details:</Text>
//           <Text style={styles.pickUpDetailsText}>Estimated Delivery: {item.pickUpDetails.no_Of_days}</Text>
//           <Text style={styles.pickUpDetailsText}>Pick Up Date: {item.pickUpDetails.pickUpDate?.toDate().toLocaleString()}</Text>
//           <Text style={styles.pickUpDetailsText}>Selected Time: {item.pickUpDetails.selectedTime}</Text>
//         </View>
//       ) : (
//         <Text style={styles.noPickUpDetails}>No pick up details found</Text>
//       )}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Order History</Text>
//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <FlatList
//           data={orders}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           style={styles.list}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 30,
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   list: {
//     flex: 1,
//   },
//   orderContainer: {
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   orderId: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#333',
//   },
//   orderInfo: {
//     fontSize: 14,
//     color: '#666',
//   },
//   itemContainer: {
//     marginBottom: 5,
//   },
//   pickUpDetailsContainer: {
//     marginTop: 10,
//   },
//   pickUpDetailsTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#555',
//   },
//   pickUpDetailsText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   noPickUpDetails: {
//     fontSize: 14,
//     color: '#999',
//   },
// });

// export default hehe;
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebase'; // Import Firestore database and authentication
import { collection, getDocs } from 'firebase/firestore';

const hehe = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const ordersRef = collection(db, `users/${user.uid}/orders`);
        const ordersSnapshot = await getDocs(ordersRef);
        const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } else {
        Alert.alert('Error', 'No user is logged in');
      }
    } catch (error) {
      console.error('Error fetching orders: ', error);
      Alert.alert('Error', 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderId}>Order ID: {item.id}</Text>
      {item.items && Object.keys(item.items).map((itemId) => (
        <View key={itemId} style={styles.itemContainer}>
          <Text style={styles.orderInfo}>Product ID: {item.items[itemId].id}</Text>
          <Text style={styles.orderInfo}>Product Name: {item.items[itemId].name}</Text>
          <Text style={styles.orderInfo}>Price: ₹{item.items[itemId].price}</Text>
          <Text style={styles.orderInfo}>Quantity: {item.items[itemId].quantity}</Text>
        </View>
      ))}
      {item.pickUpDetails ? (
        <View style={styles.pickUpDetailsContainer}>
          <Text style={styles.pickUpDetailsTitle}>Pick Up Details:</Text>
          <Text style={styles.pickUpDetailsText}>Estimated Delivery: {item.pickUpDetails.no_Of_days}</Text>
          <Text style={styles.pickUpDetailsText}>Pick Up Date: {item.pickUpDetails.pickUpDate?.toDate().toLocaleString()}</Text>
          <Text style={styles.pickUpDetailsText}>Selected Time: {item.pickUpDetails.selectedTime}</Text>
        </View>
      ) : (
        <Text style={styles.noPickUpDetails}>No pick up details found</Text>
      )}
      <Text style={styles.totalText}>Total: ₹{calculateTotal(item.items)}</Text>
    </View>
  );

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    marginTop:30,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    flex: 1,
  },
  orderContainer: {
    
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  orderId: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  orderInfo: {
    fontSize: 14,
    color: '#666',
  },
  itemContainer: {
    marginBottom: 5,
  },
  pickUpDetailsContainer: {
    marginTop: 10,
  },
  pickUpDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  pickUpDetailsText: {
    fontSize: 14,
    color: '#666',
  },
  noPickUpDetails: {
    fontSize: 14,
    color: '#999',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#009999',
  },
});

export default hehe;
