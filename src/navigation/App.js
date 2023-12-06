import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import App from '../../App';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Settings from '../screens/SignUp';
import Upload from '../screens/Upload';
import ProfileTab from '../screens/ProfileTab';
import Search from '../screens/Search';
import Reels from '../screens/Reels';

const Tab = createBottomTabNavigator();
const App1 = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Upload') {
              iconName = 'pluscircleo';
            } else if (route.name === 'User') {
              iconName = 'profile';
            } else if (route.name === 'Search') {
              iconName = 'search1';
            } else if (route.name === 'Reels') {
              iconName = 'playcircleo';
            }

            return <AntDesign name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarActiveBackgroundColor: '#fff',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#e3e1e1',
            position: 'absolute',
            marginHorizontal: 10,
            marginVertical: 14,
            height: 55,
            borderRadius: 20,
            elevation: 5,
          },
          tabBarItemStyle: {
            borderRadius: 20,
          },
        })}>
        <Tab.Screen name="Home" component={App} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Upload" component={Upload} />
        <Tab.Screen name="Reels" component={Reels} />
        <Tab.Screen name="User" component={ProfileTab} />
      </Tab.Navigator>
    </View>
  );
};

export default App1;

const styles = StyleSheet.create({});
