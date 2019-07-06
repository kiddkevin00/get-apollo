import actionCreator from '../../actionCreators/auth';
import LoadingPage from '../../components/LoadingPage';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class UnconnectedHome extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    isLoadingData: PropTypes.bool.isRequired,

    dispatchLoadUserInfo: PropTypes.func.isRequired,

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
          const userInfo = await this.props.dispatchLoadUserInfo(auth.uid);

          if (!userInfo.termsAndConditions || !userInfo.displayName || !userInfo.birthday) {
            navigation.navigate(
              NavigationActions.navigate({
                routeName: 'profile',
                action: NavigationActions.navigate({ routeName: 'login' }),
              })
            );
          } else {
             navigation.replace('venues');
           }
        } else {
          navigation.replace('venues');
        }
      } else {
        navigation.navigate(
          NavigationActions.navigate({
            routeName: 'profile',
            action: NavigationActions.navigate({ routeName: 'login' }),
          })
        );
      }
    }
  };

  render() {
    return <LoadingPage />;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  isLoadingData: state.auth.isLoadingData,
});

const mapDispatchToProps = dispatch => ({
  dispatchLoadUserInfo(uid) {
    return dispatch(actionCreator.loadUserInfo(uid));
  },
});

const Home = connect(mapStateToProps, mapDispatchToProps)(UnconnectedHome);

export { UnconnectedHome, Home as default };
