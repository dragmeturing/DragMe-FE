import React, { Component } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import ResultCard from "../components/ResultCard";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor, accentColor } from "../constants/Colors";
import { fetchShows } from '../thunks/fetchShows';
import { connect } from 'react-redux';

export class ResultsScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchShows()
  };

  render() {
    const { shows } = this.props
    const { container } = mainStyles;
    const results = shows.length 
    ? shows.objects.map(show => (
      <ResultCard
        key={show.id}
        data={show}
        navtigate={this.props.navigation.navigate}
        />
      ))
    : <ActivityIndicator size="large" color={accentColor} />;

    return <ScrollView contentContainerStyle={container}>{results}</ScrollView>;
  };
};

ResultsScreen.navigationOptions = {
  title: "Shows",
  headerStyle: {
    backgroundColor: primaryColor
  }
};


export const mapStateToProps = (state) => {
  console.log('state', state)
  return ({shows: state.shows})
};

export const mapDispatchToProps = (dispatch) => ({
  fetchShows: shows => dispatch(fetchShows(shows))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsScreen);