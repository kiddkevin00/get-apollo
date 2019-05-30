import actionCreator from '../../actionCreators/auth';
import LoadingPage from '../../components/LoadingPage';
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

class UnconnectedLogin extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    isUpdatingData: PropTypes.bool.isRequired,

    dispatchSignInWithFacebook: PropTypes.func.isRequired,
    dispatchSignInAnonymously: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    fadingOpacity: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.fadingOpacity, {
      toValue: 1,
      delay: 500,
      duration: 2000,
    }).start();
  }

  handleFacebookLogin = () => {
    this.props.dispatchSignInWithFacebook(this.props.navigation);
  };

  handleSignInAnonymously = () => {
    this.props.dispatchSignInAnonymously(this.props.navigation);
  };

  render() {
    if (this.props.isUpdatingData) {
      return <LoadingPage />;
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <StatusBar hidden={true} />
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
        <Animated.View style={{ opacity: this.state.fadingOpacity }}>
          <TouchableHighlight style={styles.loginBtn} onPress={this.handleFacebookLogin}>
            <Text style={{ fontSize: 14, color: 'grey' }}>Connect using Facebook</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.loginBtn} onPress={() => {}}>
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

const mapStateToProps = state => ({
  isUpdatingData: state.auth.isUpdatingData,
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
