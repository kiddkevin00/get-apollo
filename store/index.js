import rootReducer from '../reducers/';
//import firebaseClient from '../utils/firebaseClient';
//import { reactReduxFirebase } from 'react-redux-firebase';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

//const config = { userProfile: 'users' };

const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware),
      //reactReduxFirebase(firebaseClient, config),
      global.__DEV__ && global.__REDUX_DEVTOOLS_EXTENSION__
        ? global.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

  return store;
};

export { configureStore as default };
