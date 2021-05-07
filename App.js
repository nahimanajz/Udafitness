import React, { Component} from 'react'
import { View } from 'react-native'
import AddEntry from './components/AddEntry'
import{ createStore } from 'redux'
import { Provider } from 'react-redux'
import { entries } from './reducers/index'
import History from './components/History'

class App extends Component {
  state ={
    value:0
  }
 
  render(){
    return (
      <Provider store={createStore(entries)}>
          <View style={{flex: 1}}>
            <View style={{height: 20}} />
            {/* <AddEntry /> */}
            <History />
          </View>
      </Provider>
      
    );
  }
  
}
export default App;
