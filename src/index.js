import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './components/app';
import configuration from './config/config';
import config from 'react-global-configuration';

config.set(configuration);

function configureStore(initialState) {
  return createStore(
    rootReducer, initialState,
    applyMiddleware(thunk)
  );
}

const store = configureStore({});

const reactRoot = document.getElementById('react-root');

ReactDOM.render(
  <Provider store={store}><App/></Provider>, reactRoot
);
