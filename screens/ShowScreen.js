import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { shows } from "../mockData";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor } from "../constants/Colors";
import { header } from "../components/header";
import { cleanDate, cleanTime } from "../components/helper";

export default class ShowScreen extends Component {
  render() {
    const props = {
      data: shows[0]
    };
    const { id, name, venue_name, poster_url, description } = props.data;
    const { container } = mainStyles;
    const { resultText, card, header, textHolder, scroll } = localStyles;
    const date = cleanDate(props.data.date);
    const time = cleanTime(props.data.date);
    return (
      <ScrollView contentContainerStyle={[container, scroll]}>
        <View style={textHolder}>
          <Text style={[resultText, header]}>{name}</Text>
          <Text style={[resultText]}>
            {date} - {time}
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
    height: '100%'
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
    height: 180,
    justifyContent: "space-around",
    padding: 10
  }
});

ShowScreen.navigationOptions = header;
