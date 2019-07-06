import LoadingPage from '../../components/LoadingPage';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class UnconnectedProfile extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentWillMount() {
    this.handleFinalNavigation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleFinalNavigation(nextProps);
  }

  handleFinalNavigation = async ({ auth, navigation }) => {
    if (auth.isLoaded) {
      if (!auth.isEmpty) {
        if (!auth.isAnonymous) {
          navigation.replace('memberProfile');
        } else {
          navigation.replace('guestProfile');
        }
      } else {
        navigation.replace('login');
      }
    }
  };

  render() {
    return <LoadingPage />;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({});

const Profile = connect(mapStateToProps, mapDispatchToProps)(UnconnectedProfile);

export { UnconnectedProfile, Profile as default };
