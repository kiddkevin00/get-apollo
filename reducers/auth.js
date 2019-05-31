import actionTypes from '../actionTypes/';

const { AUTH } = actionTypes;

const TODAY = new Date();
const DEFAULT_BIRTHDAY = new Date(TODAY.getFullYear() - 21, TODAY.getMonth(), TODAY.getDate());

const initialState = {
  termsAndConditions: false,
  displayName: '',
  birthday: DEFAULT_BIRTHDAY,
  gender: 'OTHER',
  relationship: 'SINGLE',
  musicPreference: [],

  isLoadingData: false,
  isUpdatingData: false,
  error: {
    isVisible: false,
    message: '',
  },
};

const setData = (data, currentState) =>
  Object.keys(data).reduce(
    (accumulator, field) => {
      if (Object.keys(initialState).includes(field) && data[field]) {
        return { ...accumulator, [field]: data[field] };
      }
      return accumulator;
    },
    { ...currentState }
  );

const authReducer = (state = initialState, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case AUTH.RESET_STATE:
      return { ...initialState };
    case AUTH.SET_DATA:
      return setData(actionPayload, state);
    case AUTH.LOAD_DATA.REQUEST:
      return {
        ...state,
        isLoadingData: true,
        error: {
          ...initialState.error,
        },
      };
    case AUTH.LOAD_DATA.SUCCESS:
      return {
        ...state,
        isLoadingData: false,
      };
    case AUTH.LOAD_DATA.FAILURE:
      return {
        ...state,
        isLoadingData: false,
        error: {
          isVisible: true,
          message: actionPayload,
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
