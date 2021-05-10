import React, { Component } from "react"
import { ActivityIndicator,TouchableOpacity,StyleSheet, View, Text } from "react-native"
import { Foundation } from "@expo/vector-icons"
import { purple, white} from "../utils/colors"
import { back } from "react-native/Libraries/Animated/src/Easing"

export default class Live extends Component {
    state = {
        coords: null,
        status: 'undetermined',
        direction: ''
    }
    askPermission(){
        //
    }
    render(){
        const {status, coords, direction} = this.state;
        if(status === null){
            return <ActivityIndicator style={{marginTop: 30}} />
        }
        if(status === 'denied') {
            return (
                <View>
                    <Tex>Denied</Tex>
                </View>
            )
        }
       
        if(status === 'undetermined') {
            return (
                <View style={styles.center}>
                    <Foundation name="alert" size={100} />
                    <Text>You need to enable location services</Text>
                    <TouchableOpacity onPress={this.askPermission} style={styles.submitBtnText}>
                        <Text style={{color:white}}>Enable</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight:30
    },
    submitBtnText:{
        fontSize: 22,
        color: white,
        textAlign: 'center',
        backgroundColor:purple,
        padding:10, 
        borderRadius:7
        
    },

})