import React, { Component } from "react";
import { ScrollView, StyleSheet, ActivityIndicator, View, TextInput } from "react-native";
import ResultCard from "../components/ResultCard";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor, accentColor, secondaryColor } from "../constants/Colors";
import { fetchShows } from "../redux/thunks/fetchShows";
import { connect } from "react-redux";
import { header } from "../components/header";
import { fetchVenues } from "../redux/thunks/fetchVenues";

export class ResultsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  componentDidMount() {
    this.props.fetchShows();
    this.props.fetchVenues();
  }

  handleTextChange = (text) => {
    this.setState({input: text})
    this.filterResults(text)
  }

  handleSubmit = () => {
    this.setState({input: ''})
  }

  filterResults = (search) => {
    console.log(search)
  }

  render() {
    const { shows } = this.props;
    const { scroll, textInput } = localStyles;
    const results = shows.length ? (
      shows.map(show => <ResultCard key={show.id} data={show} />)
    ) : (
      <ActivityIndicator size="large" color={accentColor} />
    );

    return (
      <View>
        <TextInput 
          onChangeText={text => this.handleTextChange(text)}
          onSubmitEditing={() => this.handleSubmit()}
          style={textInput}
          value={this.state.input} 
          placeholder="Search Here"
        />
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
    width: "90%",
    height: 50,
    margin: 10,
    backgroundColor: "white",
    fontSize: 24,
    padding: 8
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
