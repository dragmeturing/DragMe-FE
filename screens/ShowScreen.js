import React, { Component } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { shows } from "../mockData";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor } from "../constants/Colors";
import { header } from "../components/header";

export default class ShowScreen extends Component {
  render() {
    const props = {
      data: shows[0]
    }
    const { id, name, venue_name } = props.data;
    const { container } = mainStyles;
    return <ScrollView contentContainerStyle={container}>
      <Text>{name}</Text>

    </ScrollView>;
  }
}

ShowScreen.navigationOptions = header;
