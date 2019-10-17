import React from 'react';
import ReactDOM from 'react-dom';
//import stringMutilator from 'string-mutilator';
import stringMutilator from '/home/okuehn/WebbstormProjects/string-mutilator';

class App extends React.Component
{
  render()
  {
    return (
      <div className="app">
        {"hello world."}
      </div>
    );
  }
}

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
