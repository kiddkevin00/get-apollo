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
};

const namespaces = Object.keys(actionTypes).reduce((acc, type) => ({ ...acc, [type]: type }), {});

export { actionTypes as default, namespaces };
