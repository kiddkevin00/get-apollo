import colors from '../constants/colors';
import React from 'react';
import { Icon } from 'expo';
import { PropTypes } from 'prop-types';

export default class TabBarIcon extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    style: PropTypes.object,
    color: PropTypes.string,
  };

  static defaultProps = {
    type: 'Ionicons',
    size: 32,
    style: {},
    color: 'white',
  };

  render() {
    const ChosenIcon = Icon[this.props.type];

    return (
      <ChosenIcon
        name={this.props.name}
        size={this.props.size}
        style={this.props.style}
        color={this.props.color}
      />
    );
  }
}
