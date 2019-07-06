import actionCreator from '../../actionCreators/profile/musicPreferences';
import authactionCreator from '../../actionCreators/auth';
import LoadingPage from '../../components/LoadingPage';
import { defaultNavigationOptions } from '../../constants/navigation';
import React from 'react';
import { musicPreferences as musics } from '../../constants/enums';
import {
  Image,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UnconnectedMusicPreferences extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'MUSIC',
  };

  static propTypes = {
    auth: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    isUpdatingData: PropTypes.bool.isRequired,
    formMusicPreferences: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types

    dispatchSetFormField: PropTypes.func.isRequired,
    dispatchSaveUserInfo: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  handleMusicPreferenceButtonPress(TITLE) {
    if (this.props.formMusicPreferences.includes(TITLE)) {
      this.props.dispatchSetFormField(
        'MusicPreferences',
        this.props.formMusicPreferences.filter(PREFERENCE => PREFERENCE !== TITLE)
      );
    } else {
      this.props.dispatchSetFormField('MusicPreferences', this.props.formMusicPreferences.concat(TITLE));
    }
  }

  handleSave = () => {
    this.props.dispatchSaveUserInfo(
      this.props.auth.uid,
      {
        musicPreference: this.props.formMusicPreferences,
      },
      () => {
        if (this.props.navigation.getParam('isOnBoarding', false) === true) {
          this.props.navigation.navigate('memberProfile');
        } else { // [TODO] Might not need `else` block
          this.props.navigation.goBack();
        }
      }
    );
  };

  renderPreferenceButtons = () =>
    Object.keys(musics).map(TITLE => {
      const displayTitle = musics[TITLE];
      const isSelected = this.props.formMusicPreferences.includes(TITLE);

      return (
        <TouchableHighlight
          key={TITLE}
          onPress={this.handleMusicPreferenceButtonPress.bind(this, TITLE)}
          style={{
            width: 120,
            height: 30,
            margin: 4,
            backgroundColor: isSelected ? '#017bf6' : 'black',
            borderRadius: 15,
            borderColor: '#017bf6',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: isSelected ? 'white' : 'grey',
              fontSize: 14,
            }}
          >
            {displayTitle}
          </Text>
        </TouchableHighlight>
      );
    });

  render() {
    if (this.props.isUpdatingData) {
      return <LoadingPage />;
    }

    let isStatusBarHidden;

    if (this.props.navigation.getParam('isOnBoarding', false)) {
      isStatusBarHidden = true;
    } else {
      isStatusBarHidden = false;
    }

    return (
      <ScrollView
        style={{ backgroundColor: 'black' }}
        contentContainerStyle={{ padding: 36 }}
      >
        <StatusBar hidden={isStatusBarHidden} barStyle="light-content" />
        <Image
          style={{
            marginBottom: 26,
            width: '100%',
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={require('../../assets/images/music.png')}
        />
        <View
          style={{
            padding: 18,
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {this.renderPreferenceButtons()}
        </View>
        <TouchableOpacity
          style={{
            marginTop: 10,
            width: 120,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#017bf6',
          }}
          onPress={this.handleSave}
        >
          <Text style={{ color: 'white' }}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  isUpdatingData: state.auth.isUpdatingData,
  formMusicPreferences: state.musicPreferences.formMusicPreferences.value,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetFormField(field, value) {
    dispatch(actionCreator.setFormField(field, value));
  },

  dispatchSaveUserInfo(uid, userInfo, onSuccess) {
    dispatch(authactionCreator.saveUserInfo(uid, userInfo, onSuccess));
  },
});

const MusicPreferences = connect(mapStateToProps, mapDispatchToProps)(UnconnectedMusicPreferences);

export { UnconnectedMusicPreferences, MusicPreferences as default };
