const actionTypes = {
  AUTH: {
    RESET_STATE: 'AUTH.RESET_STATE',
    SET_DATA: 'AUTH.SET_DATA',
    LOAD_DATA: {
      REQUEST: 'AUTH.LOAD_DATA.REQUEST',
      SUCCESS: 'AUTH.LOAD_DATA.SUCCESS',
      FAILURE: 'AUTH.LOAD_DATA.FAILURE',
    },
    UPDATE_DATA: {
      REQUEST: 'AUTH.UPDATE_DATA.REQUEST',
      SUCCESS: 'AUTH.UPDATE_DATA.SUCCESS',
      FAILURE: 'AUTH.UPDATE_DATA.FAILURE',
    },
  },

  DISPLAY_NAME: {
    RESET_STATE: 'DISPLAY_NAME.RESET_STATE',
    FORM: {
      SET_FIELD: 'DISPLAY_NAME.FORM.SET_FIELD',
    },
  },

  BIRTHDAY: {
    RESET_STATE: 'BIRTHDAY.RESET_STATE',
    FORM: {
      SET_FIELD: 'BIRTHDAY.FORM.SET_FIELD',
    },
  },

  MUSIC_PREFERENCES: {
    RESET_STATE: 'MUSIC_PREFERENCES.RESET_STATE',
    FORM: {
      SET_FIELD: 'MUSIC_PREFERENCES.FORM.SET_FIELD',
    },
  },

  ABOUT_ME: {
    RESET_STATE: 'ABOUT_ME.RESET_STATE',
    FORM: {
      SET_FIELD: 'ABOUT_ME.FORM.SET_FIELD',
    },
  },
};

const namespaces = Object.keys(actionTypes).reduce((acc, type) => ({ ...acc, [type]: type }), {});

export { actionTypes as default, namespaces };
