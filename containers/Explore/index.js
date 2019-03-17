import firebaseClient from '../../utils/firebaseClient';
import { defaultNavigationOptions } from '../../constants/navigation';
import dimensions from '../../constants/dimensions';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

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
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {},
  welcomeContainer: {
    alignItems: 'center',
    //marginTop: 10,
    //marginBottom: 20,
  },
  welcomeImage: {
    width: dimensions.window.width,
    height: 200,
    resizeMode: 'cover',
    marginTop: 3,
    //marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

class UnconnectedExplore extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'EXPLORED',
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
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
            <Image
              source={require('../../assets/images/clubbing.jpg')}
              style={styles.welcomeImage}
            />
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Load More</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  venuePosts: state.firestore.ordered.venuePosts,
});

const mapDispatchToProps = dispatch => ({});

const Explore = compose(
  firestoreConnect([{ collection: 'venuePosts', limit: 4, orderBy: [['timestamp', 'desc']] }]),
  connect(mapStateToProps, mapDispatchToProps)
)(UnconnectedExplore);

export { UnconnectedExplore, Explore as default };
