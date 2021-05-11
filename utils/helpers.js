import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FonteAwesome, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'
import * as color from './colors'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'Udafitness:notification'

export function isBetween (num, x, y) {
    if (num >= x && num <= y) {
      return true
    }
  
    return false
  }
  const styles = StyleSheet.create({
    iconContainer:{
      padding: 5,
      borderRadius:8,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20
    }
  })
  export function calculateDirection (heading) {
    let direction = ''
  
    if (isBetween(heading, 0, 22.5)) {
      direction = 'North'
    } else if (isBetween(heading, 22.5, 67.5)) {
      direction = 'North East'
    } else if (isBetween(heading, 67.5, 112.5)) {
      direction = 'East'
    } else if (isBetween(heading, 112.5, 157.5)) {
      direction = 'South East'
    } else if (isBetween(heading, 157.5, 202.5)) {
      direction = 'South'
    } else if (isBetween(heading, 202.5, 247.5)) {
      direction = 'South West'
    } else if (isBetween(heading, 247.5, 292.5)) {
      direction = 'West'
    } else if (isBetween(heading, 292.5, 337.5)) {
      direction = 'North West'
    } else if (isBetween(heading, 337.5, 360)) {
      direction = 'North'
    } else {
      direction = 'Calculating'
    }
  
    return direction
  }
  
  export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
  }

  export function getMetricMetaInfo(metric){
      const info = {
          run: {
            displayName: 'Run',
            max:50,
            unit: 'miles',
            step: 1,
            type: 'steppers',
            getIcon :() =>(
              <View style={[styles.iconContainer, {backgroundColor:color.red}]}>
                    <MaterialIcons
                      name="directions-run"
                      color={'white'}
                      size={35} />
              </View>
              )

          },
          bike: {
            displayName: 'Bike',
            max:9900,
            unit: 'meters',
            step: 100,
            type: 'steppers',
            getIcon:()=> (
                     <View style={[styles.iconContainer, {backgroundColor:color.orange}]}>
                        <MaterialCommunityIcons 
                            name="bike"
                            color={'white'}
                            size={35}
                        />
                      </View>

                   
                )
          },
          swim: {
            displayName: 'Swim',
            max:9900,
            unit: 'meters',
            step: 100,
            type: 'steppers',
            getIcon:()=>(
                  <View style={[styles.iconContainer, {backgroundColor:color.blue}]}>
                      <MaterialCommunityIcons 
                            name="swim"
                            color={'white'}
                            size={35}
                        />
                  </View>
                      )
            
          },
          eat: {
            displayName: 'Eat',
            max:10,
            unit: 'rating',
            step: 1,
            type: 'slider',
            getIcon:()=>(
                  <View style={[styles.iconContainer, {backgroundColor:color.pink}]}>
                       <MaterialCommunityIcons 
                            name="food"
                            color={'white'}
                            size={35}
                         />
                  </View>
                )
            
          },
          sleep: {
            displayName: 'Sleep',
            max: 24,
            unit: 'hours',
            step: 1,
            type: 'slider',
            getIcon:() => (
               <View style={[ styles.iconContainer, { backgroundColor:color.purple }]}>
                  <FontAwesome
                    name='bed'
                    color={'white'}
                    size={30}
                  />
                </View>
              )
            }
      }
      return (typeof metric === 'undefined')? info: info[metric];
  }
  export const getDailyReminderValue=()=>({
      today: "👋🏿 Don't forget to log your data today !"
    })
  export const clearLocalNotifications =() =>{
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  export const createNotifications =()=>({
    title: 'Log your stats',
    body: '👋🏿 log your stats for today',
    ios:{
      sound:true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  })
  export const setLocalNotification = async() =>{
   await AsyncStorage.getItem(NOTIFICATION_KEY)
   .then(JSON.parse)
   .then(data=>{
     if(data === null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({status})=>{
          if(status === 'granted'){
            Notifications.cancelAllScheduledNotificationsAsync()
            let tommorrow = new Date();
            tommorrow.setDate(tommorrow.getDate() + 1)
            tommorrow.setHours(20)
            tommorrow.setMinutes(0)

            Notfications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tommorrow,
                repeat: 'day'
              }
            )
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
     }
   })
  }
  