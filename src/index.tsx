import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Hello, World!</h1>
    </div>
  );
};

const root: HTMLElement = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App />, root);
