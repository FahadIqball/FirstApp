import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {setImageUrl} from '../store/dpactions';
import ImageCropPicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import * as Progress from 'react-native-progress';
import storage from '@react-native-firebase/storage';

const Prof = ({navigation}) => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const imageUrl = useSelector(state => state.image.imageUrl);
  const [uploadProgress, setuploadProgress] = useState(0);

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
        dispatch(setImageUrl(url));
      });
    } catch (error) {
      setisLoading(false);
      console.log(error);
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
            _fadyyyy
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
                imageUrl
                  ? {uri: imageUrl}
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
    </View>
  );
};

export default Prof;

const styles = StyleSheet.create({});
