import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';


import MainView from './Controller/MainView';
import AddTodo from './Controller/AddTodo';

const App = StackNavigator({
  MainView: { screen: MainView },
  AddTodo:{screen:AddTodo},
}, {
    tintColor: '#fff',
    headerStyle: {
      backgroundColor: '#00A0E9'
    }
  });

  export default App;


