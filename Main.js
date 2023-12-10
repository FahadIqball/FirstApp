import {Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './src/navigation/Onboarding';
import Auth from './src/navigation/Auth';
import App1 from './src/navigation/App';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SubScreens from './src/navigation/SubAppScreens';
import Maps from './src/screens/Maps';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import { Provider } from 'react-redux';
import store from './src/store';

const Stack = createNativeStackNavigator();
const Main = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    console.log('====================================');
    console.log({user: user});
    console.log('====================================');
    if (user) {
      setUser(user);
    } else setUser(null);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  GoogleSignin.configure({
    webClientId:
      '893184638078-g4pf30er04ekkeit1avkqk21v83q7lau.apps.googleusercontent.com',
  });

  useEffect(() => {
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize("b19bf779-271f-4316-9773-c7213f04c76d");

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
    });
  }, []) 

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            <Stack.Screen name="App1" component={App1} />
            <Stack.Screen name="SubScreen" component={SubScreens} />
            <Stack.Screen name="Maps" component={Maps} />
          </>
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Auth" component={Auth} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default Main;
