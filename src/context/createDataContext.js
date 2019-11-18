import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = {};

    // This adds to each acions (action functions in the BlogContext) to add the dispatch from
    //  the reducer in order to use the dispatch in the BlogContext
    Object.keys(actions).forEach((key) => {
      boundActions[key] = actions[key](dispatch);
    });
    
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};