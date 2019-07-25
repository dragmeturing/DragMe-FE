import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor, accentColor } from "../constants/Colors";
import { header } from "../components/header";
import { connect } from "react-redux";
import { cleanDate, cleanTime } from "../utilities/helper";
import PerformerCard from "../components/PerformerCard";
import { fetchShowDetails } from "../api/fetchShowDetails";

class ShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      performers: []
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam("id");
    fetchShowDetails(id).then(performers => {
      this.setState({ performers });
    });
  }

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
    const { venue_name, venue_google_id } = venue;
    const { container } = mainStyles;
    const {
      resultText,
      card,
      header,
      textHolder,
      scroll,
      venueText,
      performerHolder,
      descriptionHolder
    } = localStyles;
    const dateToRender = cleanDate(date);
    const time = cleanTime(date);
    const performerCards = this.state.performers.map(performer => (
      <PerformerCard key={performer.id} data={performer} />
    ));
    return (
      <ScrollView contentContainerStyle={[container, scroll]}>
        <View style={textHolder}>
          <Text style={[resultText, header]}>{name}</Text>
          <Text style={[resultText]}>
            {dateToRender} at {time}
          </Text>
          <Text
            style={[resultText, venueText]}
            onPress={() =>
              this.props.navigation.navigate("Venue", {
                id: venue.id,
                venue_google_id
              })
            }
          >
            {venue_name}
          </Text>
        </View>
        <Image
          source={{ uri: poster_url }}
          resizeMode={"contain"}
          style={{ flex: 1, width: '100%' }}
        />
        <View style={descriptionHolder}>
          <Text style={[resultText]}>{description}</Text>
        </View>
        <Text style={[resultText, header]}>Performers</Text>
        <View style={performerHolder}>{performerCards}</View>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: "150%",
    alignItems: 'center'
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
  },
  venueText: {
    fontSize: 30,
    color: accentColor,
    textDecorationLine: "underline"
  },
  performerHolder: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10
  },
  descriptionHolder: {
    backgroundColor: primaryColor,
    width: '90%',
    marginVertical: 10,
    padding: 10
  }
});

ShowScreen.navigationOptions = header;

export const mapStateToProps = state => ({
  shows: state.shows
});

export default connect(mapStateToProps)(ShowScreen);
