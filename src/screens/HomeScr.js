import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScr = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');

        if (userId) {
          const userDocument = await firestore().collection('users').doc(userId).get();

          if (userDocument.exists) {
            setUserData({...userDocument.data(), documentId: userDocument.id});
          } else {
            console.warn('User data not found in Firestore');
          }
        } else {
          console.warn('No user identifier found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateName = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await firestore().collection('users').doc(userId).update({
        name,
      });
    } catch (err) {
      Alert.alert('Error', 'Data not Updated');
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await firestore().collection('users').doc(userId).update({
        email,
      });
    } catch (err) {
      Alert.alert('Error', 'Data not Updated');
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await firestore().collection('users').doc(userId).update({
        pass,
      });
    } catch (err) {
      Alert.alert('Error', 'Data not Updated');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await firestore().collection('users').doc(userId).delete();
      navigation.navigate('Sign Up');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#EC8B5E',justifyContent: 'center', alignContent: 'center'}}>
      {userData ? (
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              
            }}>
            <Text
              style={{
                fontFamily: 'DancingScript-Bold',
                fontSize: 50,
                color: '#141A46',
              }}>
              Your Settings!
            </Text>
          </View>
          <View style={{marginTop: 30}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 700,
                marginLeft: 20,
                color: '#141A46',
              }}>
              Full Name:{' '}
            </Text>
            <View style={{flexDirection: 'row', marginLeft: 40, marginTop: 10}}>
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  borderRadius: 45,
                  paddingLeft: 15,
                  backgroundColor: 'white',
                }}
                placeholder={userData.name}
                placeholderTextColor="#141A46"
                onChangeText={text => setname(text)}
                value={name}
              />
              <TouchableOpacity
                onPress={handleUpdateName}
                style={{
                  borderRadius: 45,
                  backgroundColor: '#141A46',
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    width: 100,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: '#EC8B5E', fontSize: 20, fontWeight: '700'}}>
                    Update
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 700,
                marginLeft: 20,
                color: '#141A46',
              }}>
              Email:{' '}
            </Text>
            <View style={{flexDirection: 'row', marginLeft: 40, marginTop: 10}}>
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  borderRadius: 45,
                  paddingLeft: 15,
                  backgroundColor: 'white',
                }}
                placeholder={userData.email}
                placeholderTextColor="#141A46"
                onChangeText={text => setemail(text)}
                value={email}
              />
              <TouchableOpacity
                onPress={handleUpdateEmail}
                style={{
                  borderRadius: 45,
                  backgroundColor: '#141A46',
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    width: 100,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: '#EC8B5E', fontSize: 20, fontWeight: '700'}}>
                    Update
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 700,
                marginLeft: 20,
                color: '#141A46',
              }}>
              Password:{' '}
            </Text>
            <View style={{flexDirection: 'row', marginLeft: 40, marginTop: 10}}>
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  borderRadius: 45,
                  paddingLeft: 15,
                  backgroundColor: 'white',
                }}
                placeholder={userData.pass}
                placeholderTextColor="#141A46"
                secureTextEntry
                onChangeText={text => setpass(text)}
                value={pass}
              />
              <TouchableOpacity
                onPress={handleUpdatePassword}
                style={{
                  borderRadius: 45,
                  backgroundColor: '#141A46',
                  marginLeft: 10,
                }}>
                <View
                  style={{
                    width: 100,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: '#EC8B5E', fontSize: 20, fontWeight: '700'}}>
                    Update
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
            }}>
            <TouchableOpacity
              onPress={handleDeleteAccount}
              style={{
                borderRadius: 45,
                backgroundColor: '#141A46',
              }}>
              <View
                style={{
                  width: 200,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: '#EC8B5E', fontSize: 20, fontWeight: '700'}}>
                  Delete Account!
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={{fontFamily: 'DancingScript-Bold', fontSize: 45}}>Loading User Data...</Text>
      )}
    </View>
  );
};

export default HomeScr;

const styles = StyleSheet.create({});
