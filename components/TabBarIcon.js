import colors from '../constants/colors';
import React from 'react';
import { Icon } from 'expo';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={32}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? colors.lightBlue : colors.grey}
      />
    );
  }
}
