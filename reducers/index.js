//import { firebaseStateReducer } from 'react-redux-firebase';
import me from './me';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  //firebase: firebaseStateReducer,
  me,
});

export { rootReducer as default };
