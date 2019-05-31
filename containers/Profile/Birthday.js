import actionCreator from '../../actionCreators/profile/birthday';
import authActionCreator from '../../actionCreators/auth';
import LoadingPage from '../../components/LoadingPage';
import { defaultNavigationOptions } from '../../constants/navigation';
import { months } from '../../constants/enums';
import React from 'react';
import { StyleSheet, Image, View, Picker, Text, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  picker: {
    flex: 1,
  },
  pickerItem: {
    color: 'grey',
  },
});

class UnconnectedBirthday extends React.Component {
  static navigationOptions = {
    ...defaultNavigationOptions,
    title: 'BIRTHDAY',
  };

  static propTypes = {
    isUpdatingData: PropTypes.bool.isRequired,
    formBirthday: PropTypes.instanceOf(Date).isRequired,

    dispatchSetFormField: PropTypes.func.isRequired,
    dispatchSaveUserInfo: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  setMonth = monthIndex => {
    const newDate = new Date(this.props.formBirthday);

    newDate.setMonth(monthIndex);

    this.handleBirthdayChange(newDate);
  };

  setYear = year => {
    const newDate = new Date(this.props.formBirthday);

    newDate.setFullYear(year);

    this.handleBirthdayChange(newDate);
  };

  setDate = date => {
    const newDate = new Date(this.props.formBirthday);

    newDate.setDate(date);

    this.handleBirthdayChange(newDate);
  };

  handleBirthdayChange(value) {
    this.props.dispatchSetFormField('Birthday', value);
  }

  handleSave = () => {
    this.props.dispatchSaveUserInfo({ formBirthday: this.props.formBirthday }, () => {
      this.props.navigation.push('aboutMe', { isOnBoarding: true });
    });
  };

  render() {
    if (this.props.isUpdatingData) {
      return <LoadingPage />;
    }

    const monthPickerItems = Object.keys(months).map(key => (
      <Picker.Item label={months[key]} value={key} key={key} />
    ));

    const startYear = 1900;
    const endYear = new Date().getFullYear() - 18;
    const yearPickerItems = [...Array(endYear - startYear + 1).keys()].map(key => {
      const year = key + startYear;

      return <Picker.Item label={`${year}`} value={year} key={`Y${year}`} />;
    });

    const endDate = new Date(
      this.props.formBirthday.getFullYear(),
      this.props.formBirthday.getMonth() + 1,
      0
    ).getDate();
    const datePickerItems = [...Array(endDate).keys()].map(key => {
      const date = key + 1;

      return <Picker.Item label={`${date}`} value={date} key={`D${date}`} />;
    });

    const month = Object.keys(months)[this.props.formBirthday.getMonth()];
    const date = this.props.formBirthday.getDate();
    const year = this.props.formBirthday.getFullYear();

    return (
      <View
        style={{
          backgroundColor: 'black',
          padding: 36,
          alignItems: 'center',
          flex: 1,
        }}
      >
        <StatusBar hidden={true} />
        <Image
          style={{
            height: 128,
            margin: 16,
            maxWidth: '100%',
            resizeMode: 'contain',
          }}
          source={require('../../assets/images/champagne.png')}
        />
        <Text
          style={{
            textAlign: 'center',
            marginTop: 24,
            paddingLeft: 36, // TODO why?
            paddingRight: 36, // TODO why?
            color: 'grey',
          }}
        >
          Please verify your age and get perks on your birthday month!
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-around', // TODO space-bwteen?
          }}
        >
          <Picker
            selectedValue={month}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue, itemIndex) => this.setMonth(itemIndex)}
          >
            {monthPickerItems}
          </Picker>
          <Picker
            selectedValue={date}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={itemValue => this.setDate(itemValue)}
          >
            {datePickerItems}
          </Picker>
          <Picker
            selectedValue={year}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={itemValue => this.setYear(itemValue)}
          >
            {yearPickerItems}
          </Picker>
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            width: 120,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#017bf6',
            marginTop: 40,
          }}
          onPress={this.handleSave}
        >
          <Text style={{ fontSize: 14, color: 'white' }}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isUpdatingData: state.auth.isUpdatingData,
  formBirthday: state.formBirthday.formBirthday.value,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetFormField(field, value) {
    dispatch(actionCreator.setFormField(field, value));
  },

  dispatchSaveUserInfo(userInfo) {
    dispatch(authActionCreator.saveUserInfo(userInfo));
  },
});

const Birthday = connect(mapStateToProps, mapDispatchToProps)(UnconnectedBirthday);

export { UnconnectedBirthday, Birthday as default };
