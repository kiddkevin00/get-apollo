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
    flex: 1,
    backgroundColor: 'black',
  },
  welcomeContainer: {
    alignItems: 'center',
    //marginTop: 10,
    //marginBottom: 20,
  },
  welcomeImage: {
    width: dimensions.window.width - 20,
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
    //marginLeft: -10,
    borderRadius: 10,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 0,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});

class UnconnectedExplore extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'EXPLORED',
  };

  static segmentMap = {
    list: 'LIST',
    grid: 'GRID',
  };

  state = { currentSegment: UnconnectedExplore.segmentMap.list };

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

  renderGridView() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../../assets/images/clubbing4.jpg')}
            style={styles.welcomeImage}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../../assets/images/clubbing2.jpeg')}
            style={styles.welcomeImage}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../../assets/images/clubbing3.jpeg')}
            style={styles.welcomeImage}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Image source={require('../../assets/images/clubbing.jpg')} style={styles.welcomeImage} />
        </View>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Load More</Text>
        </View>
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{UnconnectedExplore.segmentMap.list}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Text>
          </Button>
          <Button
            last={true}
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
        </Segment>
        <Content>
          {this.state.currentSegment === UnconnectedExplore.segmentMap.list ? (
            <List dataArray={this.props.venuePosts} renderRow={this.renderVenuePost} />
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
  firestoreConnect([{ collection: 'venuePosts', limit: 30, orderBy: [['timestamp', 'desc']] }]),
  connect(mapStateToProps, mapDispatchToProps)
)(UnconnectedExplore);

export { UnconnectedExplore, Explore as default };
