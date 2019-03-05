import actionTypes from '../actionTypes/';
import { combineReducers } from 'redux';

const { ME } = actionTypes;

const mainInitialState = {
  airtableId: undefined,
  displayName: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  photoUrl: undefined,
  role: undefined,
  identityConfirmationStatus: undefined,
};

const mainReducer = (state = mainInitialState, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case ME.RESET_STATE:
      return { ...mainInitialState };
    case ME.SET_DATA:
      return {
        ...state,
        ...actionPayload,
      };
    default:
      return state;
  }
};

const meReducer = combineReducers({
  main: mainReducer,
});

export { meReducer as default };
