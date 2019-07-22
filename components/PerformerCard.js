import React, { Component } from "react";
import {
  TouchableHighlight,
  Text,
  View,
  Image,
  StyleSheet
} from "react-native";
import { withNavigation } from "react-navigation";
import { fetchVenueDetails } from "../api/fetchVenueDetails";
import { primaryColor, secondaryColor, accentColor } from "../constants/Colors";

class PerformerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
  }

  render() {
    const {
      resultText,
      card,
      header,
      textHolder,
      iconStyle,
      innerCard
    } = localStyles;
    const { name, id, photo } = this.props.data;
    return (
      <TouchableHighlight
        style={card}
        // onPress={() =>
        //   this.props.navigation.navigate("Venue", { id })
        // }
      >
        <View style={innerCard}>
          <Image source={{ uri: photo }} style={iconStyle} />
          <View style={textHolder}>
            <Text style={[resultText, header]}>{name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const localStyles = StyleSheet.create({
  resultText: {
    color: "white",
    textAlign: "center",
    fontSize: 18
  },
  header: {
    fontSize: 24
  },
  card: {
    marginVertical: 3,
    height: 255,
    width: '45%',
    backgroundColor: accentColor
  },
  textHolder: {
    height: 80,
    width: 150,
    justifyContent: "space-around",
    backgroundColor: primaryColor
  },
  iconStyle: {
    height: 150,
    width: 150,
    margin: 5
  },
  innerCard: {
    alignItems: "center",
    padding: 5
  }
});

export default withNavigation(PerformerCard);
