// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
// import { db } from '../firebase'; // Import Firestore database
// import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// const AdminProductScreen = () => {
//   const [products, setProducts] = useState([]);
//   const [id, setId] = useState('');
//   const [image, setImage] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [editingIndex, setEditingIndex] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const querySnapshot = await getDocs(collection(db, 'types'));
//     const productsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
//     setProducts(productsArray);
//   };

//   const addProduct = async () => {
//     if (!id || !image || !name || !price || !quantity) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     const newProduct = { id, image, name, price, quantity };

//     try {
//       if (editingIndex !== null) {
//         const productDoc = doc(db, 'types', products[editingIndex].id);
//         await updateDoc(productDoc, newProduct);
//         setProducts(prevProducts => {
//           const updatedProducts = [...prevProducts];
//           updatedProducts[editingIndex] = { ...newProduct, id: productDoc.id };
//           return updatedProducts;
//         });
//         setEditingIndex(null);
//       } else {
//         const docRef = await addDoc(collection(db, 'types'), newProduct);
//         setProducts([...products, { ...newProduct, id: docRef.id }]);
//       }

//       setId('');
//       setImage('');
//       setName('');
//       setPrice('');
//       setQuantity('');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to add product');
//       console.error('Error adding product: ', error);
//     }
//   };

//   const editProduct = (index) => {
//     const product = products[index];
//     setId(product.id);
//     setImage(product.image);
//     setName(product.name);
//     setPrice(product.price);
//     setQuantity(product.quantity);
//     setEditingIndex(index);
//   };

//   const deleteProduct = async (productId) => {
//     try {
//       await deleteDoc(doc(db, 'types', productId));
//       setProducts(products.filter(product => product.id !== productId));
//     } catch (error) {
//       Alert.alert('Error', 'Failed to delete product');
//       console.error('Error deleting product: ', error);
//     }
//   };

//   const renderItem = ({ item, index }) => (
//     <View style={styles.productContainer}>
//       <Image source={{ uri: item.image }} style={styles.productImage} />
//       <View style={styles.productDetails}>
//         <Text style={styles.productText}>ID: {item.id}</Text>
//         <Text style={styles.productText}>Name: {item.name}</Text>
//         <Text style={styles.productText}>Price: ${item.price}</Text>
//         <Text style={styles.productText}>Quantity: {item.quantity}</Text>
//         <View style={styles.productActions}>
//           <Button title="Edit" onPress={() => editProduct(index)} />
//           <Button title="Delete" onPress={() => deleteProduct(item.id)} color="red" />
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Admin Product Management</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="Product ID"
//           value={id}
//           onChangeText={setId}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Image URL"
//           value={image}
//           onChangeText={setImage}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Product Name"
//           value={name}
//           onChangeText={setName}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Product Price"
//           value={price}
//           onChangeText={setPrice}
//           keyboardType="numeric"
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Quantity"
//           value={quantity}
//           onChangeText={setQuantity}
//           keyboardType="numeric"
//           style={styles.input}
//         />
//         <Button title={editingIndex !== null ? "Update Product" : "Add Product"} onPress={addProduct} />
//       </View>
//       <FlatList
//         data={products}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         style={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
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
//   inputContainer: {
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   list: {
//     flex: 1,
//   },
//   productContainer: {
//     flexDirection: 'row',
//     padding: 15,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     marginRight: 10,
//   },
//   productDetails: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   productText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   productActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
// });

// export default AdminProductScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { db } from '../firebase'; // Import Firestore database
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const AdminProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [details, setDetails] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'types'));
    const productsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setProducts(productsArray);
  };

  const addProduct = async () => {
    if (!id || !image || !name || !price || !quantity || !details) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newProduct = { id, image, name, price, quantity, details };

    try {
      if (editingIndex !== null) {
        const productDoc = doc(db, 'types', products[editingIndex].id);
        await updateDoc(productDoc, newProduct);
        setProducts(prevProducts => {
          const updatedProducts = [...prevProducts];
          updatedProducts[editingIndex] = { ...newProduct, id: productDoc.id };
          return updatedProducts;
        });
        setEditingIndex(null);
      } else {
        const docRef = await addDoc(collection(db, 'types'), newProduct);
        setProducts([...products, { ...newProduct, id: docRef.id }]);
      }

      setId('');
      setImage('');
      setName('');
      setPrice('');
      setQuantity('');
      setDetails('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add product');
      console.error('Error adding product: ', error);
    }
  };

  const editProduct = (index) => {
    const product = products[index];
    setId(product.id);
    setImage(product.image);
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    setDetails(product.details);
    setEditingIndex(index);
  };

  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, 'types', productId));
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete product');
      console.error('Error deleting product: ', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productText}>ID: {item.id}</Text>
        <Text style={styles.productText}>Name: {item.name}</Text>
        <Text style={styles.productText}>Price: ${item.price}</Text>
        <Text style={styles.productText}>Quantity: {item.quantity}</Text>
        <Text style={styles.productText}>Details: {item.details}</Text>
        <View style={styles.productActions}>
          <Button title="Edit" onPress={() => editProduct(index)} />
          <Button title="Delete" onPress={() => deleteProduct(item.id)} color="red" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Product Management</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Product ID"
          value={id}
          onChangeText={setId}
          style={styles.input}
        />
        <TextInput
          placeholder="Image URL"
          value={image}
          onChangeText={setImage}
          style={styles.input}
        />
        <TextInput
          placeholder="Product Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Product Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Details"
          value={details}
          onChangeText={setDetails}
          style={styles.input}
        />
        <Button title={editingIndex !== null ? "Update Product" : "Add Product"} onPress={addProduct} />
      </View>
      <FlatList
        data={products}
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
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productText: {
    fontSize: 16,
    marginBottom: 5,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default AdminProductScreen;
