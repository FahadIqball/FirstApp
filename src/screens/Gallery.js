import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';
import Video from 'react-native-video';

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const pickMedia = async () => {
    try {
      const result = await ImagePicker.openPicker({
        mediaType: 'mixed',
      });

      if (result) {
        setSelectedMedia(result);
      }
    } catch (error) {
      Alert.alert('Error picking media:', error);
    }
  };

  const uploadFile = async (path, type) => {
    setUploading(true);

    const storageRef = storage().ref(`uploads/${type}/${Date.now()}`);

    const task = storageRef.putFile(path);

    task.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    });

    try {
      await task;

      setUploading(false);
      setUploadProgress(0);
      console.log('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleUpload = () => {
    if (selectedMedia) {
      const mediaType = selectedMedia.mime.startsWith('image')
        ? 'images'
        : 'videos';
      const path = selectedMedia.path || selectedMedia.sourceURL;

      uploadFile(path, mediaType);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#EC8B5E'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 35,
          marginTop: 25,
        }}>
        <TouchableOpacity
          onPress={pickMedia}
          style={{
            borderWidth: 1,
            borderRadius: 35,
            width: 130,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#141A46',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>
            Select Media
          </Text>
        </TouchableOpacity>
      </View>
      {selectedMedia && selectedMedia.mime.startsWith('image') ? (
        <Image
          source={{uri: selectedMedia.path || selectedMedia.sourceURL}}
          style={{width: 360, height: 360, resizeMode: 'cover'}}
        />
      ) : null}

      {selectedMedia && selectedMedia.mime.startsWith('video') ? (
        <Video
          source={{uri: selectedMedia.path || selectedMedia.sourceURL}}
          style={{width: 360, height: 360}}
          controls
        />
      ) : null}

      {uploading && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ProgressBar progress={uploadProgress} width={200} />
        </View>
      )}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 35,
          marginTop: 25,
        }}>
        <TouchableOpacity
          onPress={handleUpload}
          style={{
            borderWidth: 1,
            borderRadius: 35,
            width: 130,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#141A46',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Gallery;
