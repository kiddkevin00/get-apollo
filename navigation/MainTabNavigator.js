import colors from '../constants/colors';
import React from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ExploreScreen from '../containers/Explore/';
import HomeScreen from '../containers/LinksScreen';
import ProfileScreen from '../containers/SettingsScreen';

const ExploreStack = createStackNavigator(
  {
    explore: ExploreScreen,
  },
  {
    initialRouteName: 'explore',
  }
);

ExploreStack.navigationOptions = {
  tabBarLabel: <View />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'}
    />
  ),
};

const HomeStack = createStackNavigator(
  {
    home: HomeScreen,
  },
  {
    initialRouteName: 'home',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: <View />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const ProfileStack = createStackNavigator(
  {
    profile: ProfileScreen,
  },
  {
    initialRouteName: 'profile',
  }
);

ProfileStack.navigationOptions = {
  tabBarLabel: <View />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};

export default createBottomTabNavigator(
  {
    ExploreStack,
    HomeStack,
    ProfileStack,
  },
  {
    tabBarOptions: {
      activeTintColor: colors.lightBlue,
      activeBackgroundColor: colors.darkBlue,
      inactiveTintColor: colors.darkBlue,
      inactiveBackgroundColor: colors.darkBlue,
    },
    initialRouteName: 'HomeStack',
  }
);
