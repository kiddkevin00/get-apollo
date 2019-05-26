import actionTypes from '../actionTypes';
import { combineReducers } from 'redux';

const { AUTH } = actionTypes;

const mainInitialState = {
  uid: undefined,
  email: undefined,
  isAnonymous: undefined,
  providerData: undefined,
  isUpdatingData: false,
  error: {
    isVisible: false,
    message: '',
  },
};

const mainReducer = (state = mainInitialState, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case AUTH.RESET_STATE:
      return { ...mainInitialState };
    case AUTH.SET_DATA:
      return {
        ...state,
        ...actionPayload,
      };
    case AUTH.UPDATE_DATA.REQUEST:
      return {
        ...state,
        isUpdatingData: true,
        error: {
          ...mainInitialState.error,
        },
      };
    case AUTH.UPDATE_DATA.SUCCESS:
      return {
        ...state,
        isUpdatingData: false,
      };
    case AUTH.UPDATE_DATA.FAILURE:
      return {
        ...state,
        isUpdatingData: false,
        error: {
          isVisible: true,
          message: actionPayload,
        },
      };
    default:
      return state;
  }
};

const authReducer = combineReducers({
  main: mainReducer,
});

export { authReducer as default };
