import { defaultNavigationOptions } from '../../constants/navigation';
import React from 'react';
import { View, Image, TouchableHighlight, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Facebook } from 'expo';
import { firebaseAuth } from '../../utils/firebaseClient';
import actionCreator from '../../actionCreators/auth';

class UnconnectedGuestProfile extends React.Component {
  render() {
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
            onPress={() => alert('pressed!')}
          >
            <Text style={{ fontSize: 14, color: 'grey' }}>
              Connect using Facebook
            </Text>
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
            onPress={() => alert('pressed!')}
          >
            <Text style={{ fontSize: 14, color: 'grey' }}>
              Connect using Google
            </Text>
          </TouchableHighlight>
          <Text
            style={{
              textAlign: 'center',
              margin: 8,
              fontSize: 14,
              color: 'grey',
            }}
            onPress={() => alert('pressed!')}
          >
            Logout
          </Text>
        </View>
      </View>
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

const GuestProfile = connect(mapStateToProps, mapDispatchToProps)(
  UnconnectedGuestProfile
);

export { UnconnectedGuestProfile, GuestProfile as default };
