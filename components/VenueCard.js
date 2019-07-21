import React from "react";
import {
  TouchableHighlight,
  Text,
  View,
  ImageBackground,
  StyleSheet
} from "react-native";
import { withNavigation } from "react-navigation";
import { fetchVenueDetails } from "../api/fetchVenueDetails";

class ResultCard extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    fetchVenueDetails()
      .then(details => this.setState({ details }))
  }
  
  render() {
    const { resultText, card, header, textHolder } = localStyles;
    return (
      <TouchableHighlight
        style={card}
        onPress={() => props.navigation.navigate("Venue", { id, details })}
      >
        <View style={textHolder}>
          <Text style={[resultText, header]}>{name}</Text>
          <Text style={[resultText]}>
            {date} - {time}
          </Text>
          <Text style={[resultText]}>{venue_name}</Text>
        </View>
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
