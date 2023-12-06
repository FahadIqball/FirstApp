import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Info = () => {
  return (
    <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 50,
        color: 'black'
      }}>Info</Text>
    </View>
  )
}

export default Info

const styles = StyleSheet.create({})