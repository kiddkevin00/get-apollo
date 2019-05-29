import { defaultNavigationOptions } from '../../constants/navigation';
import React from 'react';
import { musicPreferences as musics } from '../../constants/enums';
import {
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

class MusicPreference extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'MUSIC',
  };

  state = {
    musicPreferences: ['HIP_HOP', 'REGGAE'],
  };

  renderPreferenceButtons = () =>
    Object.keys(musics).map(key => {
      const title = musics[key];
      const isSelected = this.state.musicPreferences.includes(key);

      return (
        <TouchableHighlight
          key={title}
          onPress={this.handleMusicPreferencesButtonPress.bind(this, key)}
          style={{
            width: 120,
            height: 30,
            margin: 4,
            backgroundColor: isSelected ? '#017bf6' : 'black',
            borderRadius: 15,
            borderColor: '#017bf6',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: isSelected ? 'white' : 'grey',
              fontSize: 14,
            }}
          >
            {title}
          </Text>
        </TouchableHighlight>
      );
    });

  handleMusicPreferencesButtonPress = key => {
    if (this.state.musicPreferences.includes(key)) {
      this.setState(state => {
        const musicPreferences = state.musicPreferences.filter(item => item !== key);

        return {
          musicPreferences,
        };
      });
    } else {
      this.setState(state => {
        const musicPreferences = state.musicPreferences.concat(key);

        return {
          musicPreferences,
        };
      });
    }
  };

  render() {
    return (
      <ScrollView
        style={{
          minHeight: '100%',
          backgroundColor: 'black',
          padding: 36,
        }}
      >
        <StatusBar barStyle="light-content" />
        <Image
          style={{
            height: 128,
            margin: 26,
            maxWidth: '100%',
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={require('../../assets/images/music.png')}
        />
        <View
          style={{
            padding: 18,
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {this.renderPreferenceButtons()}
        </View>
        <TouchableOpacity
          style={{
            marginTop: 10,
            width: 120,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#017bf6',
          }}
          onPress={() => this.props.navigation.replace('profile')}
        >
          <Text style={{ color: 'white' }}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default MusicPreference;
