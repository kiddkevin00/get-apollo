import actionTypes from '../../actionTypes/';

const { BIRTHDAY } = actionTypes;

const birthdayActionCreator = {
  resetState() {
    return {
      type: BIRTHDAY.RESET_STATE,
    };
  },

  setFormField(field, value) {
    return {
      type: BIRTHDAY.FORM.SET_FIELD,
      payload: { field, value },
    };
  },
};

export { birthdayActionCreator as default };
