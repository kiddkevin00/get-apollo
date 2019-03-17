import rootReducer from '../reducers/';
import firebaseClient from '../utils/firebaseClient';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

const config = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Add BOTH store enhancers when making store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebaseClient),
  reactReduxFirebase(firebaseClient, config),
  applyMiddleware(thunkMiddleware.withExtraArgument(getFirebase)), // Pass getFirebase function as extra argument
  global.__DEV__ && global.__REDUX_DEVTOOLS_EXTENSION__
    ? global.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
)(createStore);

const configureStore = initialState => {
  const store = createStoreWithFirebase(rootReducer, initialState);

  return store;
};

export { configureStore as default };
