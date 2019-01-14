import { Linking, Alert, Platform } from 'react-native';
import moment from 'moment';

const parseDateForDisplay = (date, outFormat = 'MMM D', inFormat = 'YYYY-MM-DD') =>
  moment(date, inFormat).format(outFormat);

const openLinkingUrl = async (kind, param) => {
  const urlMap = {
    map:
      Platform.OS === 'ios'
        ? `http://maps.apple.com/?daddr=${param.latitude},${param.longitude}`
        : `google.navigation:q=${param.latitude}+${param.longitude}`,
    call: `tel:${param}`,
    mail: `mailto:${param}`,
  };
  const url = urlMap[kind];

  try {
    const isSupported = await Linking.canOpenURL(url);

    if (isSupported) {
      await Linking.openURL(url);
    }
  } catch (err) {
    Alert.alert('Try it again', `Something went wrong while opening map.\n${err.message}`);
  }
};

export { parseDateForDisplay, openLinkingUrl };
