import React from 'react'
import { Text, View,StyleSheet } from 'react-native'
import Slider from "react-native-slider"
import { gray } from '../utils/colors'

export default function UdaciSlider ({step, value, unit, max, onChange}){
    
    return (
        <View style={styles.row}>
            <Slider 
                style={{flex: 1}}
                step={step}
                value={value}
                maximumValue={max}
                minValue={0}
                onValueChange={onChange}
            />
            <View style={styles.metricCounters}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color:gray }}>{unit}</Text>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        alignItems: 'center',
        flex:1
    },
    metricCounters:{
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
    }

})