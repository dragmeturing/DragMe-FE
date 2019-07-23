import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { header } from "../components/header";
import { secondaryColor, primaryColor, accentColor } from "../constants/Colors";
import { logoutUser } from "../redux/actions";
import RCTNetworking from 'RCTNetworking';


class UserScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.user.name) {
      this.props.navigation.navigate("Login");
    }
  }

  componentDidUpdate() {
    if (!this.props.user.name) {
      this.props.navigation.navigate("Login");
    }
  }

  logout = () => {
    RCTNetworking.clearCookies(() => {});
    this.props.logoutUser();
  };

  render() {
    const {
      page,
      iconStyle,
      nameStyle,
      userHolder,
      button,
      buttonText
    } = localStyles;
    const { name, photo } = this.props.user;
    return (
      <View style={page}>
        <View style={userHolder}>
          <Image source={{ uri: photo }} style={iconStyle} />
          <Text style={nameStyle}>{name}</Text>
        </View>
        <TouchableOpacity
          style={button}
          onPress={() => this.props.navigation.navigate("AddShow")}
        >
          <Text style={buttonText}>Add A Show</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={button}
          onPress={this.logout}
        >
          <Text style={buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  page: {
    backgroundColor: secondaryColor,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 100
  },
  iconStyle: {
    height: 120,
    width: 120,
    margin: 20,
    borderRadius: 60
  },
  nameStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 26
  },
  userHolder: {
    flexDirection: "row",
    backgroundColor: primaryColor,
    alignItems: "center",
    justifyContent: "center",
    width: "90%"
  },
  button: {
    backgroundColor: accentColor,
    width: "90%",
    height: 50,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 24
  }
});

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

UserScreen.navigationOptions = header;

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);


 
  