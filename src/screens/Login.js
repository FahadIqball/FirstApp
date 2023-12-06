import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginWithEmail} from '../services/firebaseService';
import {resetPassword} from '../services/firebaseService';
import firestore from '@react-native-firebase/firestore';

const Login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const handleCheckAndNavigate = async () => {
    try {
      if (!email || !pass) {
        Alert.alert('Error', 'Please input your credentials.');
        return;
      }

      // Check if the credentials exist in Database
      const snapshot = await firestore()
        .collection('users')
        .where('email', '==', email)
        .where('pass', '==', pass)
        .get();

      if (snapshot.empty) {
        Alert.alert('Error', 'No account found.');
      } else {
        navigation.navigate('Home Scr');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const [inputText, setInputText] = useState('');

  // const handleLogin = () => {
  //   loginWithEmail(email, pass)
  // }

  // const handleReset = () => {
  //   resetPassword(email)
  // }

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
            fontSize: 50,
            fontFamily: 'DancingScript-Bold',
            color: '#141A46',
          }}>
          LOGIN
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
          placeholder="Email"
          placeholderTextColor="#141A46"
          value={email}
          onChangeText={text => setemail(text)}
          keyboardType="email-address"></TextInput>
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
          placeholderTextColor="#141A46"
          value={pass}
          onChangeText={text => setpass(text)}
          secureTextEntry
        />
      </View>
      <View
        style={{margin: 40, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => handleCheckAndNavigate()}
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
              Login
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
