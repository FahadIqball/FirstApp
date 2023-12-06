import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


const Prof = ({navigation}) => {
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
    </View>
  );
};

export default Prof;

const styles = StyleSheet.create({});
