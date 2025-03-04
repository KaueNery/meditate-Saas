import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     if (password.length < 6) {
//       Alert.alert('Signup Failed', 'Password must be at least 6 characters long.');
//       return;
//     }
  
//     try {
//       const response = await fetch(
//         `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyJlXjyEVPNKCKbylbNFt-eneV-H-uYB8`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: email,
//             password: password,
//             returnSecureToken: true,
//           }),
//         }
//       );
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         throw new Error(data.error?.message || 'Failed to sign up');
//       }
  
//       console.log('User created:', data);
//       Alert.alert('Success', 'Account created successfully!');
//     } catch (error: any) {
//       console.error('Signup Error:', error.message);
//       Alert.alert('Signup Failed', error.message);
//     }
//   };
  

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      navigation.navigate('Main'); // Navigate to main screen
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
  
      setTimeout(() => {
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Main') },
        ]);
      }, 100);
    } catch (error: any) {
      console.error('Signup Error:', error.message);
      Alert.alert('Signup Failed', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4ED',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#4A6572',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#8E97FD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#4A6572',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  signupButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },  
});

export default LoginScreen;
