const actionTypes = {
  AUTH: {
    RESET_STATE: 'AUTH.RESET_STATE',
    SET_DATA: 'AUTH.SET_DATA',
    UPDATE_DATA: {
      REQUEST: 'AUTH.UPDATE_DATA.REQUEST',
      SUCCESS: 'AUTH.UPDATE_DATA.SUCCESS',
      FAILURE: 'AUTH.UPDATE_DATA.FAILURE',
    },
  },
};

const namespaces = Object.keys(actionTypes).reduce(
  (acc, type) => ({ ...acc, [type]: type }),
  {}
);

export { actionTypes as default, namespaces };
