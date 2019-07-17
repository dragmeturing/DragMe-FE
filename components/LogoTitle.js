import React from "react";
import { Image } from "react-native";

export class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/images/dragme_logo.png')}
        style={{ width: 200, height: 75 }}
      />
    );
  }
}
