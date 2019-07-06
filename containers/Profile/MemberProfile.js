import actionCreator from '../../actionCreators/auth';
import LoadingPage from '../../components/LoadingPage';
import TabBarIcon from '../../components/ExpoIcon';
import { defaultNavigationOptions } from '../../constants/navigation';
import React from 'react';
import QRCode from 'react-native-qrcode';
import { WebBrowser } from 'expo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Container, Card, Button, Text, CardItem, Content } from 'native-base';
import { StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  linkText: {
    marginLeft: '20%',
    color: 'grey',
  },
  link: {
    backgroundColor: 'black',
    borderColor: 'black',
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

class UnconnectedMemberProfile extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'PROFILE',
    headerLeft: null,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    isLoadingData: PropTypes.bool.isRequired,
    birthday: PropTypes.instanceOf(Date).isRequired,
    gender: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,

    dispatchLoadUserInfo: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentWillMount() {
    const uid = this.props.navigation.getParam('uid', this.props.auth.uid);

    this.props.dispatchLoadUserInfo(uid);
  }

  goToTermsAndConditions = () => {
    WebBrowser.openBrowserAsync('https://www.getapollo.in/terms-of-service');
  };

  goToPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync('https://www.getapollo.in/privacy-policy');
  };

  handleLogout = () => {
    this.props.navigation.replace('login');
  };

  render() {
    if (this.props.isLoadingData) {
      return <LoadingPage />;
    }

    const { uid, displayName, gender, birthday, navigation } = this.props;
    const age = '21'; // [TODO] Calculate from birthday

    return (
      <Container
        style={{
          backgroundColor: 'black',
        }}
      >
        <StatusBar barStyle="light-content" />
        <Content>
          <Card
            style={{
              backgroundColor: 'black',
              borderColor: 'black',
              alignItems: 'center',
            }}
          >
            <CardItem
              style={{
                backgroundColor: 'black',
                alignItems: 'center',
                borderColor: 'black',
                marginBottom: 8,
              }}
            >
              <QRCode value={uid} size={120} bgColor="White" fgColor="Black" />
            </CardItem>
            <CardItem
              style={{
                backgroundColor: 'black',
                alignItems: 'center',
                borderColor: 'black',
                paddingBottom: 0,
              }}
            >
              <Text style={{ color: 'grey', fontSize: 20 }}>{displayName || 'N/A'}</Text>
            </CardItem>
            <CardItem
              style={{
                backgroundColor: 'black',
                alignItems: 'center',
                borderColor: 'black',
                marginBottom: 8,
                paddingTop: 6,
              }}
            >
              <Text style={{ color: 'grey' }}>
                {age} | {gender}
              </Text>
            </CardItem>
            <CardItem style={styles.link} button={true} onPress={() => navigation.push('aboutMe')}>
              <Text style={styles.linkText}>About Me</Text>
              <TabBarIcon
                style={{ marginRight: '20%' }}
                size={16}
                color="grey"
                name="angle-right"
                type="FontAwesome"
              />
            </CardItem>
            <CardItem style={styles.link} button={true} onPress={() => navigation.push('musicPreferences')}>
              <Text style={styles.linkText}>Music Preference</Text>
              <TabBarIcon
                style={{ marginRight: '20%' }}
                size={16}
                color="grey"
                name="angle-right"
                type="FontAwesome"
              />
            </CardItem>
            <CardItem style={styles.link} button={true} onPress={this.goToTermsAndConditions}>
              <Text style={styles.linkText}>Terms & Conditions</Text>
              <TabBarIcon
                style={{ marginRight: '20%' }}
                size={16}
                color="grey"
                name="angle-right"
                type="FontAwesome"
              />
            </CardItem>
            <CardItem style={styles.link} button={true} onPress={this.goToPrivacyPolicy}>
              <Text style={styles.linkText}>Privacy Policy</Text>
              <TabBarIcon
                style={{ marginRight: '20%' }}
                size={16}
                color="grey"
                name="angle-right"
                type="FontAwesome"
              />
            </CardItem>
            <CardItem
              style={{
                backgroundColor: 'black',
                alignItems: 'center',
                borderColor: 'black',
                paddingTop: 20,
                paddingBottom: 10,
              }}
            >
              <Button
                primary={true}
                style={{
                  height: 40,
                  width: 240,
                  borderRadius: 20,
                  borderColor: '#017bf6',
                  borderWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#017bf6',
                }}
                onPress={this.handleLogout}
              >
                <Text>Logout</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  isLoadingData: state.auth.isLoadingData,
  displayName: state.auth.displayName,
  birthday: state.auth.birthday,
  gender: state.auth.gender,
});

const mapDispatchToProps = dispatch => ({
  dispatchLoadUserInfo(uid) {
    return dispatch(actionCreator.loadUserInfo(uid));
  },
});

const MemberProfile = compose(connect(mapStateToProps, mapDispatchToProps))(
  UnconnectedMemberProfile
);

export { UnconnectedMemberProfile, MemberProfile as default };
