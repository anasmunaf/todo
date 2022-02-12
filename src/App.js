import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ToDo from './screens/ToDo';
import Task from './screens/Task';
// import {Provider} from 'react-redux';
// import {Store} from './redux/store';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const RootStack = createStackNavigator();

function App() {
  return (
    // <Provider store={Store}>
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
        }}>
        <RootStack.Screen
          initialParams={{title: null, desc: null}}
          name="ToDo"
          component={ToDo}
        />
        <RootStack.Screen name="Task" component={Task} />
      </RootStack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}

export default App;
