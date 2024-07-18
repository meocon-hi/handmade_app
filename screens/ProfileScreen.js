// import { StyleSheet, Text, View,SafeAreaView,Pressable } from 'react-native'
// import React from 'react'
// import { auth } from '../firebase'
// import { signOut } from 'firebase/auth';
// import { useNavigation } from '@react-navigation/native';

// const ProfileScreen = () => {
//     const user = auth.currentUser;
//     const navigation = useNavigation();
//     const signOutUser = () => {
//         signOut(auth).then(() => {
//             navigation.replace("Login");
//         }).catch(err => {
//             console.log(err);
//         })
//     }
//   return (
//     <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
//       <Pressable style={{marginVertical:10}}>
//         <Text>welcome {user.email}</Text>
//       </Pressable>

//       <Pressable onPress={signOutUser}>
//           <Text>Sign Out</Text>
//       </Pressable>
//     </SafeAreaView>
//   )
// }

// export default ProfileScreen

// const styles = StyleSheet.create({})

import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut, updateEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Thêm thư viện vector icons
import OrderHistoryScreen from './OrderHistoryScreen';



const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const [email, setEmail] = useState(user.email);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateUserEmail = () => {
    updateEmail(user, email).then(() => {
      Alert.alert("Email Updated!");
    }).catch(error => {
      Alert.alert("Error:", error.message);
    });
  };
  const navigateToOrderHistory = () => {
    navigation.navigate('OrderHistoryScreen');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
      
      <Image
        source={{ uri: 'https://blog.maika.ai/wp-content/uploads/2024/02/anh-meo-meme-21.jpg' }}
        style={styles.avatar}
      />
      <Pressable style={styles.welcome}>
        <Text style={styles.welcomeText}>Welcome {email}</Text>
      </Pressable>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="New Email"
          value={email}
          onChangeText={setEmail}
        />
        <Pressable onPress={updateUserEmail} style={styles.button}>
          <Text style={styles.buttonText}>Update Email</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate("hehe")}>
          <Text style={styles.buttonText}>History buy</Text>
        </Pressable>
      </View>

      <Pressable onPress={signOutUser} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#009999',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  welcome: {
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    width: '80%',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#009999',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
