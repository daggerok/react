import * as React from 'react';
import { Unsubscribe } from 'redux';

import {
  store,
  dispatchPlus,
  dispatchMinus,
  dispatchDiv,
  dispatchMult,
} from './reducer';

interface ReduceReduxProps {}

interface ReduceReduxState {
  sum: number;
  numbers: number[];
}

export default class ReduceRedux extends React.Component<ReduceReduxProps, ReduceReduxState> {

  private unsubscribe: Unsubscribe;

  static state = {
    sum: 0,
    numbers: [],
  };

  refs: {
      [key: string]: (Element);
      inputPlus: (HTMLInputElement);
      inputMinus: (HTMLInputElement);
      inputDiv: (HTMLInputElement);
      inputMult: (HTMLInputElement);
  };

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  get(input: HTMLInputElement) {
    const result = input.value;
    input.value = '';
    input.focus();
    return result;
  }

  render() {
    return (
      <div>
        <h4>sum store</h4>

        <input ref='inputPlus' type='number' placeholder='plus action'/>
        <button onClick={() => dispatchPlus(this.get(this.refs.inputPlus))}>plus</button>

        <input ref='inputMinus' type='number' placeholder='minus action'/>
        <button onClick={() => dispatchMinus(this.get(this.refs.inputMinus))}>minus</button>

        <input ref='inputDiv' type='number' placeholder='div action'/>
        <button onClick={() => dispatchDiv(this.get(this.refs.inputDiv))}>div</button>

        <input ref='inputMult' type='number' placeholder='mult action'/>
        <button onClick={() => dispatchMult(this.get(this.refs.inputMult))}>mult</button>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
