import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import effects from 'redux-effects';
import fetch, {fetchEncodeJSON} from 'redux-effects-fetch';
import {get, identity} from 'lodash';

import {rootReducer} from './reducers';
import {routes} from './routes';

const initialState = get(window, '__INITIAL_STATE__');

const isProduction = process.env.NODE_ENV === 'production';

const middlewares = applyMiddleware(
  effects,
  fetch,
  fetchEncodeJSON
);

const devToolsExtension = get(window, 'devToolsExtension') as (p?: any) => any;
const devtools = (!isProduction && devToolsExtension) ? devToolsExtension() : identity;
const store = compose(middlewares, devtools)(createStore)(rootReducer, initialState);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
