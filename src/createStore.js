/**
 * Process the given actions per module to create
 * scoped actions that work within the given scope.
 *
 * @param {string} scopedName the name of the module to scope
 * actions to
 * @param {object} actions the actions to scope
 * @returns the object of scoped actions
 */
const getScopedActions = (scopedName, actions) => {
  const types = Object.keys(actions);

  const scopedActions = types.reduce((acc, type) => {
    const scopedAction = (globalState, action) => {
      const scopedState = globalState[scopedName];
      const scopedStateAfterAction = actions[type](scopedState, action, globalState);
      return {
        ...globalState,
        [scopedName]: scopedStateAfterAction,
      };
    };

    return {
      ...acc,
      [type]: scopedAction,
    };
  }, {});

  return scopedActions;
};

/**
 * Creates a new store, with an initial state and reducer.
 * Builds the store from an array of store modules.
 *
 * @param {object[]} [modules=[]] the array of modules to build the
 * store from
 * @returns {[object, function]} the store initial state and reducer
 */
const createStore = (modules = []) => {
  const initialState = {};

  const reducerCases = modules.reduce((acc, { name, initialState: state, actions }) => {
    initialState[name] = state;

    return {
      ...acc,
      ...getScopedActions(name, actions),
    };
  }, {});

  /**
   * The reducer for the entire store. Accepts actions from
   * a dispatcher and updates the store accordingly.
   *
   * @param {object} state the current state of the store
   * @param {object} action the action that was dispatched
   * @param {string} action.type the type of action that
   * was dispatched. Used to narrow which reducer to use
   * @param {any} action.payload additional information
   * about the action to provide more context to the reducer
   */
  const reducer = (state, action) => {
    const matchCase = reducerCases[action.type];
    if (matchCase) {
      return matchCase(state, action);
    }
    return state;
  };

  return [initialState, reducer];
};

export default createStore;
