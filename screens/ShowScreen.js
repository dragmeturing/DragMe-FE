import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { shows } from "../mockData";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor } from "../constants/Colors";
import { header } from "../components/header";
import { cleanDate, cleanTime } from "../components/helper";
import { connect } from "react-redux";

class ShowScreen extends Component {
  render() {
    const id = this.props.navigation.getParam("id");
    const {
      name,
      venue_name,
      poster_url,
      description,
      date
    } = this.props.shows.find(show => show.id === id);
    const { container } = mainStyles;
    const { resultText, card, header, textHolder, scroll } = localStyles;
    const dateToRender = cleanDate(date);
    const time = cleanTime(date);
    return (
      <ScrollView contentContainerStyle={[container, scroll]}>
        <View style={textHolder}>
          <Text style={[resultText, header]}>{name}</Text>
          <Text style={[resultText]}>
            {dateToRender} - {time}
          </Text>
          <Text style={[resultText]}>{venue_name}</Text>
        </View>
        <Image
          source={{ uri: poster_url }}
          resizeMode={"contain"}
          style={{ flex: 1 }}
        />
        <Text style={[resultText]}>{description}</Text>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: "150%"
  },
  resultText: {
    color: "white",
    textAlign: "center",
    fontSize: 24
  },
  header: {
    fontSize: 40
  },
  card: {
    marginVertical: 3,
    height: 150
  },
  textHolder: {
    display: "flex",
    height: 250,
    justifyContent: "space-around",
    padding: 10
  }
});

ShowScreen.navigationOptions = header;

export const mapStateToProps = state => ({
  shows: state.shows
});

export default connect(mapStateToProps)(ShowScreen);
