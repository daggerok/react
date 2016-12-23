import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware
} from 'react-router';
import { useScroll } from 'react-router-scroll';

import App from './components';
import { base } from './settings.json';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

export default () => (
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path={base.href} component={App}>
      <IndexRoute component={HomePage} />
      <Route path='**' component={NotFoundPage} />
    </Route>
    <Route path='**' component={NotFoundPage} />
  </Router>
);
