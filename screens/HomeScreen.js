import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  DatePickerIOS
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { secondaryColor } from '../constants/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>HOME</Text>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: secondaryColor,
  }
});
