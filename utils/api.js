import AsyncStorage from '@react-native-community/async-storage'
import {CALENDAR_STORAGE_KEY, formatCalendarResults} from './_calendar'

export const fetchCalendarResults = async()=>{
    return await AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(formatCalendarResults)
}
export const  submitEntry = async ({entry, key})=>{
    console.log({[key]: entry})
    return await AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]:entry
    }));
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