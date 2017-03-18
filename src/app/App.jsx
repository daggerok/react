import React from 'react';

export default class ReduceRedux extends React.Component {

  state = {
    sum: 0,
    numbers: [],
  };

  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  get(id) {
    const input = this.refs[id];
    const result = input.value;
    input.value = '';
    input.focus();
    return result;
  }

  render() {

    const {
      dispatchPlus,
      dispatchMinus,
      dispatchDiv,
      dispatchMult,
    } = this.props;

    return (
      <div>
        <h4>sum store</h4>

        <input ref='inputPlus' type='number' placeholder='plus action'/>
        <button onClick={() => dispatchPlus(this.get('inputPlus'))}>plus</button>

        <input ref='inputMinus' type='number' placeholder='minus action'/>
        <button onClick={() => dispatchMinus(this.get('inputMinus'))}>minus</button>

        <input ref='inputDiv' type='number' placeholder='div action'/>
        <button onClick={() => dispatchDiv(this.get('inputDiv'))}>div</button>

        <input ref='inputMult' type='number' placeholder='mult action'/>
        <button onClick={() => dispatchMult(this.get('inputMult'))}>mult</button>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
