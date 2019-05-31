import ExpoIcon from '../components/ExpoIcon';
import ExploreScreen from '../containers/Explore/';
import PlayerScreen from '../containers/Explore/Player';
import HomeScreen from '../containers/Home/';
import LoginScreen from '../containers/Profile/Login';
import VenuesScreen from '../containers/Home/Venues';
import DetailScreen from '../containers/Home/Detail';
import ProfileScreen from '../containers/Profile/';
import MemberProfileScreen from '../containers/Profile/MemberProfile';
import GuestProfileScreen from '../containers/Profile/GuestProfile';
import AboutMeScreen from '../containers/Profile/AboutMe';
import MusicPreferencesScreen from '../containers/Profile/MusicPreferences';
import TermsAndConditionsScreen from '../containers/Profile/TermsAndConditions';
import DisplayNameScreen from '../containers/Profile/DisplayName';
import BirthdayScreen from '../containers/Profile/Birthday';
import colors from '../constants/colors';
import React from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

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
      <ExpoIcon
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
    venues: VenuesScreen,
    detail: DetailScreen,
  },
  {
    initialRouteName: 'home',
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let tabBarVisible;

  if (routeName === 'home') {
    tabBarVisible = false;
  } else {
    tabBarVisible = true;
  }

  return {
    tabBarVisible,
    tabBarLabel: <View />,
    tabBarIcon: ({ focused }) => (
      <ExpoIcon
        style={{ marginBottom: -3 }}
        color={focused ? colors.lightBlue : colors.grey}
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
      />
    ),
  };
};

const ProfileStack = createStackNavigator(
  {
    profile: ProfileScreen,
    login: LoginScreen,
    termsAndConditions: TermsAndConditionsScreen,
    displayName: DisplayNameScreen,
    birthday: BirthdayScreen,
    aboutMe: AboutMeScreen,
    musicPreferences: MusicPreferencesScreen,
    guestProfile: GuestProfileScreen,
    memberProfile: MemberProfileScreen,
  },
  {
    initialRouteName: 'profile',
  }
);

ProfileStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let tabBarVisible;

  if (
    routeName === 'profile' ||
    routeName === 'login' ||
    routeName === 'termsAndConditions' ||
    routeName === 'displayName' ||
    routeName === 'birthday'
  ) {
    tabBarVisible = false;
  } else {
    tabBarVisible = true;
  }

  return {
    tabBarVisible,
    tabBarLabel: <View />,
    tabBarIcon: ({ focused }) => (
      <ExpoIcon
        style={{ marginBottom: -3 }}
        color={focused ? colors.lightBlue : colors.grey}
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
      />
    ),
  };
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
