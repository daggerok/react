import React from 'react';
import SumView from './components/SumView';
import NumbersView from './components/NumbersView';
import StateView from './components/StateView';

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

  get(input) {
    const result = input.value;
    input.value = '';
    input.focus();
    return result;
  }

  render() {
    return (
      <Content>
        <h2>react redux app</h2>
        <SumView {...merge(this.props, this.get)}/>
        <NumbersView {...merge(this.props, this.get)}/>
        <StateView {...this.state}/>
      </Content>
    );
  }
}

const Content = props => <div style={{
  padding:'2%',
}} {...props}/>;

const merge = (props, get) => Object.assign({}, props, { get });
