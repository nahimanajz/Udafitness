import React, { Component } from "react"
import { ActivityIndicator,TouchableOpacity,StyleSheet, View, Text, Animated } from "react-native"
import { Foundation } from "@expo/vector-icons"
import { orange, purple, white} from "../utils/colors"
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location'
import { calculateDirection } from '../utils/helpers'

export default class Live extends Component {
    state = {
        coords: null,
        status: 'granted',
        direction: '',
        bounceValue: new Animated.Value(1)

    }
    async componentDidMount(){
       await Permissions.getAsync(Permissions.LOCATION).then(({status}) =>{
            if(status === 'granted'){
                return this.setLocation()
            }
            this.setState(()=>({status}))

        }).catch(error =>{
            console.warn(`Erro getting location permissions${error}`)
            this.setState(()=>({status: 'undetermined'}))
        })
    }
     setLocation(){
         Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval:1,
            distanceInterval:1,
        },({coords})=>{
            const newDirection = calculateDirection(coords.heading)
            const { direction, bounceValue } = this.state
            if(direction !== newDirection){
                Animated.sequence([
                    Animated.timing(bounceValue, { duration: 200, toValue: 1.04 ,useNativeDriver: true}),
                    Animated.spring(bounceValue, { toValue:1, friction: 4, useNativeDriver: true}) 
                    
                ]).start()
            }
            this.setState(()=>({
                coords,
                status: 'granted',
                direction: newDirection
            }))
            
        })
        
    }
    async askPermission(){
        await Permissions.askAsync(Permissions.LOCATION).then(({status})=>{
            if(status === 'granted'){
                return this.setLocation()
            }
            this.setState(()=>({status}))
        }).catch(error=> console.log(`Error while asking location permissions${error}`))
    }
    render(){
        const {status, coords, direction, bounceValue} = this.state;
       

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
        return (
            <View style={styles.container}>
                <View style={styles.directionContainer}>
                    <Text style={styles.header}>You're heading </Text>
                    <Animated.Text style={[styles.direction, {transform:[{scale: bounceValue}]}]}>
                        {direction} 
                    </Animated.Text >
                </View>
                <View style={styles.metricContainer}>
                    <View style={styles.metric}>
                        <Text style={[ styles.header, {color:white }]}> Altitude </Text>
                        <Text style={[ styles.subHeader, {color:white }]}> {coords && (Math.round(coords.altitude * 3.2808))} Feet </Text>
                    </View>
                    <View style={styles.metric}>
                        <Text style={[ styles.header, {color:white }]}> Speed </Text>
                        <Text style={[ styles.subHeader, {color:white }]}> { coords && (coords.speed * 2.2369).toFixed(1)} Mph </Text>
                    </View>
                </View>
                
            </View>
        )
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
    header: {
        fontSize: 35,
        textAlign: 'center'
    },
    direction: {
        color:purple,
        fontSize: 120,
        textAlign:'center', 
    },
    metric: {
        flex: 1,
        paddingTop:15,
        paddingBottom: 15,
        backgroundColor: 'rgba(255,255,255,0.1)', //glass background
        marginTop:20,
        marginBottom: 20,
        marginLeft:10,
        marginRight:10
    },
    subHeader: {
        fontSize: 25,
        textAlign: 'center',
        marginTop:5
    },
    metricContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:purple
    },
    directionContainer:{
        flex:1,
        justifyContent: 'center'
    },
    container:{
        flex: 1,
        justifyContent: 'space-between'
    }
})