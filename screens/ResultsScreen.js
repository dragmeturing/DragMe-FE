import React, { Component } from "react";
import { ScrollView, StyleSheet, ActivityIndicator, View, TextInput, Text, TouchableOpacity } from "react-native";
import ResultCard from "../components/ResultCard";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor, accentColor, secondaryColor } from "../constants/Colors";
import { fetchShows } from "../redux/thunks/fetchShows";
import { connect } from "react-redux";
import { header } from "../components/header";
import { fetchVenues } from "../redux/thunks/fetchVenues";
import { Ionicons } from "@expo/vector-icons";
import { fetchPerformers } from "../redux/thunks/fetchPerformers";

export class ResultsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      input: '',
      filteredShows: [] 
    };
  }

  componentDidMount() {
    this.props.fetchShows();
    this.props.fetchVenues();
    this.props.fetchPerformers();
  }

  handleTextChange = (text) => {
    this.setState({input: text})
    this.filterResults(text)
  }

  filterResults = (search) => {
    const { shows } = this.props;
    const filteredResults = shows.filter(show => {
      return show.attributes.name.includes(search) || show.attributes.venue.venue_name.includes(search)
    })
    this.setState({filteredShows: filteredResults})
  }

  clearInput = () => {
    this.setState({input: ''})
  }

  render() {
    const { shows } = this.props
    const { filteredShows } = this.state
    const showsToDisplay = filteredShows.length ? filteredShows : shows
    const { scroll, textInput, inputArea, iconStyle } = localStyles;

    const results = showsToDisplay.length ? (
      showsToDisplay.map(show => <ResultCard key={show.id} data={show} />)
    ) : (
      <ActivityIndicator size="large" color={accentColor} />
    );

    return (
      <View>
        <View style={inputArea}>
          <TextInput 
            onChangeText={text => this.handleTextChange(text)}
            style={textInput}
            value={this.state.input} 
            placeholder="Search Here"
          />
          <TouchableOpacity onPress={this.clearInput}>
            <Ionicons
              name={"ios-close-circle-outline"}
              size={30}
              color={primaryColor}
              style={iconStyle}
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={scroll}>{results}</ScrollView>
      </View>
    )
  }
}

const localStyles = StyleSheet.create({
  scroll: {
    backgroundColor: "white"
  },
  textInput: {
    width: "80%",
    height: 50,
    margin: 0,
    padding: 0,
    backgroundColor: "white",
    fontSize: 24,
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "space-between"
  },
  iconStyle: {
    margin: 0,
    padding: 0
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
