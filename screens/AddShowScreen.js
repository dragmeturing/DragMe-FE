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
  ActivityIndicator
} from "react-native";
import { primaryColor, accentColor, secondaryColor } from "../constants/Colors";
import { header } from "../components/header";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { postPhoto } from "../api/postPhoto";
import { postShow } from "../api/postShow";
import { cleanTimeJS } from "../utilities/helper";
import { fetchVenueData } from "../api/fetchVenueData";
import { connect } from "react-redux";
import { fetchVenues } from "../redux/thunks/fetchVenues";
import { postVenue } from "../api/postVenue";
import { addShow } from "../redux/actions";

class AddShowScreen extends Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
    this.state = {
      name: "",
      venueInput: "",
      date: new Date(),
      description: "",
      posterUrl: "",
      eventUrl: "",
      showDatePicker: false,
      displayDate: "Date",
      photo: null,
      isUploading: false,
      venueResults: [],
      performerResults: [],
      performer_ids: [],
      performer_names: [],
      dateInputStyle: {}
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
    this.setState({ date, displayDate, dateInputStyle: { color: "black" } });
  };

  handleUploadImage = async () => {
    this.setState({ isUploading: true });
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true
    });
    if (!result.cancelled) {
      postPhoto(result.uri)
        .then(result => {
          this.setState({
            photo: result.photoUrl,
            isUploading: false
          });
        })
        .catch(error => console.log("error", error));
    }
  };

  findVenue = text => {
    this.setState({ venueInput: text });
    fetchVenueData(text, this.props.venues)
      .then(venueResults => {
        this.setState({ venueResults });
      })
      .catch(error => console.log("google error", error));
  };

  findPerformers = text => {
    this.setState({ performerInput: text });
    const performerResults = this.props.performers.filter(performer =>
      performer.name.includes(text)
    );
    this.setState({ performerResults });
  };

  selectVenue = async result => {
    let selectedVenue = result;
    if (!result.id) {
      selectedVenue = await postVenue(result);
    }
    const { venue_name, id } = selectedVenue;
    this.setState({
      venueInput: venue_name,
      venueResults: [],
      venue_id: id
    });
  };

  selectPerformer = result => {
    const dataToSubit = result.id || result.name;
    this.setState({
      performerInput: "",
      performerResults: [],
      performer_names: [...this.state.performer_names, result.name],
      performer_ids: [...this.state.performer_ids, dataToSubit]
    });
  };

  handleSubmit = () => {
    const {
      name,
      description,
      date,
      photo,
      eventUrl,
      venue_id,
      performer_ids
    } = this.state;
    const show = {
      name,
      description,
      event_url: eventUrl,
      date,
      poster_url: photo,
      venue_id,
      performers: performer_ids
    };
    console.log("show", show);
    postShow(show).then(result => this.handleNewShow(result.data));
  };

  handleNewShow = show => {
    this.props.addShow(show);
    this.props.navigation.navigate("Show", { id: show.id });
  };

  render() {
    const {
      textInput,
      scroll,
      dateStyle,
      button,
      datePlaceholder,
      buttonText,
      datePickerStyle,
      resultsHolder,
      venueResult,
      resultText,
      searchHolder,
      performerNamesHolder,
      pleaseText,
      performerText
    } = localStyles;
    const {
      photo,
      isUploading,
      venueResults,
      dateInputStyle,
      performerResults
    } = this.state;
    const datePicker = (
      <View style={datePickerStyle}>
        <DatePickerIOS
          minuteInterval={5}
          date={this.state.date}
          onDateChange={this.handleChangeDate}
        />
      </View>
    );
    const dateDisplay = (
      <TouchableHighlight
        style={datePlaceholder}
        onPress={() => this.displayDatePicker(true)}
      >
        <Text style={[dateStyle, dateInputStyle]}>
          {this.state.displayDate}
        </Text>
      </TouchableHighlight>
    );
    const venueSuggestions = venueResults.slice(0, 4).map(result => (
      <TouchableOpacity
        key={result.id || result.venue_google_id}
        style={venueResult}
        onPress={() => this.selectVenue(result)}
      >
        <Text style={resultText}>
          {result.venue_description || result.venue_name}
        </Text>
      </TouchableOpacity>
    ));

    const performerSuggestions = performerResults.slice(0, 4).map(result => (
      <TouchableOpacity
        key={result.id}
        style={venueResult}
        onPress={() => this.selectPerformer(result)}
      >
        <Text style={resultText}>{result.name}</Text>
      </TouchableOpacity>
    ));

    const performerNames = this.state.performer_names.map((name, i) => (
      <Text key={i} style={performerText}>
        {name}
      </Text>
    ));

    return (
      <ScrollView
        contentContainerStyle={scroll}
        overScrollMode="never"
        bounces={false}
        ref={this.scrollRef}
      >
        <TextInput
          style={textInput}
          onChangeText={text => this.handleTextChange(text, "name")}
          onFocus={() => this.displayDatePicker(false)}
          value={this.state.name}
          placeholder="Show Title"
        />
        <View style={searchHolder}>
          <TextInput
            style={textInput}
            onChangeText={text => this.findVenue(text)}
            onFocus={() => this.displayDatePicker(false)}
            value={this.state.venueInput}
            placeholder="Venue"
          />
          <View style={resultsHolder}>{venueSuggestions}</View>
        </View>
        {this.state.showDatePicker ? datePicker : dateDisplay}
        <View style={[searchHolder, { zIndex: 9 }]}>
          <TextInput
            style={textInput}
            onChangeText={text => this.findPerformers(text)}
            onFocus={() => this.displayDatePicker(false)}
            value={this.state.performerInput}
            placeholder="Performer Name"
          />
          <View style={resultsHolder}>{performerSuggestions}</View>
        </View>
        <View style={performerNamesHolder}>
          <ScrollView>
            {performerNames.length ? (
              performerNames
            ) : (
              <Text style={pleaseText}>Please add a performer</Text>
            )}
          </ScrollView>
        </View>
        <TextInput
          style={textInput}
          onChangeText={text => this.handleTextChange(text, "description")}
          onFocus={() => {
            this.scrollRef.current.scrollTo({
              x: 0,
              y: 300,
              animated: true
            });
            this.displayDatePicker(false);
          }}
          value={this.state.description}
          placeholder="Description"
        />
        <TextInput
          style={textInput}
          onChangeText={text => this.handleTextChange(text, "eventUrl")}
          onFocus={() => {
            this.scrollRef.current.scrollTo({
              x: 0,
              y: 300,
              animated: true
            });
            this.displayDatePicker(false);
          }}
          value={this.state.eventURL}
          placeholder="Event Website/Link"
        />
        {photo && (
          <Image
            source={{ uri: photo }}
            resizeMode={"contain"}
            style={{ flex: 1, width: "90%" }}
          />
        )}
        {isUploading && <ActivityIndicator size="large" color={accentColor} />}
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
    width: "90%",
    height: 50,
    margin: 10,
    backgroundColor: "white",
    fontSize: 24,
    padding: 8
  },
  datePlaceholder: {
    width: "90%",
    height: 50,
    margin: 10,
    backgroundColor: "white",
    padding: 8
  },
  datePickerStyle: {
    backgroundColor: "white",
    width: "90%",
    padding: 5
  },
  dateStyle: {
    color: "#cccccc",
    fontSize: 24
  },
  button: {
    backgroundColor: accentColor,
    width: "90%",
    height: 50,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    marginBottom: 20
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 24
  },
  resultsHolder: {
    alignItems: "center",
    position: "absolute",
    width: "100%",
    top: 59
  },
  venueResult: {
    width: "90%",
    backgroundColor: accentColor,
    padding: 15,
    borderColor: "white"
  },
  resultText: {
    fontSize: 20,
    color: "white"
  },
  searchHolder: {
    width: "100%",
    alignItems: "center",
    zIndex: 10
  },
  performerNamesHolder: {
    backgroundColor: primaryColor,
    width: "90%",
    height: 150,
    overflow: "scroll",
    paddingHorizontal: 15
  },
  pleaseText: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 10,
    color: "white"
  },
  performerText: {
    margin: 10,
    fontSize: 25,
    color: "white"
  }
});

AddShowScreen.navigationOptions = header;

export const mapStateToProps = state => ({
  venues: state.venues,
  performers: state.performers
});

export const mapDispatchToProps = dispatch => ({
  fetchVenues: () => dispatch(fetchVenues()),
  addShow: show => dispatch(addShow(show))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddShowScreen);
