import { AsyncStorage } from 'react-native';
import {CALENDAR_STORAGE_KEY} from './_calendar'

export function submitEntry({entry, key}){
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
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