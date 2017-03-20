import React from 'react';
import { render } from 'react-dom';
import SecuredWebClient from './oauth2/secured-client';

render(
  <SecuredWebClient/>,
  document.querySelector('#app')
);
