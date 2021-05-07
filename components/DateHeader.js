import React from 'react';
import { Text } from 'react-native'
import { purple } from '../utils/colors'
import moment from 'moment'

export default DateHeader =({date})=>{
    const convertedDate = date && (JSON.stringify(date).substring(1, 11))
return(
        <Text style={{fontSize: 25, color: purple}}> {moment(convertedDate).format('MMMM Do YYYY')} </Text>
)
}
 