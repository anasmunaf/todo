import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from '../utils/GlobalStyle';

export default function ToDo({navigation, route}) {
  const [initialState, setInitialState] = useState([]);

  const {title, desc} = route.params;

  const checkTask = async () => {
    await AsyncStorage.getItem('initialState').then((res) => {
      if (res != '[object Object]') {
        console.log(res);
        setInitialState(JSON.parse(res));
      }
    });
  };

  useEffect(() => {
    checkTask();
    console.log(initialState);
    if (title) getTasks();
  }, [title]);

  const getTasks = async () => {
    let newTask = {};
    let tasks = [...initialState];
    if (tasks.length > 0) {
      const index = tasks[tasks.length - 1];
      newTask.taskID = index.taskID + 1;
    } else {
      newTask.taskID = 1;
    }
    newTask.title = title;
    newTask.desc = desc;
    tasks = [...initialState, newTask];
    // console.log(JSON.stringify(tasks));
    // setInitialState(tasks);
    // AsyncStorage.clear();
    await AsyncStorage.setItem('initialState', JSON.stringify(tasks));
    checkTask();
  };

  const deleteTask = async (id) => {
    const filteredTasks = initialState.filter((arr) => arr.taskID !== id);
    console.log(filteredTasks);
    AsyncStorage.clear();
    await AsyncStorage.setItem('initialState', JSON.stringify(filteredTasks));
    checkTask();
    // AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
    //   .then(() => {
    //     Alert.alert('Success!', 'Task removed successfully.');
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={initialState}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              console.log('press');
              //   navigation.navigate('Task');
            }}>
            <View style={styles.item_row}>
              <View
                style={[
                  {
                    backgroundColor:
                      item.Color === 'red'
                        ? '#f28b82'
                        : item.Color === 'blue'
                        ? '#aecbfa'
                        : item.Color === 'green'
                        ? '#ccff90'
                        : '#ffffff',
                  },
                  styles.color,
                ]}
              />
              <View style={styles.item_body}>
                <Text
                  style={[GlobalStyle.CustomFontHW, styles.title]}
                  numberOfLines={1}>
                  {item.title}
                </Text>
                <Text
                  style={[GlobalStyle.CustomFontHW, styles.subtitle]}
                  numberOfLines={1}>
                  {item.desc}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  deleteTask(item.taskID);
                }}>
                <FontAwesome5 name={'trash'} size={25} color={'#ff3636'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Task');
        }}>
        <FontAwesome5 name={'plus'} size={20} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
  color: {
    width: 20,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
