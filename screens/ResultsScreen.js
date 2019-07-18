import React, { Component } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import ResultCard from "../components/ResultCard";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor, accentColor } from "../constants/Colors";
import { fetchShows } from '../redux/thunks/fetchShows';
import { connect } from 'react-redux';
import { header } from "../components/header";

export class ResultsScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchShows()
  };

  render() {
    const { shows } = this.props;
    const { container } = mainStyles;
    const results = shows.length 
    ? shows.map(show => (
      <ResultCard
        key={show.id}
        data={show}
      />
      ))
    : <ActivityIndicator size="large" color={accentColor} />;

    return <ScrollView contentContainerStyle={container}>{results}</ScrollView>;
  };
};

ResultsScreen.navigationOptions = header;

export const mapStateToProps = (state) => ({
  shows: state.shows
});

export const mapDispatchToProps = (dispatch) => ({
  fetchShows: shows => dispatch(fetchShows(shows))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsScreen);

