import React, { Component } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import ResultCard from "../components/ResultCard";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor, accentColor, secondaryColor } from "../constants/Colors";
import { fetchShows } from "../redux/thunks/fetchShows";
import { connect } from "react-redux";
import { header } from "../components/header";
import { fetchVenues } from "../redux/thunks/fetchVenues";
import { fetchPerformers } from "../redux/thunks/fetchPerformers";

export class ResultsScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchShows();
    this.props.fetchVenues();
    this.props.fetchPerformers();
  }

  render() {
    const { shows } = this.props;
    const { scroll } = localStyles;
    const results = shows.length ? (
      shows.map(show => <ResultCard key={show.id} data={show} />)
    ) : (
      <ActivityIndicator size="large" color={accentColor} />
    );

    return <ScrollView contentContainerStyle={scroll}>{results}</ScrollView>;
  }
}

const localStyles = StyleSheet.create({
  scroll: {
    backgroundColor: secondaryColor
  }
});

ResultsScreen.navigationOptions = header;

export const mapStateToProps = state => ({
  shows: state.shows
});

export const mapDispatchToProps = dispatch => ({
  fetchShows: () => dispatch(fetchShows()),
  fetchVenues: () => dispatch(fetchVenues()),
  fetchPerformers: () => dispatch(fetchPerformers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsScreen);
