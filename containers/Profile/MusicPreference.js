import { defaultNavigationOptions } from '../../constants/navigation';
import React from 'react';
import { musicPreference } from '../../constants/enums';
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
  static navigationOptions = ({ navigation }) => {
    return {
      ...defaultNavigationOptions,
      title: 'MUSIC',
    };
  };

  state = {
    musicPreference: ['HIP_HOP', 'REGGAE'],
  };
  renderPreferenceButtons = () => {
    return Object.keys(musicPreference).map(key => {
      const title = musicPreference[key];
      const isSelected = this.state.musicPreference.includes(key);
      return (
        <TouchableHighlight
          key={title}
          onPress={() => {
            if (this.state.musicPreference.includes(key)) {
              this.setState(state => {
                const musicPreference = state.musicPreference.filter(
                  item => item !== key
                );
                return {
                  musicPreference,
                };
              });
            } else {
              this.setState(state => {
                const musicPreference = state.musicPreference.concat(key);
                return {
                  musicPreference,
                };
              });
            }
          }}
          style={{
            width: 120,
            height: 30,
            margin: 4,
            backgroundColor: this.state.musicPreference.includes(key)
              ? '#017bf6'
              : 'black',
            borderRadius: 15,
            borderColor: '#017bf6',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: this.state.musicPreference.includes(key)
                ? 'white'
                : 'grey',
              fontSize: 14,
            }}
          >
            {title}
          </Text>
        </TouchableHighlight>
      );
    });
  };
  render() {
    const { navigation } = this.props;
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
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: 'white' }}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default MusicPreference;
