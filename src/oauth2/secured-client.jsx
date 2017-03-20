import React from 'react';
import {
  getToken,
  getData
} from './security/oauth-service';

const Content = props => <div style={{
  padding: '2%',
}} {...props}/>;

export default class SecuredClient extends React.Component {

  state = {
    data: {},
    response: {},
    err: {},
    me: {},
  };

  componentDidMount() {
    getToken()
      .then(response => this.setState({ response }))
      .then(also => getData(this.state.response, 'http://localhost:9999/me'))
      .then(me => this.setState({ me }))
      .then(also => getData(this.state.response, 'http://localhost:9999'))
      .then(data => this.setState({ data }))
      .catch(err => this.setState({ err }));
  }

  render() {
    return (
      <Content>
        <h4>oauth2 testing....</h4>
        <pre>{JSON.stringify(this.state, null, 1)}</pre>
      </Content>
    );
  }
};
