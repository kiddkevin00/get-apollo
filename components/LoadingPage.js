import { View, Text, StatusBar } from 'react-native';
import React from 'react';

const LoadingPage = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    }}
  >
    <StatusBar hidden={true} />
    <Text style={{ color: 'black' }}>Pouring the drinks...</Text>
  </View>
);

export { LoadingPage as default };
