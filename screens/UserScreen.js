import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { header } from "../components/header";
import { secondaryColor } from "../constants/Colors";

class UserScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.user.name) {
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    const { page } = localStyles;
    return (
      <View style={page}>
        <Text>USER</Text>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  page: {
    backgroundColor: secondaryColor,
    flex: 1
  }
});

const mapStateToProps = state => ({
  user: state.user
});

UserScreen.navigationOptions = header;

export default connect(mapStateToProps)(UserScreen);
