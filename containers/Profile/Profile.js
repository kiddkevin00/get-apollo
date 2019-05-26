import { defaultNavigationOptions } from '../../constants/navigation';
import TabBarIcon from '../../components/TabBarIcon';
import GuestProfile from './GuestProfile';
import React from 'react';
import QRCode from 'react-native-qrcode';
import { WebBrowser } from 'expo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Container, Card, Button, Text, CardItem, Content } from 'native-base';
import { StyleSheet, StatusBar } from 'react-native';

class UnconnectedProfile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      ...defaultNavigationOptions,
      title: 'PROFILE',
    };
  };

  goToTermsAndConditions = () => {
    WebBrowser.openBrowserAsync('https://www.getapollo.in/terms-of-service');
  };

  goToPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync('https://www.getapollo.in/privacy-policy');
  };

  render() {
    if (this.props.auth.isAnonymous) {
      return <GuestProfile />;
    }

    const displayName = 'Paul Hsu';
    const gender = 'male';
    const relationship = 'Single';
    const musicPreferences = ['HIP_HOP', 'REGGAE'];
    const age = '21';
    const userID = '123456789';

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
              <QRCode
                value={userID}
                size={120}
                bgColor="White"
                fgColor="Black"
              />
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
            <CardItem
              style={styles.link}
              button={true}
              onPress={() =>
                this.props.navigation.push('aboutMe', {
                  gender: gender,
                  relationship: relationship,
                })
              }
            >
              <Text style={styles.linkText}>About Me</Text>
              <TabBarIcon
                style={{ marginRight: '20%' }}
                size={16}
                color="grey"
                name="angle-right"
                type="FontAwesome"
              />
            </CardItem>
            <CardItem
              style={styles.link}
              button={true}
              onPress={() =>
                this.props.navigation.push('musicPreference', {
                  musicPreferences: JSON.stringify(musicPreferences),
                })
              }
            >
              <Text style={styles.linkText}>Music Preference</Text>

              <TabBarIcon
                style={{ marginRight: '20%' }}
                size={16}
                color="grey"
                name="angle-right"
                type="FontAwesome"
              />
            </CardItem>
            <CardItem
              style={styles.link}
              button={true}
              onPress={this.goToTermsAndConditions}
            >
              <Text style={styles.linkText}>Terms & Conditions</Text>
              <TabBarIcon
                style={{ marginRight: '20%' }}
                size={16}
                color="grey"
                name="angle-right"
                type="FontAwesome"
              />
            </CardItem>
            <CardItem
              style={styles.link}
              button={true}
              onPress={this.goToPrivacyPolicy}
            >
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
                primary
                style={{
                  height: 40,
                  width: 240,
                  borderRadius: 20,
                  borderColor: '#017bf6',
                  borderWidth: 0,
                  justifyContent: 'center',
                  backgroundColor: '#017bf6',
                }}
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

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({});

const Profile = compose(connect(mapStateToProps, mapDispatchToProps))(
  UnconnectedProfile
);

export { UnconnectedProfile, Profile as default };
