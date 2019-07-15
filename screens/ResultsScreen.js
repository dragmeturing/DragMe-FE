import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { shows } from "../mockData";
import ResultCard from "../components/ResultCard";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor } from "../constants/Colors";

export default class ResultsScreen extends Component {
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
