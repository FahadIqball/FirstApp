import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useRef, useEffect} from 'react';
import MapView, {Marker, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { locationPermissionHandler } from '../utils/permissionHandler';

const Maps = () => {
  const marker = [
    {
      id: 1,
      latlng: {
        latitude: 28.383066,
        longitude: 70.343007,
      },
      img: require('../assets/images/eren.webp'),
      title: 'Eren',
      description: 'Humanity Exterimination!',
    },
    {
      id: 2,
      latlng: {
        latitude: 28.410963486280494,
        longitude: 70.32805713557357,
      },
      img: require('../assets/images/mikasa.webp'),
      title: 'Mikasa',
      description: 'Family',
    },
    {
      id: 3,
      latlng: {
        latitude: 28.41279947197669,
        longitude: 70.33346376832448,
      },
      img: require('../assets/images/lelouch.jpg'),
      title: 'Lelouch',
      description: 'Black Knights',
    },
    {
      id: 4,
      latlng: {
        latitude: 28.415509325149582,
        longitude: 70.33220870238938,
      },
      img: require('../assets/images/levi.webp'),
      title: 'Levi',
      description: 'ZEKE!!!',
    },
    {
      id: 5,
      latlng: {
        latitude: 28.39595020479112,
        longitude: 70.33428015099769,
      },
      img: require('../assets/images/naofumi.webp'),
      title: 'Iwatani',
      description: 'Naofumi sama~',
    },
  ];
  const handleDragEnd = latlong => {
    mapRef?.current?.animateCamera({
      center: latlong,
      heading: 0,
      pitch: 90,
    });
  };
  const mapRef = useRef();
  const origin = {latitude: 28.393242621119708, longitude: 70.33196453934644};

  useEffect(() => {
    locationPermissionHandler();
  }, []);

  return (
    <View>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: 28.393242621119708,
          longitude: 70.33196453934644,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          width: '100%',
          height: '100%',
          borderWidth: 2,
        }}>
        {marker.map((marker, index) => (
          <Marker
            draggable
            onDragEnd={e => {
              handleDragEnd(e.nativeEvent.coordinate);
            }}
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}>
            <Image source={marker.img} style={{width: 50, height: 50}} />
          </Marker>
        ))}
        <Circle 
          center = {origin}
          radius = {500}
          strokeColor='#000'
          strokeWidth={2}
          fillColor='rgba(154,155,156,0.4)'/>
      </MapView>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({});
