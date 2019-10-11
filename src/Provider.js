import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import storeContext from './storeContext';

const Provider = ({ children, store }) => {
  const [initialState, reducer] = store;
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = [state, dispatch];
  return <storeContext.Provider value={value}>{children}</storeContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node,
  store: PropTypes.array.isRequired,
};

export default Provider;
