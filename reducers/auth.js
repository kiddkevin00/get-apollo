import actionTypes from '../actionTypes';
import { genders, relationships } from '../constants/enums';
import { combineReducers } from 'redux';

const { AUTH } = actionTypes;

const initialState = {
  uid: undefined, // TODO use state.firebase.auth instead
  isAnonymous: undefined, // TODO use state.firebase.auth instead
  providerData: undefined, // TODO use state.firebase.auth instead

  email: undefined,
  termsAndConditions: false,
  displayName: '',
  birthday: undefined, // TODO default to new Date - 18
  gender: genders.UNSPECIFIED,
  relationship: relationships.SINGLE,
  musicPreferences: [],

  isLoadingData: false,
  isUpdatingData: false,
  error: {
    isVisible: false,
    message: '',
  },
};

const authReducer = (state = initialState, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case AUTH.RESET_STATE:
      return { ...initialState };
    case AUTH.SET_DATA:
      return {
        ...state,
        ...actionPayload,
      };
    case AUTH.LOAD_DATA.REQUEST:
      return {
        ...state,
        isUpdatingData: true,
        error: {
          ...initialState.error,
        },
      };
    case AUTH.UPDATE_DATA.REQUEST:
      return {
        ...state,
        isUpdatingData: true,
        error: {
          ...initialState.error,
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

export { authReducer as default };
