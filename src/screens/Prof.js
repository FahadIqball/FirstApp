import {StyleSheet, Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {setImageUrl} from '../store/dpactions';
import ImageCropPicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import * as Progress from 'react-native-progress';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'
import { setUserData } from '../store/userDataAction';

const Prof = ({navigation}) => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const imageUrl = useSelector(state => state.image.imageUrl);
  const [uploadProgress, setuploadProgress] = useState(0);
  // const [userData, setUserData] = useState(null);
  const [fullName, setname] = useState('');
  const [Email, setemail] = useState('');
  const userData = useSelector(state => state.user.fullName)

  const handleGallery = () => {
    ImageCropPicker.openPicker({
      width: 500,
      height: 500,
      mediaType: 'photo',
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(res => {
        upload(res.path);
      })
      .catch(err => {});
  };

  const upload = async uri => {
    try {
      setisLoading(true);
      const user = auth().currentUser;
      const reference = storage().ref(
        `${user.uid}/Profile_pic/${new Date().getTime()}.jpg`,
      );

      const task = reference.putFile(uri);
      task.on('state_changed', snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setuploadProgress(progress);
      });

      task.then(async () => {
        setisLoading(false);
        const url = await reference.getDownloadURL();
        await firestore().collection('users').doc(user.uid).update({url})
        const imageUrl = await firestore().collection('users').doc(user.uid).get()
        if (imageUrl.exists) {
          dispatch(setUserData({...imageUrl.data() }));
        } else {
          Alert.alert('Image url not found.')
        }
        
      });
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };


  const handleUpdateName = async () => {
    try {
      const userId = auth().currentUser.uid;
      await firestore().collection('users').doc(userId).update({
        fullName,
      });
    } catch (err) {
      Alert.alert('Error', 'Data not Updated');
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const userId = auth().currentUser.uid;
      await firestore().collection('users').doc(userId).update({
        Email,
      });
    } catch (err) {
      Alert.alert('Error', 'Data not Updated');
    }
  };


  return (
    <View style={{flex: 1}}>
      <View
        style={{
          borderBottomWidth: 2,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          borderColor: 'black',
        }}>
        <View
          style={{
            borderColor: 'grey',
            marginRight: 260,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 20,
              color: 'black',
              marginLeft: 15,
              marginTop: 15,
            }}>
            {userData.fullName}
          </Text>
        </View>
        <View style={{position: 'absolute', marginLeft: 290, marginTop: 11}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name={'instagram'} size={35} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 120,
          padding: 20,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 95,
            height: 95,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isLoading ? (
            <Progress.CircleSnail
              progress={uploadProgress}
              size={40}
              color="black"
              thickness={5}
            />
          ) : (
            <Image
              source={
                userData.url
                  ? {uri: userData.url}
                  : require('../assets/images/user.png')
              }
              style={{
                width: 90,
                height: 90,
                borderRadius: 50,
              }}
              resizeMode="cover"
            />
          )}
        </View>
        <View
          style={{
            borderColor: 'black',
            borderWidth: 2,
            width: 200,
            height: 40,
            borderRadius: 20,
            marginLeft: 20,
          }}>
          <TouchableOpacity onPress={handleGallery}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Nunito-Medium',
                marginTop: 5,
                alignSelf: 'center',
              }}>
              Change Picture
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{justifyContent: 'center', alignContent: 'center'}}>
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
                placeholder={userData.fullName}
                placeholderTextColor="#141A46"
                onChangeText={text => setname(text)}
                value={fullName}
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
                placeholder={userData.Email}
                placeholderTextColor="#141A46"
                onChangeText={text => setemail(text)}
                value={Email}
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
        </>
      ) : (
        <Text style={{fontFamily: 'DancingScript-Bold', fontSize: 45}}>Loading User Data...</Text>
      )}
    </View>
    </View>
  );
};

export default Prof;

const styles = StyleSheet.create({});
