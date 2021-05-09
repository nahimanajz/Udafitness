import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors';
import MetricCard from './MetricCard';


class EntryDetail extends Component {

  static Navigation= ({navigation}) => {
    const {entryId} = navigation.state.params;
    const title = entryId && `${entryId.slice(0, 4)}/${entryId.slice( 5, 7)}/${entryId.slice(4)}`
    return title;
  }
  render() {
    const { metrics } = this.props;
    return (
      <View style={styles.container}>
        <MetricCard  metrics={metrics}/>
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
export default connect(mapStateToProps)(EntryDetail)