import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";
import { header } from "../components/header";
import { secondaryColor, accentColor } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";


class UserScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { page, button, buttonText } = localStyles;
    return (
      <View style={page}>
        <Text>LOGIN</Text>
        <TouchableOpacity style={button}>
          <Text style={buttonText}>Login With Instagram</Text>
          <Ionicons
            name={'logo-instagram'}
            size={32}
            style={{ marginBottom: -3, marginLeft: 5 }}
            color={"white"}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  page: {
    backgroundColor: secondaryColor,
    flex: 1,
    alignItems: 'center'
  },
  button: {
    backgroundColor: accentColor,
    width: "90%",
    height: 50,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 24
  }
});

const mapStateToProps = state => ({
  // user: state.user
});

UserScreen.navigationOptions = header;

export default connect(mapStateToProps)(UserScreen);
