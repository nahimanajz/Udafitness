import React, { Component} from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import AddEntry from './components/AddEntry'
class App extends Component {

  render(){
    return (
      <View>
        <AddEntry />
      </View>
    );
  }
  
}
export default App;
