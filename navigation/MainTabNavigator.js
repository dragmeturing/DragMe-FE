import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import VenuesScreen from '../screens/VenuesScreen';
import ResultsScreen from '../screens/ResultsScreen';
import AddShowScreen from '../screens/AddShowScreen';
import { primaryColor, accentColor, secondaryColor } from '../constants/Colors';
import ShowScreen from '../screens/ShowScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const VenuesStack = createStackNavigator(
  {
    Venues: VenuesScreen,
  },
  config
);

VenuesStack.navigationOptions = {
  tabBarLabel: 'Venues',
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
      name={"ios-star"}
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
    AddShowStack
  },
  { tabBarOptions }
);

tabNavigator.path = '';

export default tabNavigator;
