const actionTypes = {
  ME: {
    RESET_STATE: 'ME.RESET_STATE',
    SET_DATA: 'ME.SET_DATA',
  },
};

const namespaces = Object.keys(actionTypes).reduce((acc, type) => ({ ...acc, [type]: type }), {});

export { actionTypes as default, namespaces };
