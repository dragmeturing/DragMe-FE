import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import AllVenuesScreen from '../screens/AllVenuesScreen';
import ResultsScreen from '../screens/ResultsScreen';
import AddShowScreen from '../screens/AddShowScreen';
import { primaryColor, accentColor, secondaryColor } from '../constants/Colors';
import ShowScreen from '../screens/ShowScreen';
import VenueScreen from '../screens/VenueScreen';
import AllPerformersScreen from '../screens/AllPerformersScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const VenuesStack = createStackNavigator(
  {
    AllVenues: AllVenuesScreen,
    Venue: VenueScreen,
    Show: ShowScreen
  },
  config
);

VenuesStack.navigationOptions = {
  tabBarLabel: 'Venues',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-pin`}
    />
  ),
};

VenuesStack.path = '';

const ShowsStack = createStackNavigator(
  {
    Results: ResultsScreen,
    Show: ShowScreen
  },
  config
);

ShowsStack.navigationOptions = {
  tabBarLabel: "Shows",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={"ios-microphone"}
    />
  )
};

ShowsStack.path = '';

const PerformersStack = createStackNavigator(
  {
    AllPerformers: AllPerformersScreen,
    // Performer: PerformerScreen
  },
  config
);

PerformersStack.navigationOptions = {
  tabBarLabel: "Performers",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"ios-star"} />
  )
};

PerformersStack.path = "";


const AddShowStack = createStackNavigator(
  {
    AddShow: AddShowScreen,
  },
  config
);

AddShowStack.navigationOptions = {
  tabBarLabel: 'Add Show',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-add'} />
  ),
};

AddShowStack.path = '';

const tabBarOptions = {
  activeTintColor: accentColor,
  activeBackgroundColor: secondaryColor,
  style: {
    backgroundColor: primaryColor
  },
};

const tabNavigator = createBottomTabNavigator(
  {
    VenuesStack,
    ShowsStack,
    PerformersStack,
    AddShowStack
  },
  { tabBarOptions,
  initialRouteName: 'ShowsStack' }
);

tabNavigator.path = '';

export default tabNavigator;
