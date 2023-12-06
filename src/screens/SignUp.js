import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {registerUserWithEmail} from '../services/firebaseService';
import {usersCollection} from '../services/firestoreServices';
import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  // const handleRegister = () => {
  //   registerUserWithEmail(email, pass);
  // };

  const handleValidation = async () => {
    try {
      if (!name || !email || !pass) {
        Alert.alert('Error', 'Please fill in all fields.');
      } else {
        const userId = uuidv4();
        await AsyncStorage.setItem('userId', userId);
        await firestore().collection('users').doc(userId).set({
          name,
          email,
          pass,
        });
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#EC8B5E'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}>
        <Text
          style={{
            fontSize: 40,
            fontFamily: 'DancingScript-Bold',
            color: '#141A46',
          }}>
          Create New Account !
        </Text>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <TextInput
          style={{
            height: 40,
            width: 250,
            marginTop: 15,
            borderRadius: 45,
            paddingLeft: 15,
            backgroundColor: 'white',
          }}
          placeholder="Full Name"
          placeholderTextColor={'#141A46'}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={{
            height: 40,
            width: 250,
            marginTop: 15,
            borderRadius: 45,
            paddingLeft: 15,
            backgroundColor: 'white',
          }}
          placeholder="Email"
          placeholderTextColor={'#141A46'}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={{
            height: 40,
            width: 250,
            marginTop: 15,
            borderRadius: 45,
            paddingLeft: 15,
            backgroundColor: 'white',
          }}
          placeholder="Password"
          placeholderTextColor={'#141A46'}
          value={pass}
          onChangeText={text => setPass(text)}
          secureTextEntry
        />
      </View>
      <View
        style={{marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => handleValidation()}
          style={{
            borderRadius: 35,
            backgroundColor: '#141A46',
          }}>
          <View
            style={{
              width: 200,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#EC8B5E', fontSize: 20, fontWeight: '700'}}>
              Create!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
