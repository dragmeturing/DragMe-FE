import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor, accentColor } from "../constants/Colors";
import { header } from "../components/header";
import { connect } from "react-redux";

class PerformerScreen extends Component {
  render() {
    const id = this.props.navigation.getParam("id");
    const targetPerformer = this.props.performers.find(performer => performer.id == id);
    const { container } = mainStyles;
    const { name, photo } = targetPerformer;
    const {
      resultText,
      card,
      header,
      textHolder,
      scroll,
      venueText
    } = localStyles;
    return (
      <ScrollView contentContainerStyle={[container, scroll]}>
        <View style={textHolder}>
          <Text style={[resultText, header]}>{name}</Text>
        </View>
        <Image
          source={{ uri: photo }}
          resizeMode={"contain"}
          style={{ flex: 1 }}
        />
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
  },
  venueText: {
    color: accentColor,
    textDecorationLine: "underline"
  }
});

PerformerScreen.navigationOptions = header;

export const mapStateToProps = state => ({
  performers: state.performers
});

export default connect(mapStateToProps)(PerformerScreen);
