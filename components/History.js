import React, { Component} from 'react'
import {View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults }  from '../utils/api'
import { Agenda} from 'react-native-calendars';
import UdaciFitnessCalendar from 'udacifitness-calendar'
import { entries } from '../reducers'
import { white } from '../utils/colors'
import DateHeader from './DateHeader'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MetricCard from './MetricCard'
import AppLoading from 'expo-app-loading';

class History extends Component {
    state = {
        ready: false
    }
    componentDidMount(){
        const {dispatch} = this.props
        fetchCalendarResults()
        .then((entries)=>dispatch(receiveEntries(entries)))
        .then(({entries})=>{
            
            if(!entries[timeToString()]){
                dispatch(addEntry({
                    [timeToString()]: getDailyReminderValue()
                }))
            }
        }).then(()=> this.setState(()=>({
            ready: true
        })))
    }
    renderEmptyDate =(formattedDate)=>(
     
            <View style={styles.item}> 
                <DateHeader date={formattedDate} />
                <Text style={styles.noDataText}>
                     No data for this day 
                </Text>
            </View>
        )
    renderItem=({today, ...metrics}, formattedDate, key)=>{
        alert(Object.keys(formattedDate))
            return(    <View style={styles.item}>
                    { today ?   <View>
                                    <DateHeader date={formattedDate} />
                                    <Text style={styles.noDataText}> {today}</Text>
                                </View>
                        : <TouchableOpacity onPress={()=>console.log("pressed")}>
                            <MetricCard metrics={metrics} date={formattedDate} />
                         </TouchableOpacity>
                    }
                </View>
             )
        }
    render(){
        const { entries } = this.props;
        const { ready } = this.state;

        if(!ready) {
            return <AppLoading />
        }
        return(
            <Agenda
               items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
        )
    }
}
const styles = StyleSheet.create({
    item:{
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16: 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    noDataText: {
        fontSize:20,
        paddingTop: 20,
        paddingBottom: 20
    }
})
const mapStateToProps = (entries)=>({entries})

export default connect(mapStateToProps)(History);