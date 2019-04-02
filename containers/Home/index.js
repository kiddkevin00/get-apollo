import { defaultNavigationOptions } from '../../constants/navigation';
import dimensions from '../../constants/dimensions';
import React from 'react';
import { ScrollView, StyleSheet, StatusBar, View, Image, Platform, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

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

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'CLUBS',
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
