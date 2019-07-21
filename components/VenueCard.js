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

class VenueCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
  }

  componentDidMount() {
    fetchVenueDetails(this.props.data.venue_google_id).then(({ result }) =>
      this.setState({ details: result })
    );
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
    const { venue_name } = this.props.data;
    const { icon, formatted_address } = this.state.details;
    const addressParts = formatted_address ? formatted_address.split(",") : [];
    return (
      <TouchableHighlight
        style={card}
        onPress={() => props.navigation.navigate("Venue", { id, details })}
      >
        <View style={innerCard}>
          <Image source={{ uri: icon }} style={iconStyle} />
          <View style={textHolder}>
            <Text style={[resultText, header]}>{venue_name}</Text>
            <Text style={resultText}>{addressParts[0]}</Text>
            <Text style={resultText}>{addressParts[1] + addressParts[2]}</Text>
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
    fontSize: 32
  },
  card: {
    marginVertical: 3,
    flex: 1,
    backgroundColor: accentColor
  },
  textHolder: {
    height: "100%",
    width: "77%",
    justifyContent: "space-around",
    padding: 5,
    backgroundColor: primaryColor,
  },
  iconStyle: {
    height: 75,
    width: 75,
    margin: 5
  },
  innerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  }
});

export default withNavigation(VenueCard);
