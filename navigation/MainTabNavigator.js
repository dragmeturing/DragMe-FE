import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import AddShowScreen from '../screens/AddShowScreen';
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

const AddShowStack = createStackNavigator(
  {
    AddShow: AddShowScreen,
  },
  config
);

AddShowStack.navigationOptions = {
  tabBarLabel: 'Add Show',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
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
    HomeStack,
    ShowsStack,
    AddShowStack
  },
  { tabBarOptions }
);

tabNavigator.path = '';

export default tabNavigator;
