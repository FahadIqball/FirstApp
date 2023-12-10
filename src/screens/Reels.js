import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import muReducer from '../store/reducer';
import {AddAction, ResetAction, SubAction} from '../store/action';

const Reels = () => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.muReducer);
  const theme = useSelector(state => state.theme.mode);
  return (
    <View
      style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: theme.background}}>
      <Text style={{fontSize: 50, color: theme.text}}>{value}</Text>
      <TouchableOpacity onPress={() => dispatch(AddAction(10))}
      style={{borderWidth: 2, width: 100}}>
        <Text style={{fontSize: 20, color: theme.text}}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(SubAction(10))}
      style={{borderWidth: 2, width: 100}}>
        <Text style={{fontSize: 20, color: theme.text}}>Minus</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(ResetAction())}
      style={{borderWidth: 2, width: 100}}>
        <Text style={{fontSize: 20, color: theme.text}}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Reels;

const styles = StyleSheet.create({});
