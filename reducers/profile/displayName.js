import actionTypes from '../../actionTypes/';

const { DISPLAY_NAME } = actionTypes;

const initialState = {
  formDisplayName: {
    value: '',
    //isValid: false,
    //isValidating: false,
    //dirty: false,
  },
};

const authReducer = (state = initialState, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case DISPLAY_NAME.RESET_STATE:
      return { ...initialState };
    case DISPLAY_NAME.FORM.SET_FIELD:
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

export { authReducer as default };
