import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

const Category = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://fakestoreapi.com/products/categories',
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryPress = category => {
    navigation.navigate('Catdet', {category});
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
      <Text style={styles.categoryTitle}>Category</Text>
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleCategoryPress(item)}>
            <View style={styles.categoryItem}>
              <Text style={styles.title}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    marginTop: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black'
  }
});
