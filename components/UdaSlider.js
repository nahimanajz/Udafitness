import React from 'react'
import { Text, View } from 'react-native'
import Slider from "react-native-slider"

export default function UdaciSlider ({step, value, unit, max, onChange}){
    
    return (
        <View>
            <Slider 
                step={step}
                value={value}
                maximumValue={max}
                minValue={0}
                onValueChange={onChange}
            />
            <Text>{unit}</Text>
            <Text>{value}</Text>
        </View>
    )
}