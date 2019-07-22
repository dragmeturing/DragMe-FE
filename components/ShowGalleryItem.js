import React from "react";
import {
  TouchableHighlight,
  Text,
  View,
  Image,
  StyleSheet
} from "react-native";
import { withNavigation } from "react-navigation";
import { accentColor } from "../constants/Colors";

const ShowGalleryItem = props => {
  const { id, name, poster_url } = props.data;
  const { resultText, card, header, poster, innerCard } = localStyles;
  return (
    <TouchableHighlight
      style={card}
      onPress={() => props.navigation.navigate("Show", { id })}
    >
      <View style={innerCard}>
        <Image source={{ uri: poster_url }} style={poster}/>
        <Text style={[resultText, header]}>{name}</Text>
      </View>
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
    backgroundColor: accentColor,
    padding: 10,
    width: '80%'
  },
  poster: {
    width: 250,
    height: 250,
    resizeMode: "contain"
  },
  innerCard: {
    alignItems: "center"
  }
});

export default withNavigation(ShowGalleryItem);
