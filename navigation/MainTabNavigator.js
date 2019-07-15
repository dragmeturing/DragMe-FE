import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { primaryColor, accentColor, secondaryColor } from '../constants/Colors';
import ShowScreen from '../screens/ShowScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

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
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

ShowsStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabBarOptions = {
  activeTintColor: accentColor,
  activeBackgroundColor: secondaryColor,
  style: {
    backgroundColor: primaryColor
  },
};

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    ShowsStack,
    SettingsStack
  },
  { tabBarOptions }
);

tabNavigator.path = '';

export default tabNavigator;
