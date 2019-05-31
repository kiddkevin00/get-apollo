import firebaseClient from '../../utils/firebaseClient';
import { defaultNavigationOptions } from '../../constants/navigation';
import dimensions from '../../constants/dimensions';
import { noop } from '../../constants/misc';
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
  Segment,
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

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: 'black',
    marginHorizontal: 2.5,
  },
  welcomeImage: {
    width: (dimensions.window.width - 15) / 2,
    height: (dimensions.window.width - 15) / 2,
    resizeMode: 'cover',
    marginTop: 5,
    marginHorizontal: 2.5,
    borderRadius: 10,
  },
  tabBarInfoContainer: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    height: 35,
    width: dimensions.window.width,
    backgroundColor: 'black',
  },
  tabBarInfoText: {
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    //textAlign: 'center',
  },
});

class UnconnectedExplore extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'EXPLORED',
  };

  static segmentMap = {
    grid: 'ALL',
    list: 'PHOTO',
  };

  state = {
    currentSegment: UnconnectedExplore.segmentMap.grid,
    numberOfVisiblePosts: 10,
  };

  onSegmentSelect(targetFilter) {
    this.setState({
      currentSegment: targetFilter,
    });
  }

  renderVenuePost = post => {
    const postedDate = moment(post.timestamp.toDate());
    const displayMonth = postedDate.format('MMM').toUpperCase();
    const displayDate = postedDate.format('DD');
    const displayTime = postedDate.format('h:mm A');

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
        <Card
          style={{
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
          }}
        >
          <CardItem style={{ backgroundColor: 'black', borderRadius: 0 }}>
            <Left>
              <Body style={{ flexGrow: 2, justifyContent: 'center', marginLeft: 0 }}>
                <Text style={{ fontSize: 10.5, color: '#e5e3e3' }}>&nbsp;{displayMonth}</Text>
                <Text style={{ fontSize: 22.5, color: 'white' }}>{displayDate}</Text>
              </Body>
              <Body style={{ flexGrow: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                  {post.venueName}
                </Text>
                <Text style={{ fontSize: 13, color: 'grey' }} note={true}>
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
          <CardItem style={{ backgroundColor: 'black', borderRadius: 0, paddingTop: 0 }}>
            <Left>
              <Button iconLeft={true} transparent={true} onPress={() => {}}>
                <Icon style={{ fontSize: 22, color: 'white' }} name="bookmark" />
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
                <Icon style={{ fontSize: 22, color: 'white' }} name="share" />
              </Button>
            </Left>
            <Right />
          </CardItem>
        </Card>
      </ListItem>
    );
  };

  renderGridView() {
    const playlist = [];

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
      >
        {this.props.venuePosts.map((post, index) => {
          const postedDate = moment(post.timestamp.toDate());
          const displayTimestamp = postedDate.format('MMM DD h:mm A');

          playlist.push({
            id: post.id,
            isVideo: post.type === 'VIDEO',
            assetURL: post.assetURL,
            name: post.venueName,
            author: displayTimestamp,
          });

          if (index > this.state.numberOfVisiblePosts - 1) return null;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => this.props.navigation.push('player', { id: post.id, playlist })}
            >
              <Image
                source={
                  post.type === 'PHOTO'
                    ? { uri: post.thumbnailURL }
                    : require('../../assets/images/play.png')
                }
                style={styles.welcomeImage}
              />
            </TouchableOpacity>
          );
        })}

        <Button
          full={true}
          style={styles.tabBarInfoContainer}
          onPress={() =>
            this.setState({
              numberOfVisiblePosts: this.state.numberOfVisiblePosts + 10,
            })
          }
        >
          <Text style={styles.tabBarInfoText}>LOAD MORE</Text>
        </Button>
      </ScrollView>
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'black' }}>
        <StatusBar barStyle="light-content" />
        <Segment style={{ backgroundColor: 'black', alignSelf: 'center' }}>
          <Button
            first={true}
            onPress={this.onSegmentSelect.bind(this, UnconnectedExplore.segmentMap.grid)}
            style={{
              backgroundColor:
                this.state.currentSegment === UnconnectedExplore.segmentMap.grid
                  ? 'white'
                  : 'black',
              borderColor: 'white',
              paddingLeft: 9,
              paddingRight: 9,
            }}
          >
            <Text
              style={{
                color:
                  this.state.currentSegment === UnconnectedExplore.segmentMap.grid
                    ? 'black'
                    : 'white',
                fontSize: 12,
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{UnconnectedExplore.segmentMap.grid}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Text>
          </Button>
          <Button
            last={true}
            onPress={this.onSegmentSelect.bind(this, UnconnectedExplore.segmentMap.list)}
            style={{
              backgroundColor:
                this.state.currentSegment === UnconnectedExplore.segmentMap.list
                  ? 'white'
                  : 'black',
              borderColor: 'white',
              paddingLeft: 9,
              paddingRight: 9,
            }}
          >
            <Text
              style={{
                color:
                  this.state.currentSegment === UnconnectedExplore.segmentMap.list
                    ? 'black'
                    : 'white',
                fontSize: 12,
              }}
            >
              &nbsp;&nbsp;&nbsp;{UnconnectedExplore.segmentMap.list}&nbsp;&nbsp;&nbsp;
            </Text>
          </Button>
        </Segment>

        <Content>
          {this.state.currentSegment === UnconnectedExplore.segmentMap.list ? (
            <List
              dataArray={this.props.venuePosts.filter(post => post.type === 'PHOTO')}
              renderRow={this.renderVenuePost}
            />
          ) : (
            this.renderGridView()
          )}
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
  firestoreConnect([{ collection: 'venuePosts', limit: 100, orderBy: [['timestamp', 'desc']] }]),
  connect(mapStateToProps, mapDispatchToProps)
)(UnconnectedExplore);

export { UnconnectedExplore, Explore as default };
