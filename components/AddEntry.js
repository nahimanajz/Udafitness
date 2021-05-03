import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getMetricMetaInfo} from '../utils/helpers';
import DateHeader from './DateHeader';
import UdaciSlider from './UdaSlider';
import UdaciStepper from './UdaStepper';

function SubmitButton ({onSubmit}){
return(
    <TouchableOpacity
        onPress={onSubmit}
    >
        <Text>SUBMIT </Text>
    </TouchableOpacity>
)
}
export default class AddEntry extends React.Component {

    state = {
        run: 0,
        bike: 0,
        swim:0,
        sleep: 0,
        eat: 0,
    }
    submit = () => {
        const key=timeToString();
        const entry = this.state;
        this.setState(()=>({
            run: 0,
            bike: 0,
            swim:0,
            sleep: 0,
            eat: 0
        }))
        //Navigate to home

        //save to DB;

        //clear Notification
    }

    increment = (metric)=>{
        const { max, step } = getMetricMetaInfo(metric);
        this.setState((state)=>{
            const count = state[metric] + step;
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
        
    }
    decrement = (metric)=>{
        this.setState((state)=>{
            const count = state[metric] - getMetricMetaInfo(metric).step;
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }
    slide = (metric, value)=>{
        this.setState(()=>({
            [metric]: value
        }))
    }
    render(){
        const metaInfo = getMetricMetaInfo();
        return (
            <View>
              <DateHeader date={new Date().toLocaleDateString()} />
              
                {Object.keys(metaInfo).map((key)=>{
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]
                   return(
                       <View key={key}>

                            {getIcon()}
                            {
                                type === 'slider'?
                                <UdaciSlider
                                    value={value}
                                    onChange={()=>this.slide(key, value)}
                                     {...rest}

                                />
                                :
                                <UdaciStepper 
                                    value={value}
                                     onIncrement={()=>this.increment(key)}
                                     onDecrement={()=>this.decrement(key)}
                                    {...rest}
                                />
                                
                            }
                       </View>
                         
                        
                   ) 
                 })}
                <SubmitButton onSubmit={this.submit} />
            </View>
        )
    }
}