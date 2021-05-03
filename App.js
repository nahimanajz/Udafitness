import React, { Component} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
class App extends Component {

  render(){
    return (
      <View style={styles.container}>
        <Text> Text</Text>
        <Ionicons name="ios-pizza" size={128} color="red" />
        <StatusBar style="auto" />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
