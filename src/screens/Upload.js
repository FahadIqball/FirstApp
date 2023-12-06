import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Gallery from './Gallery';
import Camera from './Camera';

const Tab = createMaterialTopTabNavigator();
const Upload = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'Camera') {
            iconName = 'camera';
          } else if (route.name === 'Gallery') {
            iconName = 'plussquare';
          }

          return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <AntDesign name={iconName} size={30} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: '#fff',
        tabBarPressColor: 'white',
        headerShown: false,
        tabBarIconStyle: {
          width: 80,
          height: 30,
        },
        tabBarStyle: {
          backgroundColor: '#e3e1e1',
          shadowColor: '#000',
          shadowOpacity: 0.7,
          shadowRadius: 30,
          borderRadius: 20,
        },
        tabBarItemStyle: {
          borderRadius: 20,
        },
      })}>
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Gallery" component={Gallery} />
    </Tab.Navigator>
  );
};

export default Upload;

const styles = StyleSheet.create({});
