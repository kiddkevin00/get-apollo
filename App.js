import AppNavigator from './navigation/AppNavigator';
import configureStore from './store/';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Root } from 'native-base';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import clone from 'lodash.clone';
import PropTypes from 'prop-types';

ignoreWarning('Setting a timer');

const store = configureStore();
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
    flexGrow: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  };

  static defaultProps = {
    skipLoadingScreen: undefined,
  };

  state = {
    isLoadingComplete: false,
  };

  loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),

        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  handleLoadingError = error => {
    console.warn(error);
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onFinish={this.handleFinishLoading}
          onError={this.handleLoadingError}
        />
      );
    }

    return (
      <Root>
        <Provider store={store}>
          <View style={styles.container}>
            <StatusBar barStyle="default" hidden={false} />
            <AppNavigator />
          </View>
        </Provider>
      </Root>
    );
  }
}

function ignoreWarning(matchedMessage) {
  YellowBox.ignoreWarnings([matchedMessage]);

  const _console = clone(console);

  console.warn = message => {
    if (!message.includes(matchedMessage)) {
      _console.warn(message);
    }
  };
}
