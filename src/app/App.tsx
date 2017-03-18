import * as React from 'react';

const Padding = props => (
  <div style={{
    padding: '2%',
  }} {...props}/>
);

let person = {
  fname: 'Billy',
  mname: 'Bob',
  lname: 'Thornton',
};

declare var Object: any;
let newPerson = Object.assign({}, person, {
  age: 43
});

import ObjectAssign from './immutable/ObjectAssign';
import ArrayConcat from './immutable/ArrayConcat';
import Fetch from './fetch/Fetch';
import Reduce from './immutable/Reduce';
import ReduceRedux from './redux/ReduceRedux';

export default props => (
  <Padding {...props}>
    <ReduceRedux/>
    <Reduce/>
    <Fetch/>
    <ArrayConcat/>
    <ObjectAssign/>
  </Padding>
);
