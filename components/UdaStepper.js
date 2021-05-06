import { Entypo, FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Text, View,TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, white } from '../utils/colors'

export default function UdaciStepper ({onDecrement, onIncrement, value, unit}){
    return (
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
            {Platform.OS === 'ios'?
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={onDecrement} style={[styles.iosBtn,{borderTopRightRadius:0, borderBottomRightRadius:0}]}>
                        <Entypo name="minus" size={30} color={purple}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onIncrement} style={[styles.iosBtn,{borderTopLeftRadius:0, borderBottomLeftRadius:0}]}>
                        <Entypo name="plus" size={30} color={purple}/>
                    </TouchableOpacity>
                </View>
            :
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={onDecrement} style={[styles.androidBtn,{borderTopRightRadius:0, borderBottomRightRadius:0}]}>
                        <FontAwesome name="minus" size={30} color={white}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onIncrement} style={[styles.androidBtn,{borderTopLeftRadius:0, borderBottomLeftRadius:0}]}>
                        <FontAwesome name="plus" size={30} color={white}/>
                    </TouchableOpacity>
                </View>
            
            
            }
            <View>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{ value }</Text>
                <Text style={{fontSize: 18, color: 'grey'}}>{ unit }</Text>
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
},
iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius:3,
    padding: 5,
    paddingLeft:25,
    paddingRight: 25,
},
androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10
},
metricCounters: {
 width:85,
 justifyContent: 'center'
}
})