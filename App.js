import React, { Component} from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, View } from 'react-native'
import AddEntry from './components/AddEntry'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
class App extends Component {
 
  handlePress = () => {
    alert('Hi Janvier, it\'s Sophia')
  }

  render(){
    return (
      <View style={styles.container}>
        {/* <AddEntry /> */}
        <TouchableOpacity
          onPress={this.handlePress}
          underlayColor='#d427'
          style={styles.btn}
        >
          <Text style={styles.btnText}> Touchable highlight </Text>

        </TouchableOpacity>
        
          <View style={styles.btn}>
              <TouchableWithoutFeedback
              onPress={this.handlePress}
            >
              <Text style={styles.btnText}> Without Feedback</Text>
            </TouchableWithoutFeedback>
          </View>

       
      </View>
    );
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
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
