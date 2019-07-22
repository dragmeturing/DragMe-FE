import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, ActivityIndicator, Text } from "react-native";
import { header } from '../components/header';
import PerformerCard from '../components/PerformerCard';
import { secondaryColor } from '../constants/Colors';

class AllPerformersScreen extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    console.log(this.props.performers)
  }
  
  
  render() {
    const { scroll } = localStyles;
    const performerCards = this.props.performers.map(performer => (
      <PerformerCard key={performer.id} data={performer}/>
    ));
    return (
      <ScrollView contentContainerStyle={scroll}>
        {performerCards}
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  scroll: {
    backgroundColor: secondaryColor,
    flexGrow: 1
  }
});

const mapStateToProps = state => ({
  performers: state.performers
});

AllPerformersScreen.navigationOptions = header;


export default connect(
  mapStateToProps,
)(AllPerformersScreen);
