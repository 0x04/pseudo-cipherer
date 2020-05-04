import React, { createContext, useContext } from 'react';


const AppContext = createContext();

class AppProvider extends React.Component
{
  state = {
    input: '',
    output: '',
    functions: [],
    sequence: {
      value: '',
      error: null
    }
  }

  render()
  {
    let value = [ this.state, this.setState.bind(this) ];

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const useAppContext = () => useContext(AppContext);

export default AppContext;

export {
  AppContext,
  AppProvider,
  useAppContext
};
