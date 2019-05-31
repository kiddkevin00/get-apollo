import actionTypes from '../../actionTypes/';

const { BIRTHDAY } = actionTypes;

const TODAY = new Date();
const DEFAULT_BIRTHDAY = new Date(TODAY.getFullYear() - 21, TODAY.getMonth(), TODAY.getDate());

const initialState = {
  formBirthday: {
    value: DEFAULT_BIRTHDAY,
    //isValid: false,
    //isValidating: false,
    //dirty: false,
  },
};

const birthdayReducer = (state = initialState, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case BIRTHDAY.RESET_STATE:
      return { ...initialState };
    case BIRTHDAY.FORM.SET_FIELD:
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

export { birthdayReducer as default };
