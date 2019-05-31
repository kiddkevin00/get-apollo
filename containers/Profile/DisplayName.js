import actionCreator from '../../actionCreators/profile/displayName';
import authActionCreator from '../../actionCreators/auth';
import LoadingPage from '../../components/LoadingPage';
import { defaultNavigationOptions } from '../../constants/navigation';
import React from 'react';
import { Image, StatusBar, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UnconnectedDisplayName extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: '',
  };

  static propTypes = {
    isUpdatingData: PropTypes.bool.isRequired,
    formDisplayName: PropTypes.string.isRequired,

    dispatchSetFormField: PropTypes.func.isRequired,
    dispatchSaveUserInfo: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  handleChange(field, value) {
    this.props.dispatchSetFormField(field, value);
  }

  handleSave = () => {
    this.props.dispatchSaveUserInfo(
      this.props.auth.uid,
      {
        displayName: this.props.formDisplayName,
      },
      () => {
        this.props.navigation.push('birthday');
      }
    );
  };

  render() {
    if (this.props.isUpdatingData) {
      return <LoadingPage />;
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 72,
          backgroundColor: 'black',
        }}
      >
        <StatusBar hidden={true} />
        <Image
          style={{
            width: '100%',
            resizeMode: 'contain',
          }}
          source={require('../../assets/images/welcome.png')}
        />
        <TextInput
          autoFocus={true}
          style={{
            height: 40,
            width: '100%',
            textAlign: 'center',
            fontSize: 24,
            color: 'grey',
            borderColor: 'grey',
            borderBottomWidth: 1,
          }}
          onChangeText={this.handleChange.bind(this, 'DisplayName')}
          value={this.props.formDisplayName}
        />
        <Text style={{ fontSize: 10, color: 'grey' }}>
          Note: Your name must match your state ID or passport.
        </Text>
        <TouchableOpacity
          style={{
            height: 40,
            width: 120,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#017bf6',
            marginTop: 100,
          }}
          onPress={this.handleSave}
        >
          <Text style={{ fontSize: 14, color: 'white' }}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.firebase.auth,
  isUpdatingData: state.auth.isUpdatingData,
  formDisplayName: state.displayName.formDisplayName.value || ownProps.auth.displayName,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetFormField(field, value) {
    dispatch(actionCreator.setFormField(field, value));
  },

  dispatchSaveUserInfo(uid, userInfo, onSuccess) {
    dispatch(authActionCreator.saveUserInfo(uid, userInfo, onSuccess));
  },
});

const DisplayName = connect(mapStateToProps, mapDispatchToProps)(UnconnectedDisplayName);

export { UnconnectedDisplayName, DisplayName as default };
