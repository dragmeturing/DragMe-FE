import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor } from "../constants/Colors";
import { header } from "../components/header";
import { connect } from "react-redux";
import { cleanDate, cleanTime } from "../utilities/helper";

class ShowScreen extends Component {
  render() {
    const id = this.props.navigation.getParam("id");
    const targetShow = this.props.shows.find(show => show.id == id);
    const {
      name,
      venue,
      poster_url,
      description,
      date
    } = targetShow.attributes;
    const { venue_name } = venue;
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
  shows: state.shows,
});

export default connect(mapStateToProps)(ShowScreen);
