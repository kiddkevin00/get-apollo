import me from './me';
import { firestoreReducer } from 'redux-firestore';
import { firebaseStateReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  firestore: firestoreReducer,
  me,
});

export { rootReducer as default };
