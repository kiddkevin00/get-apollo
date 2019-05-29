import actionTypes from '../../actionTypes/';

const { DISPLAY_NAME } = actionTypes;

const authActionCreator = {
  resetState() {
    return {
      type: DISPLAY_NAME.RESET_STATE,
    };
  },

  setFormField(field, value) {
    return {
      type: DISPLAY_NAME.FORM.SET_FIELD,
      payload: { field, value },
    };
  },
};

export { authActionCreator as default };
