import React, { Component } from "react";
import {
  TouchableHighlight,
  Text,
  View,
  ImageBackground,
  StyleSheet
} from "react-native";
import { cleanDate, cleanTime } from "../utilities/helper";
import { withNavigation } from "react-navigation";

class ResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: {}
    };
  }

  componentDidMount() {
    if (!this.props.data.attributes.venue) {
      const id = this.props.data.attributes.venue_id;
      const targetVenue = this.props.venues.find(venue => venue.id == id);
      this.setState({ venue: targetVenue});
    }
  }

  render() {
    const { attributes } = this.props.data;
    const id = this.props.data.id || attributes.id
    const { name, poster_url } = attributes;
    const venue = attributes.venue || this.state.venue
    const { venue_name } = venue;
    const { resultText, card, header, textHolder } = localStyles;
    const date = cleanDate(attributes.date);
    const time = cleanTime(attributes.date);
    return (
      <TouchableHighlight
        style={card}
        onPress={() => this.props.navigation.navigate("Show", { id })}
      >
        <ImageBackground
          source={{ uri: poster_url }}
          style={{ width: "100%", height: "100%" }}
          imageStyle={{ opacity: 0.7 }}
          blurRadius={7}
        >
          <View style={textHolder}>
            <Text style={[resultText, header]}>{name}</Text>
            <Text style={[resultText]}>
              {date} at {time}
            </Text>
            <Text style={[resultText]}>{venue_name}</Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
  }
}

const localStyles = StyleSheet.create({
  resultText: {
    color: "white",
    textAlign: "center",
    fontSize: 24
  },
  header: {
    fontSize: 32
  },
  card: {
    marginVertical: 3,
    height: 150,
    backgroundColor: "black"
  },
  textHolder: {
    display: "flex",
    height: "100%",
    justifyContent: "space-around",
    padding: 10
  }
});

export default withNavigation(ResultCard);
