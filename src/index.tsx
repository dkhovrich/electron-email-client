import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './style.css';

import Application from './containers/App/App';
import store from './store';

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
};

const root: HTMLElement = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<Root />, root);
