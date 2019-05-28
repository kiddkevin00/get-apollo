import { defaultNavigationOptions } from '../../constants/navigation';
import { User } from '../../utils/firebase/user';
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import actionCreator from '../../actionCreators/auth';

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

class UnconnectedTermsAndConditions extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'TERMS & CONDITIONS',
  };

  componentDidMount() {
    StatusBar.setHidden(true);
    this.props.dispatchLoadProfile();
  }

  goToTermsAndConditions = () => {
    WebBrowser.openBrowserAsync('https://www.getapollo.in/terms-of-service');
  };

  goToviewPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync('https://www.getapollo.in/privacy-policy');
  };

  accept = async () => {
    console.log('in accept');
    await this.setTermsAndCondition(true);
  };

  decline = async () => {
    await this.setTermsAndCondition(false);
    Alert.alert(
      'Error',
      'Sorry, you must accept our terms of service in order to use the app.',
      [
        { text: 'OK' },
        { text: 'Cancel', onPress: () => this.props.navigation.goBack() },
      ]
    );
  };

  setTermsAndCondition = async accepted => {
    const profile = { termsAndConditions: true };
    try {
      await this.props.dispatchSaveProfile(profile);
      this.props.navigation.push('displayName');
    } catch (e) {
      console.log('error', e);
    }
  };

  render() {
    const { navigation } = this.props;

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
          onPress={this.accept}
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
          onPress={this.decline}
        >
          <Text style={{ color: 'grey', fontSize: 14 }}>Decline</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  isUpdating: state.auth.isUpdatingData,
});

const mapDispatchToProps = dispatch => ({
  dispatchSaveProfile(profile) {
    dispatch(actionCreator.saveProfile(profile));
  },
  dispatchLoadProfile() {
    dispatch(actionCreator.loadProfile());
  },
});

const TermsAndConditions = connect(mapStateToProps, mapDispatchToProps)(
  UnconnectedTermsAndConditions
);

export { UnconnectedTermsAndConditions, TermsAndConditions as default };
