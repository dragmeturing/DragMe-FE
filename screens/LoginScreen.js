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
import InstagramLogin from "react-native-instagram-login";
import { instagramClientID } from "../utilities/secrets";
import { fetchLogin } from "../redux/thunks/fetchLogin";

class UserScreen extends Component {
  constructor(props) {
    super(props);
  }

  handleInstaLogin = token => {
    this.props.fetchLogin(token, this.props.navigation.navigate);
  };

  render() {
    const { page, button, buttonText } = localStyles;
    return (
      <View style={page}>
        <TouchableOpacity
          style={button}
          onPress={() => this.instagramLogin.show()}
        >
          <Text style={buttonText}>Login With Instagram</Text>
          <Ionicons
            name={"logo-instagram"}
            size={32}
            style={{ marginBottom: -3, marginLeft: 5 }}
            color={"white"}
          />
        </TouchableOpacity>
        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          clientId={instagramClientID}
          redirectUrl="http://dragme.us-east-2.elasticbeanstalk.com/auth/instagram/callback"
          onLoginSuccess={token => this.handleInstaLogin(token)}
          onLoginFailure={data => console.log(data)}
        />
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  page: {
    backgroundColor: secondaryColor,
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
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

export const mapDispatchToProps = dispatch => ({
  fetchLogin: (token, navigate) => dispatch(fetchLogin(token, navigate))
});

UserScreen.navigationOptions = header;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScreen);
