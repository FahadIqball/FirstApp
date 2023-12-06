import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState('');
  const [editedTodoDescription, setEditedTodoDescription] = useState('');

  const todosCollection = firestore().collection('todos');

  useEffect(() => {
    const unsubscribe = todosCollection.onSnapshot((snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (newTodoTitle.trim() === '') return;

    try {
      await todosCollection.add({
        title: newTodoTitle,
        description: newTodoDescription,
        completed: false,
      });

      setNewTodoTitle('');
      setNewTodoDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, title, description) => {
    try {
      await todosCollection.doc(id).update({
        title,
        description,
      });

      setEditingTodo(null);
      setEditedTodoTitle('');
      setEditedTodoDescription('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todosCollection.doc(id).delete();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const renderItem = ({ item }) => {
    if (editingTodo === item.id) {
      return (
        <View style={styles.todoItem}>
          <TextInput
            style={styles.editTitle}
            placeholder="Edit Title"
            placeholderTextColor={'#EC8B5E'}
            value={editedTodoTitle?.title}
            onChangeText={(text) => setEditedTodoTitle(text)}
          />
          <TextInput
            style={styles.editDescription}
            placeholder="Edit Description"
            placeholderTextColor={'#EC8B5E'}
            value={editedTodoDescription?.descri}
            onChangeText={(text) => setEditedTodoDescription(text)}
          />
          <TouchableOpacity onPress={() => updateTodo(item.id, editedTodoTitle, editedTodoDescription)}>
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{borderWidth: 1, height: 100,marginTop: 5}}>
        <View>
        <Text style={item.completed ? styles.completedText : styles.todoText}>{item.title}</Text>
        <Text style={styles.todoDescription}>{item.description}</Text>
        </View>
        <View style={styles.EditnDel}>
        <TouchableOpacity onPress={() => setEditingTodo(item.id)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new todo title"
        placeholderTextColor={'#EC8B5E'}
        value={newTodoTitle}
        onChangeText={(text) => setNewTodoTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a new todo description"
        placeholderTextColor={'#EC8B5E'}
        value={newTodoDescription}
        onChangeText={(text) => setNewTodoDescription(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EC8B5E'
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    backgroundColor: 'white'
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  todoText: {
    width: 150,
    height: 30,
    fontSize: 17,
    fontWeight: '700',
    color: 'black',
    paddingTop: 3,
    paddingLeft: 5
  },
  todoDescription: {
    borderRadius: 25,
    width: 180,
    height: 69,
    fontSize: 14,
    paddingLeft: 10,
    paddingTop:5,
    marginLeft: 40,
    color: 'black',
    backgroundColor: 'white'
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'grey',
  },
  EditnDel: {
    marginLeft: 240,
    position: 'absolute',
    marginTop: 10
  },
  deleteText: {
    fontSize: 20,
    borderRadius: 35,
    width: 70,
    color: 'red',
    paddingLeft: 7,
    marginTop: 15,
    fontWeight: '700',
    backgroundColor: 'white'
  },
  editText: {
    fontSize: 20,
    fontWeight: '700',
    width:70,
    borderRadius: 25,
    marginTop: 10,
    paddingLeft: 17,
    color: 'blue',
    backgroundColor: 'white'
  },
  editTitle: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    marginRight: 10,
    padding: 8,
    backgroundColor: 'white',
    marginTop: 10
  },
  editDescription: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    marginRight: 10,
    padding: 8,
    backgroundColor: 'white',
    marginTop: 10
  },
  updateText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'green',
    marginTop: 10
  },
});

export default Todo;
