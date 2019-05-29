import { defaultNavigationOptions } from '../../constants/navigation';
import {
  Spinner,
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Text,
  Button,
  Icon,
} from 'native-base';
import { StatusBar } from 'react-native';
import { WebBrowser } from 'expo';
import React from 'react';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'PROFILE',
  };

  goToWebView(url) {
    WebBrowser.openBrowserAsync(url);
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Content style={{ backgroundColor: '#F0F0F0' }}>
          <List style={{ backgroundColor: 'white' }}>
            <ListItem itemDivider={true}>
              <Text>Account</Text>
            </ListItem>
            <ListItem last={true} icon={true} button={true} onPress={() => {}}>
              <Left>
                <Icon active={true} name="person" />
              </Left>
              <Body>
                <Text>Sign in</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem itemDivider={true}>
              <Text>Support</Text>
            </ListItem>
            <ListItem
              icon={true}
              button={true}
              onPress={this.goToWebView.bind(this, 'https://www.getapollo.in/privacy-policy')}
            >
              <Left>
                <Icon active={true} name="paper" />
              </Left>
              <Body>
                <Text>Privacy Policy</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              icon={true}
              button={true}
              onPress={this.goToWebView.bind(this, 'https://www.getapollo.in/terms-of-service')}
            >
              <Left>
                <Icon active={true} name="paper-plane" />
              </Left>
              <Body>
                <Text>Terms of Use</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              icon={true}
              button={true}
              onPress={this.goToWebView.bind(this, 'https://www.getapollo.in/')}
            >
              <Left>
                <Icon active={true} name="information-circle" />
              </Left>
              <Body>
                <Text>About Us</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              last={true}
              icon={true}
              button={true}
              onPress={this.goToWebView.bind(this, 'https://www.getapollo.in/contact-us')}
            >
              <Left>
                <Icon active={true} name="call" />
              </Left>
              <Body>
                <Text>Contact Us</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem itemDivider={true}>
              <Text>Work With Us</Text>
            </ListItem>
            <ListItem
              last={true}
              icon={true}
              button={true}
              onPress={this.goToWebView.bind(this, 'https://www.getapollo.in/')}
            >
              <Left>
                <Icon active={true} name="more" />
              </Left>
              <Body>
                <Text>More information</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>

          {false && <Spinner color="blue" />}
        </Content>
      </Container>
    );
  }
}
