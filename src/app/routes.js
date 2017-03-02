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
import NotFound           from './components/NotFound';

export default () => (
  <Router history={browserHistory}
          render={applyRouterMiddleware(useScroll())}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='*' component={NotFound} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
);
