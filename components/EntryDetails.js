import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import MetricCard from './MetricCard'
import {addEntry} from '../actions/index'
import { removeEntry } from '../utils/helpers'
import { getDailyReminderValue, timeToString } from '../utils/helpers'
import TextButton from './TextButton'


class EntryDetail extends Component {

  static Navigation= ({navigation}) => {
    const {entryId} = navigation.state.params;
    const title = entryId && `${entryId.slice(0, 4)}/${entryId.slice( 5, 7)}/${entryId.slice(4)}`
    return title;
  }
  reset() {
    const{remove, goBack, entryId} = this.props;
    remove()
    goBack()
    removeEntry(entryId)
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }
  render() {
    const { metrics } = this.props;
    return (
      <View style={styles.container}>
        <MetricCard  metrics={metrics}/>
        <TextButton onPress={this.reset} style={{margin: 20}}>
          RESET
        </TextButton>
        <Text>Entry Detail - {JSON.stringify(this.props.navigation.state.params.entryId)}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
})
const mapStateToProps =(state, {navigation})=>{
  const { entryId } = navigation.state.params;

  return{ entryId, metrics: state[entryId] }
}
const mapDispatchToProps =(dispatch,{navigation})=>{
  const { entryId } = navigation.state.params;
  return {
    remove: ()=>dispatch(addEntry({
      [entryId]: timeToString() === entryId ? getDailyReminderValue() : null,
    })),
    goBack: navigation.goBack()
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)