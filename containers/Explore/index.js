import firebaseClient from '../../utils/firebaseClient';
import { defaultNavigationOptions } from '../../constants/navigation';
import dimensions from '../../constants/dimensions';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Title,
  Button,
  Text,
  Icon,
} from 'native-base';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Share,
} from 'react-native';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

const getVenuePosts = async ({ docSnapshot, limit = 4, timestamp, venueId } = {}) => {
  let collection = firebaseClient
    .firestore()
    .collection('venuePosts')
    .orderBy('timestamp', 'desc');

  if (docSnapshot) {
    collection = collection.startAfter(docSnapshot);
  }

  if (timestamp) {
    collection = collection.startAt(new Date(timestamp));
  }

  if (venueId) {
    collection = collection.where('venueId', '==', venueId);
  }

  const querySnapshot = await collection.limit(limit).get();

  return querySnapshot.docs;
};

class UnconnectedExplore extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'EXPLORED',
  };

  renderVenuePost = post => {
    const postedDate = moment(post.timestamp.toDate());
    const displayMonth = postedDate.format('MMM').toUpperCase();
    const displayDate = postedDate.format('DD');
    const displayTime = postedDate.format('h:mm A');

    return (
      <ListItem style={{ borderBottomWidth: 0 }}>
        <Card>
          <CardItem>
            <Left>
              <Body style={{ flexGrow: 2, justifyContent: 'center', marginLeft: 0 }}>
                <Text style={{ fontSize: 10.5, color: 'red' }}>&nbsp;{displayMonth}</Text>
                <Text style={{ fontSize: 22.5 }}>{displayDate}</Text>
              </Body>
              <Body style={{ flexGrow: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>{post.venueName}</Text>
                <Text style={{ fontSize: 13, color: '#333' }} note={true}>
                  {displayTime}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody={true}>
            <Image
              style={{ height: dimensions.window.width - 35, width: '100%' }}
              source={
                post.type === 'PHOTO'
                  ? { uri: post.thumbnailURL }
                  : require('../../assets/images/play.png')
              }
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button iconLeft={true} transparent={true} onPress={() => {}}>
                <Icon style={{ fontSize: 22, color: '#f96332' }} name="bookmark" />
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#f96332' }}>Like</Text>
              </Button>
              <Text>&nbsp;</Text>
              <Button
                iconLeft={true}
                transparent={true}
                onPress={() =>
                  Share.share({
                    title: post.venueName,
                    message:
                      `Check out this venue - ${post.venueName}:\n` +
                      `GetApollo2019://?event=${global.encodeURIComponent(post.venueId)}\n\n` +
                      'Click the link below to download Get Apollo:\n' +
                      'https://itunes.apple.com/us/app/get-apollo/id1440237761?mt=8',
                  })
                }
              >
                <Icon style={{ fontSize: 22, color: '#f96332' }} name="share" />
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#f96332' }}>Share</Text>
              </Button>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
          <CardItem style={{ paddingTop: 0.1, paddingBottom: 0.1 }} />
        </Card>
      </ListItem>
    );
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Content>
          <List dataArray={this.props.venuePosts} renderRow={this.renderVenuePost} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  venuePosts: state.firestore.ordered.venuePosts || [],
});

const mapDispatchToProps = dispatch => ({});

const Explore = compose(
  firestoreConnect([{ collection: 'venuePosts', limit: 30, orderBy: [['timestamp', 'desc']] }]),
  connect(mapStateToProps, mapDispatchToProps)
)(UnconnectedExplore);

export { UnconnectedExplore, Explore as default };
