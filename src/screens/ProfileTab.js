import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Prof from './Prof';
import Info from './Info';
import Settings from './Settings';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerLayoutAndroid } from 'react-native-gesture-handler';
import Maps from './Maps';

const Drawer = createDrawerNavigator();
const ProfileTab = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Drawer.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          drawerStyle: {
            backgroundColor: "violet"
          },
          drawerIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Profile') {
              iconName = 'home';
            } else if (route.name === 'Settings') {
              iconName = 'gear';
            } else if (route.name === 'Info') {
              iconName = 'user';
            } else if (route.name === 'Location') {
              iconName = 'map-marker';
            }

            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={iconName} size={30} color={color} />
              </View>
            );
          },
        })}>
        <Drawer.Screen name="Profile" component={Prof} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Info" component={Info} />
        <Drawer.Screen name="Location" component={Maps} />
      </Drawer.Navigator>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({});
