// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
// import { db } from '../firebase'; // Import Firestore database
// import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

// const ManageOrdersScreen = () => {
//   const [users, setUsers] = useState([]);
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [editEmail, setEditEmail] = useState('');

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'users'));
//       const usersArray = [];
      
//       for (const userDoc of querySnapshot.docs) {
//         const userData = userDoc.data();
//         const ordersSnapshot = await getDocs(collection(db, `users/${userDoc.id}/orders`));
//         const orders = {};

//         ordersSnapshot.forEach(orderDoc => {
//           orders[orderDoc.id] = orderDoc.data();
//         });

//         usersArray.push({ id: userDoc.id, ...userData, orders });
//       }

//       setUsers(usersArray);
//     } catch (error) {
//       console.error('Error fetching users: ', error);
//       Alert.alert('Error', 'Failed to fetch users');
//     }
//   };

//   const deleteUser = async (userId) => {
//     try {
//       await deleteDoc(doc(db, 'users', userId));
//       setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
//       Alert.alert('Success', 'User deleted successfully');
//     } catch (error) {
//       console.error('Error deleting user: ', error);
//       Alert.alert('Error', 'Failed to delete user');
//     }
//   };

//   const editUser = async (userId) => {
//     try {
//       const userDoc = doc(db, 'users', userId);
//       await updateDoc(userDoc, { email: editEmail });
//       setEditingUserId(null);
//       setEditEmail('');
//       Alert.alert('Success', 'User updated successfully');
//       fetchUsers(); // Refresh user list after update
//     } catch (error) {
//       console.error('Error updating user: ', error);
//       Alert.alert('Error', 'Failed to update user');
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.userContainer}>
//       <View style={styles.userInfoContainer}>
//         <Text style={styles.userInfo}>ID: {item.id}</Text>
//         <Text style={styles.userInfo}>Email: {item.email}</Text>
//         <Text style={styles.userInfo}>Phone: {item.phone}</Text>

//         <View style={styles.ordersContainer}>
//           <Text style={styles.ordersTitle}>Orders:</Text>
//           {item.orders ? (
//             Object.keys(item.orders).map((orderId) => (
//               <View key={orderId} style={styles.orderItem}>
//                 <Text style={styles.orderInfo}>Order ID: {orderId}</Text>
//                 {item.orders[orderId].items ? (
//                   Object.keys(item.orders[orderId].items).map((itemId) => (
//                     <View key={itemId} style={styles.itemContainer}>
//                       <Text style={styles.orderInfo}>Product ID: {item.orders[orderId].items[itemId].id}</Text>
//                       <Text style={styles.orderInfo}>Product Name: {item.orders[orderId].items[itemId].name}</Text>
//                       <Text style={styles.orderInfo}>Price: ₹{item.orders[orderId].items[itemId].price}</Text>
//                       <Text style={styles.orderInfo}>Quantity: {item.orders[orderId].items[itemId].quantity}</Text>
//                     </View>
//                   ))
//                 ) : (
//                   <Text style={styles.noItems}>No items found</Text>
//                 )}

//                 {item.orders[orderId].pickUpDetails ? (
//                   <View style={styles.pickUpDetailsContainer}>
//                     <Text style={styles.pickUpDetailsTitle}>Pick Up Details:</Text>
//                     <Text style={styles.pickUpDetailsText}>Estimated Delivery: {item.orders[orderId].pickUpDetails.no_Of_days}</Text>
//                     <Text style={styles.pickUpDetailsText}>Pick Up Date: {item.orders[orderId].pickUpDetails.pickUpDate?.toDate().toLocaleString()}</Text>
//                     <Text style={styles.pickUpDetailsText}>Selected Time: {item.orders[orderId].pickUpDetails.selectedTime}</Text>
//                   </View>
//                 ) : (
//                   <Text style={styles.noPickUpDetails}>No pick up details found</Text>
//                 )}
//               </View>
//             ))
//           ) : (
//             <Text style={styles.noOrders}>No orders found</Text>
//           )}
//         </View>
//       </View>

//       <View style={styles.buttonContainer}>
//         {editingUserId === item.id ? (
//           <View style={styles.editButtons}>
//             <Button title="Save" onPress={() => editUser(item.id)} />
//             <Button title="Cancel" onPress={() => setEditingUserId(null)} color="gray" />
//           </View>
//         ) : (
//           <View style={styles.editButtons}>
//             <Button title="Edit" onPress={() => {
//               setEditingUserId(item.id);
//               setEditEmail(item.email);
//             }} />
//             <Button title="Delete" onPress={() => deleteUser(item.id)} color="red" />
//           </View>
//         )}
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Manage Users</Text>
//       <FlatList
//         data={users}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         style={styles.list}
//       />
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
//   },
//   list: {
//     flex: 1,
//   },
//   userContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   userInfoContainer: {
//     flex: 1,
//   },
//   userInfo: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   ordersContainer: {
//     marginTop: 10,
//   },
//   ordersTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   orderItem: {
//     marginBottom: 10,
//   },
//   orderInfo: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   noOrders: {
//     fontSize: 14,
//     color: 'gray',
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
//   },
//   pickUpDetailsText: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   noPickUpDetails: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   noItems: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     marginBottom: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   editButtons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });

// export default ManageOrdersScreen;



import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { db } from '../firebase'; // Import Firestore database
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const ManageOrdersScreen = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersArray = [];

      for (const userDoc of querySnapshot.docs) {
        const userData = userDoc.data();
        const ordersSnapshot = await getDocs(collection(db, `users/${userDoc.id}/orders`));
        const orders = {};

        ordersSnapshot.forEach(orderDoc => {
          orders[orderDoc.id] = orderDoc.data();
        });

        usersArray.push({ id: userDoc.id, ...userData, orders });
      }

      setUsers(usersArray);
    } catch (error) {
      console.error('Error fetching users: ', error);
      Alert.alert('Error', 'Failed to fetch users');
    }
  };

  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      Alert.alert('Success', 'User deleted successfully');
    } catch (error) {
      console.error('Error deleting user: ', error);
      Alert.alert('Error', 'Failed to delete user');
    }
  };

  const editUser = async (userId) => {
    try {
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, { email: editEmail });
      setEditingUserId(null);
      setEditEmail('');
      Alert.alert('Success', 'User updated successfully');
      fetchUsers(); // Refresh user list after update
    } catch (error) {
      console.error('Error updating user: ', error);
      Alert.alert('Error', 'Failed to update user');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfo}>ID: {item.id}</Text>
        {editingUserId === item.id ? (
          <TextInput
            style={styles.input}
            value={editEmail}
            onChangeText={setEditEmail}
          />
        ) : (
          <Text style={styles.userInfo}>Email: {item.email}</Text>
        )}
        <Text style={styles.userInfo}>Phone: {item.phone}</Text>

        <View style={styles.ordersContainer}>
          <Text style={styles.ordersTitle}>Orders:</Text>
          {item.orders ? (
            Object.keys(item.orders).map((orderId) => (
              <View key={orderId} style={styles.orderItem}>
                <Text style={styles.orderInfo}>Order ID: {orderId}</Text>
                {item.orders[orderId].items ? (
                  Object.keys(item.orders[orderId].items).map((itemId) => (
                    <View key={itemId} style={styles.itemContainer}>
                      <Text style={styles.orderInfo}>Product ID: {item.orders[orderId].items[itemId].id}</Text>
                      <Text style={styles.orderInfo}>Product Name: {item.orders[orderId].items[itemId].name}</Text>
                      <Text style={styles.orderInfo}>Price: ₹{item.orders[orderId].items[itemId].price}</Text>
                      <Text style={styles.orderInfo}>Quantity: {item.orders[orderId].items[itemId].quantity}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noItems}>No items found</Text>
                )}

                {item.orders[orderId].pickUpDetails ? (
                  <View style={styles.pickUpDetailsContainer}>
                    <Text style={styles.pickUpDetailsTitle}>Pick Up Details:</Text>
                    <Text style={styles.pickUpDetailsText}>Estimated Delivery: {item.orders[orderId].pickUpDetails.no_Of_days}</Text>
                    <Text style={styles.pickUpDetailsText}>Pick Up Date: {item.orders[orderId].pickUpDetails.pickUpDate?.toDate().toLocaleString()}</Text>
                    <Text style={styles.pickUpDetailsText}>Selected Time: {item.orders[orderId].pickUpDetails.selectedTime}</Text>
                  </View>
                ) : (
                  <Text style={styles.noPickUpDetails}>No pick up details found</Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noOrders}>No orders found</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {editingUserId === item.id ? (
          <View style={styles.editButtons}>
            <Button title="Save" onPress={() => editUser(item.id)} />
            <Button title="Cancel" onPress={() => setEditingUserId(null)} color="gray" />
          </View>
        ) : (
          <View style={styles.editButtons}>
            <Button title="Edit" onPress={() => {
              setEditingUserId(item.id);
              setEditEmail(item.email);
            }} />
            <Button title="Delete" onPress={() => deleteUser(item.id)} color="red" />
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Order</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    flex: 1,
  },
  userContainer: {
    flexDirection: 'column', // Change to column for better layout
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align to start for better readability
    padding: 15,
    marginBottom: 10,
    borderRadius: 8, // Slightly more rounded corners
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000', // Add shadow for better UI
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  userInfoContainer: {
    flex: 1,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  ordersContainer: {
    marginTop: 10,
  },
  ordersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  orderItem: {
    marginBottom: 10,
    paddingLeft: 10, // Add some padding for better readability
  },
  orderInfo: {
    fontSize: 14,
    color: '#666',
  },
  noOrders: {
    fontSize: 14,
    color: '#999',
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
  noItems: {
    fontSize: 14,
    color: '#999',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  editButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ManageOrdersScreen;
