import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Notifications from '../screens/notifications';
import MessageScreen from '../screens/messageScreen';

const Stack = createNativeStackNavigator();
const SubScreens = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Messages" component={MessageScreen} />
    </Stack.Navigator>
  )
}

export default SubScreens

const styles = StyleSheet.create({})