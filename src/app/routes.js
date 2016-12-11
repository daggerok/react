import React              from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware } from 'react-router';
import { useScroll }      from 'react-router-scroll';

import App                from './components/App';
import Home               from './components/Home';
import NotFound           from './components/App/NotFound';
import { base }           from './settings.json';

export default () => (
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path={base.href} component={App}>
      <IndexRoute component={Home} />
      <Route path='*' component={NotFound} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
);
