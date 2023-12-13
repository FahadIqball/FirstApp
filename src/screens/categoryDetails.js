import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

const CategoryDetails = ({route, navigation}) => {
  const {category} = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${category}`,
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleProductPress = product => {
    navigation.navigate('Product', {product});
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products in {category}</Text>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleProductPress(item)}>
            <Image 
            source={{uri: item.image}}
            style={{width: 100, height: 100}}/>
            <View style={styles.productItem}>
              <Text style={styles.productTitle}>{item.title}</Text>
              {/* Display other product details as needed */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryDetails;

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
  productItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
