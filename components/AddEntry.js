import React from 'react'
import { Text, View } from 'react-native'
import { getMetricMetaInfo} from '../utils/helpers';

export default class AddEntry extends React.Component {

    render(){
        return (
            <View>
                { getMetricMetaInfo('bike').getIcon() }
            </View>
        )
    }
}