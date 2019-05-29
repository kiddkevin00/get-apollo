import React from 'react';
import {
  View,
  Image,
  Animated,
  TouchableHighlight,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actionCreator from '../../actionCreators/auth';

class UnconnectedLogin extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  state = {
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    StatusBar.setHidden(true);

    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      delay: 500,
      duration: 2000,
    }).start();
  }

  handleFacebookLogin = async () => {
    this.props.dispatchSignInWithFacebook(this.props.navigation);
  };

  handleSignInAnonymously = async () => {
    this.props.dispatchSignInAnonymously(this.props.navigation);
  };

  render() {
    if (this.props.isUpdating) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          }}
        >
          <Text style={{ color: 'black' }}>Pouring drinks...</Text>
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <Image
          style={{
            marginTop: 60,
            marginBottom: 60,
            height: 256,
            width: 160,
            resizeMode: 'contain',
          }}
          source={require('../../assets/images/apollo.png')}
        />
        <Animated.View style={{ opacity: this.state.fadeAnim }}>
          <TouchableHighlight style={styles.loginBtn} onPress={this.handleFacebookLogin}>
            <Text style={{ fontSize: 14, color: 'grey' }}>Connect using Facebook</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.loginBtn} onPress={() => alert('pressed!')}>
            <Text style={{ fontSize: 14, color: 'grey' }}>Connect using Google</Text>
          </TouchableHighlight>
          <Text
            style={{
              textAlign: 'center',
              margin: 8,
              fontSize: 14,
              color: 'grey',
            }}
            onPress={this.handleSignInAnonymously}
          >
            Continue as Guest
          </Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginBtn: {
    margin: 8,
    width: 240,
    height: 40,
    borderRadius: 20,
    borderColor: '#017bf6',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  isUpdating: state.auth.isUpdatingData,
});

const mapDispatchToProps = dispatch => ({
  dispatchSignInAnonymously(navigation) {
    dispatch(actionCreator.signInAnonymously(navigation));
  },
  dispatchSignInWithFacebook(navigation) {
    dispatch(actionCreator.signInWithFacebook(navigation));
  },
});

const Login = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogin);

export { UnconnectedLogin, Login as default };
