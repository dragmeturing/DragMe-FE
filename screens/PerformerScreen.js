import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Linking
} from "react-native";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor, accentColor } from "../constants/Colors";
import { header } from "../components/header";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { fetchPerformerDetails } from "../api/fetchPerformerDetails";
import ResultCard from "../components/ResultCard";

class PerformerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: []
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam("id");
    fetchPerformerDetails(id)
      .then(shows => this.setState({ shows }))
  }

  render() {
    const id = this.props.navigation.getParam("id");
    const targetPerformer = this.props.performers.find(
      performer => performer.id == id
    );
    const { container } = mainStyles;
    const {
      name,
      photo,
      bio,
      insta_url,
      twitter_url,
      facebook_url
    } = targetPerformer;
    const {
      resultText,
      header,
      scroll,
      socialHolder,
      iconStyle,
      descriptionHolder
    } = localStyles;

    const showCards = this.state.shows.map(show => (
      <ResultCard key={show.id} data={{attributes: show}} venues={this.props.venues}/>
    ));
    return (
      <ScrollView contentContainerStyle={[container, scroll]}>
        <Text style={[resultText, header]}>{name}</Text>
        <View style={socialHolder}>
          {insta_url && (
            <Ionicons
              name={"logo-instagram"}
              size={32}
              color={accentColor}
              style={iconStyle}
              onPress={() => Linking.openURL(insta_url)}
            />
          )}
          {twitter_url && (
            <Ionicons
              name={"logo-twitter"}
              size={32}
              color={accentColor}
              style={iconStyle}
              onPress={() => Linking.openURL(twitter_url)}
            />
          )}
          {facebook_url && (
            <Ionicons
              name={"logo-facebook"}
              size={32}
              color={accentColor}
              style={iconStyle}
              onPress={() => Linking.openURL(facebook_url)}
            />
          )}
        </View>
        <Image
          source={{ uri: photo }}
          resizeMode={"contain"}
          style={{ flex: 1, width: '100%' }}
        />
        <View style={descriptionHolder}>
          <Text style={[resultText]}>{bio}</Text>
        </View>
        <Text style={[resultText, header]}>Shows</Text>
        {showCards}
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  scroll: {
    flex: 0,
    height: "150%",
    paddingVertical: 30,
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
  textHolder: {
    display: "flex",
    height: 250,
    justifyContent: "space-around",
    padding: 10
  },
  venueText: {
    color: accentColor,
    textDecorationLine: "underline"
  },
  socialHolder: {
    flexDirection: "row",
    justifyContent: "center"
  },
  iconStyle: {
    margin: 30
  },
  descriptionHolder: {
    backgroundColor: primaryColor,
    width: "90%",
    marginVertical: 10,
    padding: 10
  }
});

PerformerScreen.navigationOptions = header;

export const mapStateToProps = state => ({
  performers: state.performers,
  venues: state.venues
});

export default connect(mapStateToProps)(PerformerScreen);
