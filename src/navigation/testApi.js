import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Category from '../screens/category';
import CategoryDetails from '../screens/categoryDetails';
import ProductDetails from '../screens/productDetails';

const Stack= createNativeStackNavigator();
const TestApi = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Cat' component={Category}/>
        <Stack.Screen name='Catdet' component={CategoryDetails}/>
        <Stack.Screen name='Product' component={ProductDetails}/>
    </Stack.Navigator>
  )
}

export default TestApi

const styles = StyleSheet.create({})