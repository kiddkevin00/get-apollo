import actionCreator from '../../actionCreators/auth';
import LoadingPage from '../../components/LoadingPage';
import TabBarIcon from '../../components/ExpoIcon';
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
    header: null,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    isLoadingData: PropTypes.bool.isRequired,

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

    const { uid, displayName, gender, birthday } = this.props;
    const age = '21'; // TODO

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
              marginTop: '12%',
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
              <Text style={{ color: 'grey', fontSize: 20 }}>{displayName}</Text>
            </CardItem>
            <CardItem
              style={{
                backgroundColor: 'black',
                alignItems: 'center',
                borderColor: 'black',
                marginBottom: 12,
                paddingTop: 6,
              }}
            >
              <Text style={{ color: 'grey' }}>
                {age} | {gender}
              </Text>
            </CardItem>
            <CardItem style={styles.link} button={true} onPress={() => {}}>
              <Text style={styles.linkText}>About Me</Text>
              <TabBarIcon
                style={{ marginRight: '20%' }}
                size={16}
                color="grey"
                name="angle-right"
                type="FontAwesome"
              />
            </CardItem>
            <CardItem style={styles.link} button={true} onPress={() => {}}>
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
                paddingTop: 30,
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
  formBirthday: state.auth.formBirthday,
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
