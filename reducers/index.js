import auth from './auth';
import displayName from './profile/displayName';
import { firestoreReducer } from 'redux-firestore';
import { firebaseStateReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  firestore: firestoreReducer,
  auth,
  displayName,
});

export { rootReducer as default };
