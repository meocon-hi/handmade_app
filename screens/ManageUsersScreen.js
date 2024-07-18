// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, Button, Alert, TextInput } from 'react-native';
// import { db } from '../firebase'; // Import Firestore database
// import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

// const ManageUsersScreen = () => {
//   const [users, setUsers] = useState([]);
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [editEmail, setEditEmail] = useState('');

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'users'));
//       const usersArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
//         {editingUserId === item.id ? (
//           <TextInput
//             style={styles.input}
//             placeholder="Enter new email"
//             value={editEmail}
//             onChangeText={setEditEmail}
//           />
//         ) : (
//           <>
//             <Text style={styles.userInfo}>ID: {item.id}</Text>
//             <Text style={styles.userInfo}>Email: {item.email}</Text>
           
//           </>
//         )}
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

// export default ManageUsersScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { db } from '../firebase'; // Import Firestore database
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const ManageUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
        {editingUserId === item.id ? (
          <TextInput
            style={styles.input}
            placeholder="Enter new email"
            value={editEmail}
            onChangeText={setEditEmail}
          />
        ) : (
          <>
            <Text style={styles.userInfo}>ID: {item.id}</Text>
            <Text style={styles.userInfo}>Email: {item.email}</Text>
          </>
        )}
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
      <Text style={styles.title}>Manage Users</Text>
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
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  userInfoContainer: {
    flex: 1,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ManageUsersScreen;
