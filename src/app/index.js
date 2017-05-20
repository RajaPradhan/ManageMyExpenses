import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import reducer from './reducer';

// Import the Router
import Router from './router';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    {Router}
  </Provider>,
  document.getElementById('app-container')
);
