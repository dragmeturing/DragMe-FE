import React from 'react';
import { TouchableHighlight, Text, View, ImageBackground, StyleSheet } from 'react-native';
import { cleanDate, cleanTime } from './helper';
import { withNavigation } from "react-navigation";

const ResultCard = (props) => {
  const { id, name, venue_name, poster_url } = props.data;
  const { resultText, card, header, textHolder } = localStyles;
  const date = cleanDate(props.data.date);
  const time = cleanTime(props.data.date);
  return (
    <TouchableHighlight
      style={card}
      onPress={() => props.navigation.navigate("Show", { id })}
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
            {date} - {time}
          </Text>
          <Text style={[resultText]}>{venue_name}</Text>
        </View>
      </ImageBackground>
    </TouchableHighlight>
  );
};

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