import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {signInWithGoogle} from '../services/firebaseService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/userDataAction';

const Onboarding = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, backgroundColor: '#EC8B5E'}}>
      <View
        style={{
          width: '100%',
          height: 120,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 120,
          marginBottom: 25,
        }}>
        <Text
          style={{
            fontFamily: 'DancingScript-Bold',
            fontSize: 50,
            color: '#141A46',
          }}>
          Anteiku Cafe
        </Text>
        <Text
          style={{
            fontFamily: 'DancingScript-Medium',
            fontSize: 35,
            color: '#141A46',
          }}>
          Coffeetastic!
        </Text>
      </View>
      <View style={{paddingHorizontal: 40}}>
        <View
          style={{
            borderWidth: 3,
            borderRadius: 35,
            borderColor: '#141A46',
            paddingHorizontal: 40,
            paddingVertical: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 500, color: '#141A46'}}>
            Don't have any account?
          </Text>
          <Text style={{fontWeight: 500, marginTop: 5, color: '#141A46'}}>
            Continue with
          </Text>
          <TouchableOpacity
            onPress={() => signInWithGoogle((data) => dispatch(setUserData(data)))}
            style={{
              borderRadius: 35,
              borderColor: '#141A46',
              marginTop: 10,
              backgroundColor: '#141A46',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: 200,
                height: 45,
                alignItems: 'center',
              }}>
              <View style={{marginLeft: 15}}>
                <Icon name="google" size={30} color="red" />
              </View>
              <View
                style={{
                  marginLeft: 25,
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: '700', color: '#EC8B5E', letterSpacing: 1}}>
                  GOOGLE
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <Text style={{opacity: 0.2}}>______________________________</Text>
          <Text style={{fontWeight: 500, marginTop: 5, color: '#141A46'}}>
            Create new account!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Auth', {screen: 'Todo'})}
            style={{
              borderRadius: 35,
              borderColor: '#141A46',
              marginTop: 10,
              backgroundColor: '#141A46',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: 200,
                height: 45,
                alignItems: 'center',
              }}>
              <View style={{marginLeft: 15}}>
                <Icon name="mail" size={30} color="#F9F6EE" />
              </View>
              <View style={{marginLeft: 25}}>
                <Text
                  style={{fontSize: 16, fontWeight: '700', color: '#EC8B5E', letterSpacing: 1}}>
                  CREATE!
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              fontStyle: 'italic',
              fontSize: 15,
              fontWeight: '700',
              color: '#141A46',
            }}
            onPress={() => navigation.navigate('Auth', {screen: 'Login'})}>
            Already have an account?
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
