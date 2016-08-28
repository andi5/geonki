import * as React from 'react';
import {Route, IndexRoute} from 'react-router';

import HomePage from './home/HomePage';

export const routes = (
  <Route path="/">
    <IndexRoute component={HomePage} />
  </Route>
);
