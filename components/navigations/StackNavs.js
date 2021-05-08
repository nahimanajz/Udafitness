import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import History from '../History';
import AddEntry from '../AddEntry';
import EntryDetail from '../EntryDetails';
import { orange, purple } from '../../utils/colors';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();
export const  StackNavs = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="addEntry"> 
                <Stack.Screen name="history" component={History} /> 
                <Stack.Screen name="addEntry" component={AddEntry} options={{
                    title:'ADD Entry'                
                    }} /> 
                <Stack.Screen name="entryDetails" component={EntryDetail} />
               
            </Stack.Navigator>
        </NavigationContainer>
    )
  }