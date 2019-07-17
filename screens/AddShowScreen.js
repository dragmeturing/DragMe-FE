import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  DatePickerIOS,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback
} from "react-native";
import { mainStyles } from "../constants/mainStyles";
import { primaryColor, accentColor, secondaryColor } from "../constants/Colors";
import { header } from "../components/header";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { postPhoto } from "../api/postPhoto";
import { postShow } from "../api/postShow";
import { cleanTimeJS } from "../components/helper";

export default class AddShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      venue: "",
      date: new Date(),
      description: "",
      posterUrl: "",
      eventUrl: "",
      showDatePicker: false,
      displayDate: "Date",
      photo: null,
      isUploading: false
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert(
        "Sorry, we need camera roll permissions to allow show poster uploading."
      );
    }
  };

  handleTextChange = (text, key) => {
    this.setState({
      [key]: text
    });
  };

  displayDatePicker = bool => {
    this.setState({ showDatePicker: bool });
  };

  handleChangeDate = date => {
    let displayDate = `${this.state.date.toDateString()} ${cleanTimeJS(
      this.state.date
    )}`;
    this.setState({ date, displayDate });
  };

  handleUploadImage = async () => {
    this.setState({ isUploading: true });
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true
    });

    if (!result.cancelled) {
      postPhoto(result.uri)
        .then(result =>
          this.setState({
            posterUrl: result.photoUrl,
            isUploading: false
          })
        )
        .catch(error => console.log("error", error));
      this.setState({ photo: result.uri, isUploading: false });
    }
  };

  handleSubmit = () => {
    const { name, venue, description, date, posterUrl, eventUrl } = this.state;
    const show = {
      name,
      description,
      event_url: eventUrl,
      date,
      poster_url: posterUrl,
      venue_name: venue,
      venue_google_id: 666666666
    };
    postShow(show).then(result => console.log(result));
  };

  render() {
    const {
      textInput,
      scroll,
      dateStyle,
      button,
      datePlaceholder,
      buttonText,
      datePickerStyle
    } = localStyles;
    const { photo, isUploading } = this.state;
    const datePicker = (
      <TouchableWithoutFeedback>
        <DatePickerIOS
          style={datePickerStyle}
          date={this.state.date}
          onDateChange={this.handleChangeDate}
        />
      </TouchableWithoutFeedback>
    );
    const dateDisplay = (
      <TouchableHighlight
        style={datePlaceholder}
        onPress={() => this.displayDatePicker(true)}
      >
        <Text style={dateStyle}>{this.state.displayDate}</Text>
      </TouchableHighlight>
    );
    return (
      <ScrollView
        contentContainerStyle={scroll}
        overScrollMode="never"
        bounces={false}
      >
        <TextInput
          style={textInput}
          onChangeText={text => this.handleTextChange(text, "name")}
          onFocus={() => this.displayDatePicker(false)}
          value={this.state.name}
          placeholder="Show Title"
        />
        <TextInput
          style={textInput}
          onChangeText={text => this.handleTextChange(text, "venue")}
          onFocus={() => this.displayDatePicker(false)}
          value={this.state.venue}
          placeholder="Venue"
        />
        {this.state.showDatePicker ? datePicker : dateDisplay}
        <TextInput
          style={textInput}
          onChangeText={text => this.handleTextChange(text, "description")}
          onFocus={() => this.displayDatePicker(false)}
          value={this.state.description}
          placeholder="Description"
        />
        <TextInput
          style={textInput}
          onChangeText={text => this.handleTextChange(text, "eventUrl")}
          onFocus={() => this.displayDatePicker(false)}
          value={this.state.eventURL}
          placeholder="Event Website/Link"
        />
        {photo && (
          <Image
            source={{ uri: photo }}
            resizeMode={"contain"}
            style={{ flex: 1 }}
          />
        )}
        {isUploading && (
          <ActivityIndicator size="large" color={accentColor} />
        )}
        <TouchableOpacity
          style={button}
          onPress={this.handleUploadImage}
          onFocus={() => this.displayDatePicker(false)}
        >
          <Text style={buttonText}>Choose Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={button} onPress={this.handleSubmit}>
          <Text style={buttonText}>Add Show</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  scroll: {
    height: "150%",
    alignItems: "center",
    backgroundColor: secondaryColor
  },
  textInput: {
    width: "80%",
    height: 50,
    margin: 10,
    backgroundColor: "white",
    fontSize: 24,
    padding: 8
  },
  datePlaceholder: {
    width: "80%",
    height: 50,
    margin: 10,
    backgroundColor: "white",
    padding: 8
  },
  datePickerStyle: {
    backgroundColor: "white"
  },
  dateStyle: {
    color: "#cccccc",
    fontSize: 24
  },
  button: {
    backgroundColor: accentColor,
    width: "80%",
    height: 50,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 24
  }
});

AddShowScreen.navigationOptions = header;
