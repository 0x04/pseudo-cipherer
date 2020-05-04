import React from 'react';

import { AppProvider } from '../data/AppContext';

import Header from './Header';
import Content from './Content';


const App = () =>
{
  return (
    <AppProvider>
      <div className="app-component">
        <Header/>
        <Content/>
      </div>
    </AppProvider>
  );
};

export default App;
