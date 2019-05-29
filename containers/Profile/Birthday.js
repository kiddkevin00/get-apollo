import { defaultNavigationOptions } from '../../constants/navigation';
import { months } from '../../constants/enums';
import { User } from '../../utils/firebase/user';
import React from 'react';
import { StyleSheet, Image, View, Picker, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const TODAY = new Date();
const DEFAULT_BIRTHDAY = new Date(TODAY.getFullYear() - 21, TODAY.getMonth(), TODAY.getDate());

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
    header: null,
  };

  state = {
    birthday: DEFAULT_BIRTHDAY,
  };

  componentDidMount() {
    this.loadUser();
  }

  // TODO
  loadUser = async () => {
    try {
      const user = await User.getCurrentUser();

      const profile = await user.profile();

      if (profile.birthday) {
        this.setState({ birthday: profile.birthday });
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  setMonth = monthIndex => {
    const newDate = new Date(this.state.birthday);

    newDate.setMonth(monthIndex);

    this.setState({ birthday: newDate });
  };

  setYear = year => {
    const newDate = new Date(this.state.birthday);

    newDate.setFullYear(year);

    this.setState({ birthday: newDate });
  };

  setDate = date => {
    const newDate = new Date(this.state.birthday);

    newDate.setDate(date);

    this.setState({ birthday: newDate });
  };

  render() {
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
      this.state.birthday.getFullYear(),
      this.state.birthday.getMonth() + 1,
      0
    ).getDate();
    const datePickerItems = [...Array(endDate).keys()].map(key => {
      const date = key + 1;

      return <Picker.Item label={`${date}`} value={date} key={`D${date}`} />;
    });

    const month = Object.keys(months)[this.state.birthday.getMonth()];
    const date = this.state.birthday.getDate();
    const year = this.state.birthday.getFullYear();

    return (
      <View
        style={{
          backgroundColor: 'black',
          padding: 36,
          alignItems: 'center',
          flex: 1,
        }}
      >
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
          onPress={() => this.props.navigation.push('musicPreference')}
        >
          <Text style={{ fontSize: 14, color: 'white' }}>Saved</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const Birthday = connect(mapStateToProps, mapDispatchToProps)(UnconnectedBirthday);

export { UnconnectedBirthday, Birthday as default };