import React, { createContext, useContext, useState } from 'react';


const AppContext = createContext();

const initialState = {
  input: '',
  output: '',
  functions: [],
  sequence: {
    value: '',
    error: null
  }
}

const AppProvider = ({ children }) =>
{
  let value = useState(initialState);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => useContext(AppContext);

export default AppContext;

export {
  AppContext,
  AppProvider,
  useAppContext
};
