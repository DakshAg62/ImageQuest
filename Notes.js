import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notes = () => {
  const navigation = useNavigation();
  
  const handleCreateEditPress = () => {
    navigation.navigate('Create/Edit');
  };

  const notesData = useSelector((state) => state.inputReducer.notes); // Corrected the reducer name
  const renderItem = ({ item }) => <Text style={styles.text}>{item.text}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={notesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Corrected keyExtractor
        style={styles.list}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateEditPress}>
        <Text>✍️</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'green',
    fontSize: 16,
    padding: 5,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 100,
  },
});

export default Notes;
