import actionTypes from '../../actionTypes';

const { MUSIC_PREFERENCES } = actionTypes;

const initialState = {
  formMusicPreferences: {
    value: [],
    //isValid: false,
    //isValidating: false,
    //dirty: false,
  },
};

const musicPreferencesReducer = (state = initialState, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case MUSIC_PREFERENCES.RESET_STATE:
      return { ...initialState };
    case MUSIC_PREFERENCES.FORM.SET_FIELD:
      return {
        ...state,
        [`form${actionPayload.field}`]: {
          ...state[actionPayload.field],
          value: actionPayload.value,
          //dirty: true,
        },
      };
    default:
      return state;
  }
};

export { musicPreferencesReducer as default };
