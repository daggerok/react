import * as React from 'react';
import { render } from 'react-dom';
import { WidgetTableContainer } from './components/widget-table-container';
import { appStore } from './app-store';
import { refreshWidgets } from './actions/refresh-widgets';

render(
  <WidgetTableContainer store={appStore}/>,
  document.querySelector('main')
);

refreshWidgets();
