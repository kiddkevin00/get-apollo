import { defaultNavigationOptions } from '../../constants/navigation';
import React from 'react';
import { genders, relationships } from '../../constants/enums';
import TabBarIcon from '../../components/ExpoIcon';
import {
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native';

class AboutMe extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'ABOUT ME',
  };

  state = {
    gender: genders.OTHER,
    relationship: relationships.SINGLE,
  };

  renderGenderButtons = () =>
    Object.keys(genders).map(key => {
      const title = genders[key];
      let iconName;

      switch (title) {
        case genders.FEMALE:
          iconName = 'ios-female';
          break;
        case genders.MALE:
          iconName = 'ios-male';
          break;
        case genders.OTHER:
        default:
          iconName = 'ios-transgender';
          break;
      }

      let iconColor;

      if (this.state.gender === title) {
        iconColor = '#017bf6';
      } else {
        iconColor = 'grey';
      }

      return (
        <TouchableHighlight key={title} onPress={() => this.setState({ gender: title })}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 4,
            }}
          >
            <TabBarIcon name={iconName} size={48} color={iconColor} />
            <Text style={{ color: iconColor }}>{title}</Text>
          </View>
        </TouchableHighlight>
      );
    });

  renderRelationshipButtons = () =>
    Object.keys(relationships).map(key => {
      const title = relationships[key];

      return (
        <TouchableHighlight
          key={title}
          onPress={() => this.setState({ relationship: title })}
          style={{
            margin: 4,
            borderRadius: 15,
            width: 240,
            height: 30,
            borderColor: '#017bf6',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.state.relationship === title ? '#017bf6' : 'black',
          }}
        >
          <Text
            style={{
              color: this.state.relationship === title ? 'white' : 'grey',
              fontSize: 14,
            }}
          >
            {title}
          </Text>
        </TouchableHighlight>
      );
    });

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
          source={require('../../assets/images/about-me-star.png')}
        />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}
        >
          {this.renderGenderButtons()}
        </View>
        <View
          style={{
            width: '100%',
            padding: 22,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.renderRelationshipButtons()}
        </View>
        <TouchableOpacity
          style={{
            width: 120,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#017bf6',
          }}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={{ color: 'white' }}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default AboutMe;
