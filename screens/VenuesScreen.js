import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator, Text
} from "react-native";
import { connect } from "react-redux";
import { secondaryColor, accentColor } from "../constants/Colors";
import { header } from "../components/header";
import { fetchVenues } from "../redux/thunks/fetchVenues";
import VenueCard from "../components/VenueCard";

class VenuesScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    if (!this.props.venues.length) {
      this.props.fetchVenues();
    }
  }
  
  render() {
    const { venues } = this.props;
    const { scroll } = localStyles;
    const results = venues.length ? (
      venues.map(venue => <VenueCard key={venue.id} data={venue}/>)
    ) : (
      <ActivityIndicator size="large" color={accentColor} />
    );

    return <ScrollView contentContainerStyle={scroll}>{results}</ScrollView>;
  }
}

VenuesScreen.navigationOptions = header;

const localStyles = StyleSheet.create({
  scroll: {
    backgroundColor: secondaryColor
  }
});

export const mapStateToProps = state => ({
  venues: state.venues
});

export const mapDispatchToProps = dispatch => ({
  fetchVenues: () => dispatch(fetchVenues())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenuesScreen);
