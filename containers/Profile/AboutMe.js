import actionCreator from '../../actionCreators/profile/aboutMe';
import authActionCreator from '../../actionCreators/auth';
import LoadingPage from '../../components/LoadingPage';
import { defaultNavigationOptions } from '../../constants/navigation';
import React from 'react';
import { genders, relationships } from '../../constants/enums';
import TabBarIcon from '../../components/ExpoIcon';
import {
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UnconnectedAboutMe extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'ABOUT ME',
  };

  static propTypes = {
    isUpdatingData: PropTypes.bool.isRequired,
    formGender: PropTypes.string.isRequired,
    formRelationship: PropTypes.string.isRequired,

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
        gender: this.props.formGender,
        relationship: this.props.formRelationship,
      },
      () => {
        if (this.props.navigation.getParam('isOnBoarding', false) === true) {
          this.props.navigation.push('musicPreferences', { isOnBoarding: true });
        } else {
          this.props.navigation.goBack();
        }
      }
    );
  };

  renderGenderButtons = () =>
    Object.keys(genders).map(TITLE => {
      const displayTitle = genders[TITLE];
      let iconName;

      switch (displayTitle) {
        case genders.FEMALE:
          iconName = 'ios-female';
          break;
        case genders.MALE:
          iconName = 'ios-male';
          break;
        case genders.OTHER:
        default:
          iconName = 'ios-transgender';
          break;
      }

      let iconColor;

      if (this.props.formGender === TITLE) {
        iconColor = '#017bf6';
      } else {
        iconColor = 'grey';
      }

      return (
        <TouchableHighlight key={TITLE} onPress={this.handleChange.bind(this, 'Gender', TITLE)}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 4,
            }}
          >
            <TabBarIcon name={iconName} size={48} color={iconColor} />
            <Text style={{ color: iconColor }}>{displayTitle}</Text>
          </View>
        </TouchableHighlight>
      );
    });

  renderRelationshipButtons = () =>
    Object.keys(relationships).map(TITLE => {
      const displayTitle = relationships[TITLE];

      return (
        <TouchableHighlight
          key={TITLE}
          onPress={this.handleChange.bind(this, 'Relationship', TITLE)}
          style={{
            margin: 4,
            borderRadius: 15,
            width: 240,
            height: 30,
            borderColor: '#017bf6',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: this.props.formRelationship === TITLE ? '#017bf6' : 'black',
          }}
        >
          <Text
            style={{
              color: this.props.formRelationship === TITLE ? 'white' : 'grey',
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
          source={require('../../assets/images/about-me-star.png')}
        />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}
        >
          {this.renderGenderButtons()}
        </View>
        <View
          style={{
            paddingVertical: 22,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {this.renderRelationshipButtons()}
        </View>
        <TouchableOpacity
          style={{
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
  formGender: state.aboutMe.formGender.value,
  formRelationship: state.aboutMe.formRelationship.value,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetFormField(field, value) {
    dispatch(actionCreator.setFormField(field, value));
  },

  dispatchSaveUserInfo(uid, userInfo, onSuccess) {
    dispatch(authActionCreator.saveUserInfo(uid, userInfo, onSuccess));
  },
});

const AboutMe = connect(mapStateToProps, mapDispatchToProps)(UnconnectedAboutMe);

export { UnconnectedAboutMe, AboutMe as default };
