import AsyncStorage from '@react-native-community/async-storage'
import {CALENDAR_STORAGE_KEY, formatCalendarResults} from './_calendar'

export const fetchCalendarResults = async()=>{
    try {
    return await AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(formatCalendarResults)
        
    } catch (error) {
        console.log(error.message)
    }
}
export const  submitEntry = async ({entry, key})=>{
   try {
    return await AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]:entry
    }));
   } catch (error) {
    console.log(error.message)   
   }
    
}
export const  removeEntry= async (key)=>{
    try {
        return await AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((result)=>{
             const data = JSON.stringify(result);
             data[key] = undefined
             delete data[key]
             AsyncStorage.setItem(CALENDAR_STORAGE_KEY,JSON.stringify(data))
         })
    } catch (error) {
        console.error(error.message)
    }
  
}