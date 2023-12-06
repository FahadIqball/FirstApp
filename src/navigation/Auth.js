import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import HomeScr from '../screens/HomeScr';
import todos from '../screens/todos';

const Stack = createNativeStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home Scr" component={HomeScr} />
      <Stack.Screen name="Todo" component={todos} />
    </Stack.Navigator>
  );
};

export default Auth;

const styles = StyleSheet.create({});
