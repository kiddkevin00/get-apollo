import { defaultNavigationOptions } from '../../constants/navigation';
import dimensions from '../../constants/dimensions';
import React from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Button,
  Text,
} from 'native-base';
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import TabBarIcon from '../../components/TabBarIcon';

const styles = StyleSheet.create({
  iconText: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  iconTextRight: {
    paddingLeft: 8,
    paddingRight: 4,
  },
  iconText: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  iconTextRight: {
    paddingLeft: 8,
    paddingRight: 4,
  },
});

class UnconnectedHome extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'CLUBS',
  };

  renderVenue = venue => {
    return (
      <ListItem
        style={{
          marginLeft: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          borderBottomWidth: 0,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.push('detail', {
              name: venue.name,
              dressCode: venue.dressCode,
              headcountFemale: venue.headcountFemale,
              headcountMale: venue.headcountMale,
              hoursOfOperation: JSON.stringify(venue.hoursOfOperation),
              coverChargeDollars: venue.coverChargeDollars,
              coverChargeDollarsFemale: venue.coverChargeDollarsFemale,
              waitTimeMinutes: venue.waitTimeMinutes,
              litScore: venue.litScore,
              musicPreferences: JSON.stringify(venue.musicPreferences),
              photoURL: venue.photoURL,
              maxCapacity: venue.maxCapacity,
            })
          }
        >
          <Card
            style={{
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderBottomWidth: 0,
              borderLeftWidth: 0,
            }}
          >
            <CardItem cardBody={true}>
              <ImageBackground
                style={{
                  height: dimensions.window.width - 35,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={{ uri: venue.photoURL }}
              >
                <Text style={{ color: 'white' }}>{venue.name}</Text>
              </ImageBackground>
            </CardItem>
            <CardItem
              style={{
                backgroundColor: 'black',
                borderRadius: 0,
                paddingTop: 0,
              }}
            >
              <Left>
                <Button disabled={true} iconLeft={true} transparent={true}>
                  <TabBarIcon
                    size={30}
                    color="white"
                    name="fire"
                    type="MaterialCommunityIcons"
                  />
                  <Text style={styles.iconText}>{venue.litScore}</Text>
                </Button>
              </Left>
              <Body>
                <Button
                  disabled={true}
                  iconLeft={true}
                  transparent={true}
                  style={{ justifyContent: 'center' }}
                >
                  <TabBarIcon
                    size={30}
                    color="white"
                    name="time-slot"
                    type="Entypo"
                  />
                  <Text style={styles.iconText}>
                    {venue.waitTimeMinutes}min
                  </Text>
                </Button>
              </Body>
              <Right>
                <Button disabled={true} iconLeft={true} transparent={true}>
                  <TabBarIcon
                    size={30}
                    color="white"
                    name="wallet"
                    type="Entypo"
                  />
                  <Text style={styles.iconTextRight}>
                    ${venue.coverChargeDollars
                      ? venue.coverChargeDollars
                      : venue.coverChargeDollarsFemale}
                  </Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </ListItem>
    );
  };

  render() {
    return (
      <Container style={{ backgroundColor: 'black' }}>
        <StatusBar barStyle="light-content" />
        <Content>
          <List
            dataArray={this.props.venues.filter(venue => venue.active)}
            renderRow={this.renderVenue}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  venues: state.firestore.ordered.venues || [],
});

const mapDispatchToProps = dispatch => ({});

const Home = compose(
  firestoreConnect([{ collection: 'venues' }]),
  connect(mapStateToProps, mapDispatchToProps)
)(UnconnectedHome);

export { UnconnectedHome, Home as default };
