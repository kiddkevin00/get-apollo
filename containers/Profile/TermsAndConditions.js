import actionCreator from '../../actionCreators/auth';
import LoadingPage from '../../components/LoadingPage';
import { defaultNavigationOptions } from '../../constants/navigation';
import { WebBrowser } from 'expo';
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
import PropTypes from 'prop-types';

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

  static propTypes = {
    auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    isLoadingData: PropTypes.bool.isRequired,
    isUpdatingData: PropTypes.bool.isRequired,

    dispatchLoadUserInfo: PropTypes.func.isRequired,
    dispatchSaveUserInfo: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  goToTermsAndConditionsView = () => {
    WebBrowser.openBrowserAsync('https://www.getapollo.in/terms-of-service');
  };

  goToPrivacyPolicyView = () => {
    WebBrowser.openBrowserAsync('https://www.getapollo.in/privacy-policy');
  };

  handleAccept = async () => {
    await this.props.dispatchSaveUserInfo({ termsAndConditions: true });

    this.props.navigation.push('displayName'); // TODO
  };

  handleDecline = async () => {
    Alert.alert('Error', 'Sorry, you must accept our terms of service in order to use the app.', [
      { text: 'OK' },
      { text: 'Cancel', onPress: () => this.props.navigation.goBack() },
    ]);
  };

  render() {
    if (this.props.isUpdatingData) {
      return <LoadingPage />;
    }

    return (
      <ScrollView
        style={{
          backgroundColor: 'black',
          padding: 36,
        }}
      >
        <StatusBar hidden={true} />
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'grey',
            marginBottom: 16,
          }}
        >
          <Text style={styles.paragraph}>Hi there!</Text>
          <Text style={styles.paragraph}>
            Thanks for using our service and application. We wouldn’t be here if it weren’t for your
            support. The goal of this page is to protect and inform you as our user on our platform.
          </Text>
          <Text style={styles.paragraph}>Enjoy!</Text>
        </View>
        <Text style={styles.paragraph}>
          Please review Get Apollo{"'"}s Privacy Policy and Terms & Conditions by clicking on the
          links below.
        </Text>
        <TouchableOpacity>
          <Text style={styles.link} onPress={this.goToPrivacyPolicyView}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link} onPress={this.goToTermsAndConditionsView}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>
        <Text style={[styles.paragraph, { marginTop: 40 }]}>
          By clicking {'"'}Accept{'"'}, you have read and agreed to our Privacy Policy and Terms &
          Conditions.
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
          onPress={this.handleAccept}
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
          onPress={this.handleDecline}
        >
          <Text style={{ color: 'grey', fontSize: 14 }}>Decline</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  isLoadingData: state.auth.isLoadingData,
  isUpdatingData: state.auth.isUpdatingData,
});

const mapDispatchToProps = dispatch => ({
  dispatchSaveUserInfo(userInfo) {
    dispatch(actionCreator.saveUserInfo(userInfo));
  },
});

const TermsAndConditions = connect(mapStateToProps, mapDispatchToProps)(
  UnconnectedTermsAndConditions
);

export { UnconnectedTermsAndConditions, TermsAndConditions as default };
