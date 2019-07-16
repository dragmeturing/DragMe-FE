import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { shows } from "../mockData";
import ResultCard from "../components/ResultCard";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor } from "../constants/Colors";
import { fetchShows } from '../thunks/fetchShows';
import { connect } from 'react-redux';

export class ResultsScreen extends Component {

  componentDidMount() {
    this.props.fetchShows()
  }

  render() {
    const { container } = mainStyles;
    const results = shows.map(show => (
      <ResultCard
        key={show.id}
        data={show}
        navtigate={this.props.navigation.navigate}
      />
    ));
    return <ScrollView contentContainerStyle={container}>{results}</ScrollView>;
  }
}

ResultsScreen.navigationOptions = {
  title: "Shows",
  headerStyle: {
    backgroundColor: primaryColor
  }
};


export const mapStateToProps = ({ shows }) => {
  shows
};

export const mapDispatchToProps = (dispatch) => ({
  fetchShows: shows => dispatch(fetchShows(shows))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsScreen);