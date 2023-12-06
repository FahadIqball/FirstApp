import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const Camera = () => {
  const [imageRes, setimageRes] = useState('');

  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 100,
      height: 100,
      mediaType:'photo',
    })
      .then(res => {
        setimageRes(res.path)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        source={
          imageRes ? {uri: imageRes} : require('../assets/images/alt.jpeg')
        }
        style={{
          width: '100%',
          height: '60%',
          // borderWidth:2,
          // borderColor:"#000"
        }}
        resizeMode="contain"
      />
      <Pressable style={{padding: 10, borderWidth: 2}} onPress={handleCamera}>
        <Text>FROM CAMERA</Text>
      </Pressable>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({});
