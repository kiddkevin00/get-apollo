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

class UnconnectedDisplayName extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    displayName: 'Marcus Hsu',
  };

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'black',
          padding: 72,
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Image
          style={{
            height: 128,
            marginTop: 100,
            maxWidth: '100%',
            resizeMode: 'contain',
          }}
          source={require('../../assets/images/welcome.png')}
        />
        <TextInput
          autoFocus={true}
          style={{
            height: 40,
            width: '100%',
            textAlign: 'center',
            fontSize: 24,
            color: 'grey',
            borderColor: 'grey',
            borderBottomWidth: 1,
          }}
          onChangeText={displayName => this.setState({ displayName })}
          value={this.state.displayName}
        />
        <Text style={{ fontSize: 10, color: 'grey' }}>
          Note: Your name must match your state ID or passport.
        </Text>
        <TouchableOpacity
          style={{
            height: 40,
            width: 120,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#017bf6',
            marginTop: 100,
          }}
          onPress={() => this.props.navigation.push('birthday')}
        >
          <Text style={{ fontSize: 14, color: 'white' }}>Saved</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const DisplayName = connect(mapStateToProps, mapDispatchToProps)(UnconnectedDisplayName);

export { UnconnectedDisplayName, DisplayName as default };
