import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor, accentColor, secondaryColor } from "../constants/Colors";
import { header } from "../components/header";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { fetchVenueShows } from "../api/fetchVenueShows";
import ShowGalleryItem from "../components/ShowGalleryItem";

class VenueScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewHours: false,
      shows: []
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam("id");
    fetchVenueShows(id)
      .then(result => this.setState({ shows: result.shows}))
  }
  

  render() {
    const id = this.props.navigation.getParam("id");
    const details = this.props.navigation.getParam("details");
    const targetVenue = this.props.venues.find(venue => venue.id == id);
    const { venue_name } = targetVenue;
    const { viewHours, shows } = this.state;
    const {
      geometry,
      formatted_address,
      opening_hours,
      formatted_phone_number,
      website
    } = details;
    const addressParts = formatted_address.split(",");
    const { container } = mainStyles;
    const {
      resultText,
      card,
      header,
      textHolder,
      scroll,
      detailsHolder,
      hoursTextStyle,
      button,
      buttonText,
      hoursContainerStyle,
      hoursTextHolder,
      linkText,
      linkHolder,
      iconStyle
    } = localStyles;

    const showCards = shows.map(show => <ShowGalleryItem key={show.id} data={show}/>)

    const hoursText = opening_hours
      ? opening_hours.weekday_text.map((string, i) => (
          <Text style={hoursTextStyle} key={i}>
            {string}
          </Text>
        ))
      : null;

    const hoursContainer = opening_hours ? (
      <View style={hoursContainerStyle}>
        <TouchableOpacity
          onPress={() => this.setState({ viewHours: !viewHours })}
          style={button}
        >
          <Text style={buttonText}>Hours {viewHours ? "-" : "+"}</Text>
        </TouchableOpacity>
        {viewHours && <View style={hoursTextHolder}>{hoursText}</View>}
      </View>
    ) : null;
    return (
      <ScrollView contentContainerStyle={scroll}>
        <Text style={[resultText, header]}>{venue_name}</Text>
        <MapView
          style={{ height: 300, width: "90%" }}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: +geometry.location.lat,
            longitude: +geometry.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          <Marker
            coordinate={{
              latitude: +geometry.location.lat,
              longitude: +geometry.location.lng
            }}
          />
        </MapView>
        <View style={detailsHolder}>
          <Text style={resultText}>{addressParts[0]}</Text>
          <Text style={resultText}>{`${addressParts[1]}, ${
            addressParts[2]
          }`}</Text>
          <View style={linkHolder}>
            <Ionicons
              name={"ios-globe"}
              size={24}
              color={accentColor}
              style={iconStyle}
            />
            <Text style={linkText} onPress={() => Linking.openURL(website)}>
              Website
            </Text>
            <Ionicons
              name={"ios-call"}
              size={24}
              color={accentColor}
              style={iconStyle}
            />
            <Text
              style={linkText}
              onPress={() => Linking.openURL(`tel:${formatted_phone_number}`)}
            >
              {formatted_phone_number}
            </Text>
          </View>
          {hoursContainer}
        </View>
        <View>
          {showCards}
        </View>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  scroll: {
    backgroundColor: secondaryColor,
    alignItems: 'center',
    justifyContent: 'space-around',
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
  detailsHolder: {
    backgroundColor: primaryColor,
    width: "90%"
  },
  hoursTextStyle: {
    color: "white",
    textAlign: "left",
    fontSize: 18
  },
  button: {
    backgroundColor: accentColor,
    width: "50%",
    height: 30,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    marginBottom: 20
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20
  },
  hoursContainerStyle: {
    alignItems: "center"
  },
  hoursTextHolder: {
    width: "80%"
  },
  linkText: {
    color: accentColor,
    fontSize: 22
  },
  linkHolder: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
    paddingLeft: 10
  },
  iconStyle: {
    marginLeft: 15,
    marginRight: 3
  }
});

VenueScreen.navigationOptions = header;

export const mapStateToProps = state => ({
  venues: state.venues
});

export default connect(mapStateToProps)(VenueScreen);
