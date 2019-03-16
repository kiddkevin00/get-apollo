import colors from './colors';
import { Platform } from 'react-native';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.black,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {
        paddingTop: 35,
        height: 60,
      },
      android: {
        paddingTop: 0,
      },
    }),
  },
  headerTitleStyle: {
    fontWeight: 'normal',
  },
  headerTintColor: colors.grey,
  headerBackTitle: null,
};

// eslint-disable-next-line import/prefer-default-export
export { defaultNavigationOptions };
