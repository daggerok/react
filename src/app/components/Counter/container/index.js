/**
 * container it's an entry point of application.
 *
 * only container should be connected to the redux.
 */
import React, { Component }   from 'react';

import CounterView from '../components/CounterView';
import CounterUpdater from '../components/CounterUpdater.js';

export default () => (
  <div>
    <CounterView
      counter={0} />
    <CounterUpdater
      up={e => console.log('up')}
      down={e => console.log('down')} />
  </div>
);
