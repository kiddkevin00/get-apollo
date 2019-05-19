import colors from '../constants/colors';
import React from 'react';
import { Platform, View } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import ExploreScreen from '../containers/Explore/';
import PlayerScreen from '../containers/Explore/Player';
import HomeScreen from '../containers/Home/';
import DetailScreen from '../containers/Home/Detail';
import ProfileScreen from '../containers/Profile/Profile';
import AboutMeScreen from '../containers/Profile/AboutMe';
import MusicPreferenceScreen from '../containers/Profile/MusicPreference';

const ExploreStack = createStackNavigator(
  {
    explore: ExploreScreen,
    player: PlayerScreen,
  },
  {
    initialRouteName: 'explore',
  }
);

ExploreStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let tabBarVisible;

  if (routeName === 'player') {
    tabBarVisible = false;
  } else {
    tabBarVisible = true;
  }

  return {
    tabBarVisible,
    tabBarLabel: <View />,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        style={{ marginBottom: -3 }}
        color={focused ? colors.lightBlue : colors.grey}
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'}
      />
    ),
  };
};

const HomeStack = createStackNavigator(
  {
    home: HomeScreen,
    detail: DetailScreen,
  },
  {
    initialRouteName: 'home',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: <View />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      style={{ marginBottom: -3 }}
      color={focused ? colors.lightBlue : colors.grey}
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const ProfileStack = createStackNavigator(
  {
    profile: ProfileScreen,
    aboutMe: AboutMeScreen,
    musicPreference: MusicPreferenceScreen,
  },
  {
    initialRouteName: 'profile',
  }
);

ProfileStack.navigationOptions = {
  tabBarLabel: <View />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      style={{ marginBottom: -3 }}
      color={focused ? colors.lightBlue : colors.grey}
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};

export default createBottomTabNavigator(
  {
    explore: ExploreStack,
    home: HomeStack,
    profile: ProfileStack,
  },
  {
    tabBarOptions: {
      activeTintColor: colors.lightBlue,
      activeBackgroundColor: colors.darkBlue,
      inactiveTintColor: colors.darkBlue,
      inactiveBackgroundColor: colors.darkBlue,
    },
    initialRouteName: 'home',
  }
);
