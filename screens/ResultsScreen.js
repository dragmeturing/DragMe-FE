import React, { Component } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import ResultCard from "../components/ResultCard";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor, accentColor } from "../constants/Colors";
import { fetchShows } from "../redux/thunks/fetchShows";
import { connect } from "react-redux";
import { header } from "../components/header";
import { fetchVenues } from "../redux/thunks/fetchVenues";

export class ResultsScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchShows();
    this.props.fetchVenues();
  }

  render() {
    const { shows } = this.props;
    const { container } = mainStyles;
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
  }
});

ResultsScreen.navigationOptions = header;

export const mapStateToProps = state => ({
  shows: state.shows
});

export const mapDispatchToProps = dispatch => ({
  fetchShows: () => dispatch(fetchShows()),
  fetchVenues: () => dispatch(fetchVenues())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsScreen);
