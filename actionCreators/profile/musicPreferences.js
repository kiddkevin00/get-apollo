import actionTypes from '../../actionTypes/';

const { MUSIC_PREFERENCES } = actionTypes;

const musicPreferencesActionCreator = {
  resetState() {
    return {
      type: MUSIC_PREFERENCES.RESET_STATE,
    };
  },

  setFormField(field, value) {
    return {
      type: MUSIC_PREFERENCES.FORM.SET_FIELD,
      payload: { field, value },
    };
  },
};

export { musicPreferencesActionCreator as default };
