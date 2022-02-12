import React, {useState} from 'react';
import {Alert, StyleSheet, View, ScrollView} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';

export default function Task({navigation}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const setTask = () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        Alert.alert('Success!', 'Task saved successfully.');
        navigation.navigate('ToDo', {title, desc});
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.body}>
        <TextInput
          value={title}
          style={styles.input}
          placeholder="Title"
          onChangeText={(value) => setTitle(value)}
        />
        <TextInput
          value={desc}
          style={styles.input}
          placeholder="Description"
          multiline
          onChangeText={(value) => setDesc(value)}
        />
        <CustomButton
          title="Save Task"
          color="#1eb900"
          style={{width: '100%'}}
          onPressFunction={setTask}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },
});
