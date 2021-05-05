import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Text, View,TouchableOpacity } from 'react-native'

export default function UdaciStepper ({onDecrement, onIncrement, value, unit}){
    return (
        <View>
            <TouchableOpacity onPress={onDecrement}>
                <FontAwesome name="minus" size={30} color={'black'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onIncrement}>
                <FontAwesome name="plus" size={30} color={'black'}/>
            </TouchableOpacity>
            <View>
                <Text>{ value }</Text>
                <Text>{ unit }</Text>
            </View>
        </View>
    )
}