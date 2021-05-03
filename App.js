import React, { Component} from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, View } from 'react-native'
import AddEntry from './components/AddEntry'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
class App extends Component {
  state ={
    value:0
  }
 
  handlePress = () => {
    alert('Hi Janvier, it\'s Sophia')
  }

  render(){
    return (
      <View style={styles.container}>
        <AddEntry />
     
      </View>
    );
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    color:'black'
  },
  btn:{
    backgroundColor:'orange',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btnText:{
    color: '#fff'
  }
})
export default App;
