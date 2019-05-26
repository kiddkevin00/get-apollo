import auth from './auth';
import { firestoreReducer } from 'redux-firestore';
import { firebaseStateReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  firestore: firestoreReducer,
  auth,
});

export { rootReducer as default };
