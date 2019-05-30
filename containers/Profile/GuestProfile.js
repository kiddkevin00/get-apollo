import actionCreator from '../../actionCreators/auth';
import React from 'react';
import { View, Image, TouchableHighlight, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

class UnconnectedGuestProfile extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    dispatchSignInWithFacebook: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  handleFacebookLogin = () => {
    this.props.dispatchSignInWithFacebook(this.props.navigation);
  };

  handleLogout = () => {
    this.props.navigation.navigate('home', {}, NavigationActions.navigate({ routeName: 'login' }));
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <StatusBar barStyle="light-content" />
        <Image
          style={{
            margin: 0,
            height: 256,
            width: 160,
            resizeMode: 'contain',
          }}
          source={require('../../assets/images/apollo.png')}
        />
        <Text
          style={{
            textAlign: 'center',
          }}
        >
          To get all the live features of Apollo, please sign up or login below.
        </Text>
        <View>
          <TouchableHighlight
            style={{
              margin: 8,
              width: 240,
              height: 40,
              borderRadius: 20,
              borderColor: '#017bf6',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
            }}
            onPress={this.handleFacebookLogin}
          >
            <Text style={{ fontSize: 14, color: 'grey' }}>Connect using Facebook</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              margin: 8,
              width: 240,
              height: 40,
              borderRadius: 20,
              borderColor: '#017bf6',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
            }}
            onPress={() => {}}
          >
            <Text style={{ fontSize: 14, color: 'grey' }}>Connect using Google</Text>
          </TouchableHighlight>
          <Text
            style={{
              textAlign: 'center',
              margin: 8,
              fontSize: 14,
              color: 'grey',
            }}
            onPress={this.handleLogout}
          >
            Logout
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  dispatchSignInWithFacebook(navigation) {
    dispatch(actionCreator.signInWithFacebook(navigation));
  },
});

const GuestProfile = connect(mapStateToProps, mapDispatchToProps)(UnconnectedGuestProfile);

export { UnconnectedGuestProfile, GuestProfile as default };
