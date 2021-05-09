import React, { Component} from 'react'
import { Platform, StatusBar, View } from 'react-native'
import AddEntry from './components/AddEntry'
import{ createStore } from 'redux'
import { Provider } from 'react-redux'
import { entries } from './reducers/index'
import History from './components/History'
import { Ionicons,FontAwesome } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { purple, white } from './utils/colors'
import {StackNavs} from './components/navigations/StackNavs'

function UdaciStatusBar ({backgroundColor, ...props}){
return (
      <View style={{backgroundColor, height: 40}}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
)
}
const Tab = createBottomTabNavigator();
const Tabs= () => (
<NavigationContainer>
  <Tab.Navigator
  tabBarOptions={{
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 65,
      backgroundColor:Platform.OS === 'ios' ?white:purple,
      shadowColor:'rgba(0,0,0,0.24)',
      shadowOffset:{
        width:0,
        height:3
      },
      shadowRadius: 6,
      shadowOpacity:1
    }
  }}
  initialRouteName='History'
  >
    <Tab.Screen name="History" component={History} options={{
      tabBarLabel: 'History',
      tabBarIcon:({color, size})=>(
        <Ionicons name='ios-bookmarks' size={size} color={color} />
      ),
    }} />
    <Tab.Screen name="AddEntry" component={AddEntry} options={{
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({color, size})=>(
        <FontAwesome name='plus-square' size={size} color={color} />
      ),
    }} />
  </Tab.Navigator>
</NavigationContainer>
) 

class App extends Component {
  state ={
    value:0
  }
 
  render(){
    return (
      <Provider store={createStore(entries)}>
        <SafeAreaProvider> 
          <View style={{flex: 1}}>
            <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
            <Tabs />
            {/* <StackNavs /> */}
          </View>
        </SafeAreaProvider>
         
      </Provider>
      
    );
  }
  
}
export default App;
