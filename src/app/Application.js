import React                from 'react';
import {
  Redirect,
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware, }  from 'react-router';

import { useScroll }        from 'react-router-scroll';

// import { MuiThemeProvider } from 'material-ui';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import darkBaseTheme        from 'material-ui/styles/baseThemes/darkBaseTheme';

import App                  from './components';
import { base }             from './settings.json';
import HomePage             from './components/HomePage/HomePage';
import NotFoundPage         from './components/NotFoundPage/NotFoundPage';

const Routes = () => (
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path={base.href} component={App}>
      <IndexRoute component={HomePage} />
      <Route path='**' component={NotFoundPage} />
    </Route>
    <Route path='**' component={NotFoundPage} />
  </Router>
);

export default () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Routes />
  </MuiThemeProvider>
);
