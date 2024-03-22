import React, { useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateInput } from './redux/action';

const EditNotes = () => {
  const [inputValue, setInputValue] = useState(''); // Initialize inputValue state with empty string
  const dispatch = useDispatch();
  const handleSaveNotes = () => {
    if (inputValue.trim() !== '') {
      dispatch(updateInput(inputValue));
      setInputValue('');
      Keyboard.dismiss(); // Dismiss the keyboard
      console.warn("Note Added")
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your note..."
        placeholderTextColor="black"
        value={inputValue}
        onChangeText={setInputValue} // Use setInputValue as onChangeText handler
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveNotes}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: '80%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EditNotes;
