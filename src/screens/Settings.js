import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Settings = () => {
  return (
    <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 50,
        color: 'black'
      }}>Settings</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})