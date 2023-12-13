import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProductDetails = ({route}) => {
  const {product} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      <Image source={{uri: item.image}} style={{width: 100, height: 100}} />
      <Text>Title: {product.title}</Text>
      <Text>Price: ${product.price}</Text>
      <Text>Description: {product.description}</Text>
      {/* Add more details based on your requirements */}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
