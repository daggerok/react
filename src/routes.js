import React from 'react';
import {
  Router,
  Route,
  IndexRoute
} from 'react-router';
import { Provider } from 'react-redux';

import settings from './settings.json';

import store, { history } from './redux/store';

import App from './components/App';

import PhotoGrid from './components/App/PhotoGrid';
import PhotoView from './components/App/PhotoGrid/PhotoView';
import Contact from './components/App/Contact';
import About from './components/App/About';
import NotFound from './components/App/NotFound';


export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path={settings.base.href} component={App}>
        <IndexRoute component={PhotoGrid}/>
        <Route path='view/:id' component={PhotoView}/>
        <Route path='contact' component={Contact}/>
        <Route path='about' component={About}/>
        <Route path='*' component={NotFound}/>
      </Route>
      <Route path='*' component={NotFound}/>
    </Router>
  </Provider>
);
