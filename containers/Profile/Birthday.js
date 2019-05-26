import { defaultNavigationOptions } from '../../constants/navigation';
import React from 'react';
import {
  StyleSheet,
  Image,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const styles = StyleSheet.create({});

class UnconnectedBirthday extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'BIRTHDAY',
  };

  state = {
    displayName: 'Paul Hsu',
  };

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    const { navigation } = this.props;

    return (
      <View
        style={{
          backgroundColor: 'black',
          padding: 72,
          alignItems: 'center',
          flex: 1,
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  dispatchSignInAnonymously(navigation) {
    dispatch(actionCreator.signInAnonymously(navigation));
  },
});

const Birthday = connect(mapStateToProps, mapDispatchToProps)(
  UnconnectedBirthday
);

export { UnconnectedBirthday, Birthday as default };
