import actionTypes from '../../actionTypes/';

const { ABOUT_ME } = actionTypes;

const initialState = {
  formGender: {
    value: 'OTHER',
    //isValid: false,
    //isValidating: false,
    //dirty: false,
  },
  formRelationship: {
    value: 'COMPLICATED',
    //isValid: false,
    //isValidating: false,
    //dirty: false,
  },
};

const aboutMeReducer = (state = initialState, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case ABOUT_ME.RESET_STATE:
      return { ...initialState };
    case ABOUT_ME.FORM.SET_FIELD:
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

export { aboutMeReducer as default };
