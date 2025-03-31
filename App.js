import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import AddNewToDo from './src/screens/AddNewToDo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' 
        screenOptions={{headerTitleAlign:'center',
          headerTitleStyle:{
            fontWeight:'bold'
          },
        }}
      >
{/* We use {} as a Javascript component to refer to imported React component.
Because name is the identifier used for navigation,
Stack.Screen name must match with whichever page that is using navigation.navigate.
component refers to files in screens.
*/}

        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Add New Todo" 
          component={AddNewToDo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
