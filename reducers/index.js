import auth from './auth';
import displayName from './profile/displayName';
import birthday from './profile/birthday';
import aboutMe from './profile/aboutMe';
import musicPreferences from './profile/musicPreferences';
import { firestoreReducer } from 'redux-firestore';
import { firebaseStateReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  firestore: firestoreReducer,
  auth,
  displayName,
  formBirthday: birthday,
  aboutMe,
  musicPreferences,
});

export { rootReducer as default };
