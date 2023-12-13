import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {locationPermissionHandler} from './src/utils/permissionHandler';
import Icon from 'react-native-vector-icons/Entypo';
import {logout} from './src/services/firebaseService';
import messaging from '@react-native-firebase/messaging';
import {PushNotification} from 'react-native-push-notification';
import {PermissionsAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleTheme} from './src/store/theme';
import { setUserData } from './src/store/userDataAction';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const PROF = [
  {
    id: 1,
    Fname: 'Iwatani',
    Lname: 'Naofumi',
    image: require('./src/assets/images/naofumi.webp'),
    dp: require('./src/assets/images/instaprof/naofumi.jpg'),
    text: '300 Likes',
    txt: 'RAGE SHEILD!',
  },
  {
    id: 2,
    Fname: 'Eren',
    Lname: 'Yeager',
    image: require('./src/assets/images/eren.webp'),
    dp: require('./src/assets/images/instaprof/eren.jpg'),
    text: '163 Likes',
    txt: "I'll kill all the Titans.",
  },
  {
    id: 3,
    Fname: 'Lelouch',
    Lname: 'Lamperouge',
    image: require('./src/assets/images/lelouch.jpg'),
    dp: require('./src/assets/images/instaprof/lelouch.jpg'),
    text: '589 Likes',
    txt: 'Order of the Black Knights',
  },
  {
    id: 4,
    Fname: 'Mikasa',
    Lname: 'Ackerman',
    image: require('./src/assets/images/mikasa.webp'),
    dp: require('./src/assets/images/instaprof/mikasa.jpg'),
    text: '623 Likes',
    txt: 'Erenn~~!',
  },
  {
    id: 5,
    Fname: 'Levi',
    Lname: 'Ackerman',
    image: require('./src/assets/images/levi.webp'),
    dp: require('./src/assets/images/instaprof/levi.webp'),
    text: '453 Likes',
    txt: 'Give up or Die',
  },
];
const App = ({navigation}) => {
  const [name, setName] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const imageUrl = useSelector(state => state.image.imageUrl);
  const [modal1Visible, setModal1Visible] = useState(false);
  const userData = useSelector(state => state.user.fullName);
  const toggleModal1 = () => {
    setModal1Visible(!modal1Visible);
  };
  const dispatch = useDispatch();
  const handletheme = () => {
    dispatch(toggleTheme());
  };
  const renderstory_ = ({item, index}) => {
    return (
      <View
        style={{
          width: 80,
          height: 100,
          marginHorizontal: 5,
          marginVertical: 3,
        }}>
        <Image
          source={item.dp}
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            resizeMode: 'cover',
            borderWidth: 3,
            borderColor: 'green',
          }}></Image>
        <Text
          style={{
            justifyContent: 'flex-end',
            textAlign: 'center',
            color: '#060606',
          }}>
          {item.Fname}
        </Text>
      </View>
    );
  };

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  };

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();

      console.log('User FCM TOKEN..', fcmToken);
    } catch (error) {
      console.log('Error', error);
    }
    // }
  };

  const notificationListener = async () => {
    try {
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        navigation.navigate('SubScreen', {
          screen: 'Messages',
          messageId: remoteMessage.data.messageId,
        });
      });
      messaging().onMessage(async remoteMessage => {
        console.log('Received in Foreground', remoteMessage);
        PushNotification.createChannel({
          channelId: 'channel-id', // (required)
          channelName: 'My channel', // (required)
        });
        PushNotification.localNotification({
          channelId: 'channel-id',
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body, // (required)
          showWhen: true,
          color: 'red',
        });
      });
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth().currentUser.uid;

        if (userId) {
          const userDocument = await firestore().collection('users').doc(userId).get();

          if (userDocument.exists) {
            dispatch(setUserData({...userDocument.data(), documentId: userDocument.id}));
          } else {
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

  React.useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);
  const renderpost_ = ({item, index}) => {
    return (
      <View style={{width: '100%', height: 400}}>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View
            style={{
              width: '100',
              height: 350,
              backgroundColor: 'white',
              marginTop: 410,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{
                backgroundColor: 'grey',
                borderWidth: 1,
                height: 120,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <View
                style={{
                  marginTop: 5,
                  width: 30,
                  height: 5,
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  borderRadius: 40,
                }}></View>
              <View
                style={{
                  borderWidth: 1,
                  width: '100%',
                  height: 110,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 50,
                    width: 50,
                  }}></View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          visible={modal1Visible}
          hardwareAccelerated={true}
          onRequestClose={toggleModal1}
          transparent={true}>
          <View
            style={{
              width: '100',
              height: 350,
              backgroundColor: 'white',
              marginTop: 410,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{
                backgroundColor: 'grey',
                borderWidth: 1,
                height: 120,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <View
                style={{
                  marginTop: 5,
                  width: 30,
                  height: 5,
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  borderRadius: 40,
                }}></View>
              <View
                style={{
                  borderWidth: 1,
                  width: '100%',
                  height: 110,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 50,
                    width: 50,
                  }}></View>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={item.dp}
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              margin: 10,
            }}></Image>
          <Text
            style={{
              color: '#000',
              fontSize: 15,
              fontWeight: '700',
              marginTop: 15,
            }}>
            {item.Fname}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 15,
              fontWeight: '700',
              marginTop: 15,
              marginLeft: 5,
            }}>
            {item.Lname}
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
              height: 35,
              marginLeft: 330,
              position: 'absolute',
            }}
            onPress={() => setModalVisible(true)}>
            <Icon name={'dots-three-vertical'} size={25} color={'black'} />
          </TouchableOpacity>
        </View>
        <Image
          source={item.image}
          style={{width: '100%', height: 260, resizeMode: 'cover'}}></Image>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => logout()}>
            <Image
              source={require('./src/assets/icons/like.png')}
              style={{width: 30, height: 30, margin: 5}}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: 30, height: 30, margin: 5}}
            onPress={handletheme}>
            <Icon name={'dots-three-vertical'} size={25} color={'black'} />
          </TouchableOpacity>
          <Image
            source={require('./src/assets/icons/send.png')}
            style={{width: 30, height: 30, margin: 5}}></Image>
          <TouchableOpacity onPress={toggleModal1}>
            <Image
              source={require('./src/assets/icons/save.png')}
              style={{
                width: 30,
                height: 30,
                // marginLeft: 315,
                marginTop: 5,
              }}></Image>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#000',
            marginLeft: 10,
            fontSize: 15,
            fontWeight: '600',
          }}>
          {item.text}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: '#000',
              marginLeft: 10,
              fontSize: 15,
              fontWeight: '700',
            }}>
            {item.Fname}
          </Text>
          <Text
            style={{
              color: '#000',
              marginLeft: 2,
              fontSize: 15,
              fontWeight: '700',
            }}>
            :
          </Text>
          <Text
            style={{
              color: '#000',
              marginLeft: 7,
              fontSize: 15,
              fontWeight: '500',
            }}>
            {item.txt}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
      }}>
      <FlatList
        data={PROF}
        refreshing={isLoading}
        onRefresh={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
          }, 1500);
        }}
        ListHeaderComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 50,
                paddingTop: 3,
              }}>
              <Image
                source={require('./src/assets/icons/instagram.png')}
                style={{
                  width: '40%',
                  height: 45,
                  marginLeft: 7,
                }}></Image>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SubScreen', {screen: 'Notifications'})
                }
                style={{position: 'absolute'}}>
                <Image
                  source={require('./src/assets/icons/like.png')}
                  style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    marginLeft: 270,
                    marginTop: 2,
                  }}></Image>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SubScreen', {screen: 'Messages'})
                }
                style={{position: 'absolute'}}>
                <Image
                  source={require('./src/assets/icons/msg.png')}
                  style={{
                    width: 35,
                    height: 35,
                    position: 'absolute',
                    marginLeft: 310,
                  }}></Image>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <FlatList
                data={PROF}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                horizontal
                ListHeaderComponent={() => (
                  <View
                    style={{
                      width: 80,
                      height: 100,
                      marginHorizontal: 5,
                      marginVertical: 3,
                    }}>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        borderColor: 'grey',
                        backgroundColor: '#000',
                      }}>
                      <Image
                        source={
                          userData.url
                            ? {uri: userData.url}
                            : require('./src/assets/images/user.png')
                        }
                        style={{
                          borderWidth: 2,
                          borderColor: 'grey',
                          width: 80,
                          height: 80,
                          borderRadius: 50,
                        }}
                        resizeMode="cover"
                      />
                    </View>

                    <Text
                      style={{
                        color: '#000',
                        textAlign: 'center',
                      }}>
                      Your story
                    </Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderstory_}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderpost_}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'grey',
              width: '100%',
              height: 1,
            }}></View>
        )}
        ListFooterComponent={() => (
          <View
            style={{
              width: '100%',
              height: 50,
            }}>
            <ActivityIndicator size={'large'} color={'grey'} />
          </View>
        )}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
