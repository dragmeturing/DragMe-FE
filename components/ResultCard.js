import React from 'react';
import { TouchableHighlight, Text, View, ImageBackground, StyleSheet } from 'react-native';
import { cleanDate, cleanTime } from './helper';

export default function ResultCard(props) {
  const { id, name, venue_name, poster_url } = props.data;
  const { resultText, card, header, textHolder } = localStyles;
  const date = cleanDate(props.data.date);
  const time = cleanTime(props.data.date);
  return (
    <TouchableHighlight
      style={card}
      onPress={() => props.navigate("Show", { id })}
    >
      <ImageBackground
        source={{ uri: poster_url }}
        style={{ width: "100%", height: "100%", opacity: 0.9 }}
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
    color: 'white',
    textAlign: 'center',
    fontSize: 24
  },
  header: {
    fontSize: 40
  },
  card: {
    marginVertical: 3,
    height: 150,
  },
  textHolder: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-around',
    padding: 10
  }
});
  
