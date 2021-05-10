import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React,{ Component}from 'react'
import { Text, View,StyleSheet,Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getMetricMetaInfo, timeToString, getDailyReminderValue} from '../utils/helpers'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import UdaciSlider from './UdaSlider'
import UdaciStepper from './UdaStepper'
import { submitEntry, removeEntry } from '../utils/api'
import { addEntry } from '../actions/index'
import {connect } from 'react-redux'
import * as color from '../utils/colors'


function SubmitButton ({onSubmit}){
return(
    <TouchableOpacity
    style={Platform.OS === 'ios'? styles.iosSubmitButton:styles.androidSubmitButton}
        onPress={onSubmit}
    >
        <Text style={styles.submitBtnText}>SUBMIT </Text>
    </TouchableOpacity>
)
}
class AddEntry extends Component {

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

        this.props.dispatch(addEntry({
            [key]: entry
        }))
        this.setState(()=>({
            run: 0,
            bike: 0,
            swim:0,
            sleep: 0,
            eat: 0
        }))
        this.toHome()

        //save to DB;
        submitEntry({key, entry})

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
    reset = ()=> {
        const key = timeToString()
        this.props.dispatch(addEntry({ 
            [key]: getDailyReminderValue()
        }))
        //update redux
        removeEntry(key)
        //route to home
        //Update "DB"
    }
    toHome (){
        this.props.navigation.dispatch(NavigationAction.back({
            key: 'AddEntry'
        }))
    }
    render(){
        const metaInfo = getMetricMetaInfo();
        if(this.props.isAlreadyLogged){
            return (
                <View style={styles.center}>
                    <Ionicons name={Platform.OS === 'ios'?"ios-happy-outline":"md-happy"} size={100}/>
                    <Text> You already logged your information Today </Text>
                    <TextButton style={{padding: 10}} onPress={this.reset}> Reset</TextButton>
                </View>
            )
        }
        return (
            <View style={styles.container}>
              <DateHeader date={new Date().toLocaleDateString()} />
              
                {Object.keys(metaInfo).map((key)=>{
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]
                   return(
                       <View key={key} style={styles.row}>
                            {getIcon()}
                            {
                                type === 'slider'?
                                <UdaciSlider
                                    value={value}
                                    onChange={(value)=> this.slide(key, value)}
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
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 50,
        backgroundColor:color.white
    },
    row:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitButton: {
        backgroundColor:color.purple,
        padding: 10,
        borderRadius:7,
        height:45,
        marginLeft:40,
        marginRight:40

    },
    androidSubmitButton: {
        backgroundColor:color.purple,
        padding: 10,
        paddingLeft:30,
        paddingRight:30,
        height: 45,
        borderRadius:2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText:{
        fontSize: 22,
        color: color.white,
        textAlign: 'center'
    },
    center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft:30
    }
    
})
const mapStateToProps = (state) => {
    const key = timeToString()
    return{
        isAlreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
};
export default connect(mapStateToProps)(AddEntry)