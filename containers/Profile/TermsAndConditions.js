import { defaultNavigationOptions } from '../../constants/navigation';
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 16,
    color: 'grey',
    fontSize: 14,
  },
  link: {
    color: '#017bf6',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 4,
  },
});

class TermsAndConditions extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'TERMS & CONDITIONS',
  };

  goToTermsAndConditions = () => {
    WebBrowser.openBrowserAsync('https://www.getapollo.in/terms-of-service');
  };

  goToviewPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync('https://www.getapollo.in/privacy-policy');
  };

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView
        style={{
          backgroundColor: 'black',
          padding: 36,
        }}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'grey',
            marginBottom: 16,
          }}
        >
          <Text style={styles.paragraph}>Hi there!</Text>
          <Text style={styles.paragraph}>
            Thanks for using our service and application. We wouldn’t be here if
            it weren’t for your support. The goal of this page is to protect and
            inform you as our user on our platform.
          </Text>
          <Text style={styles.paragraph}>Enjoy!</Text>
        </View>
        <Text style={styles.paragraph}>
          Please review Get Apollo's Privacy Policy and Terms & Conditions by
          clicking on the links below.
        </Text>
        <TouchableOpacity>
          <Text style={styles.link} onPress={this.goToviewPrivacyPolicy}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link} onPress={this.goToTermsAndConditions}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>
        <Text style={[styles.paragraph, { marginTop: 40 }]}>
          By clicking "Accept", you have read and agreed to our Privacy Policy
          and Terms & Conditions.
        </Text>
        <TouchableOpacity
          style={{
            height: 40,
            width: '100%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#017bf6',
          }}
          onPress={() => this.props.navigation.push('displayName')}
        >
          <Text style={{ color: 'white', fontSize: 14 }}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 40,
            width: '100%',
            borderRadius: 20,
            borderColor: '#017bf6',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            marginTop: 10,
          }}
        >
          <Text style={{ color: 'grey', fontSize: 14 }}>Decline</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default TermsAndConditions;
