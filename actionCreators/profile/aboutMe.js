import actionTypes from '../../actionTypes/';

const { ABOUT_ME } = actionTypes;

const aboutMeActionCreator = {
  resetState() {
    return {
      type: ABOUT_ME.RESET_STATE,
    };
  },

  setFormField(field, value) {
    return {
      type: ABOUT_ME.FORM.SET_FIELD,
      payload: { field, value },
    };
  },
};

export { aboutMeActionCreator as default };
