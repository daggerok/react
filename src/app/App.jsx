import React from 'react';
import fetch from 'node-fetch';
import {
  Link,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';

export default class App extends React.Component {

  state = {
    gists: [],
  };

  componentDidMount() {

    let url = 'http://localhost:8000/api/gists.json';

    if (process.env.NODE_ENV === 'production') {
      url = 'https://api.github.com/gists';
    }

    fetch(url)
      .then(res => res.json() || {})
      .then(gists => this.setState( { gists }));
  }

  render() {

    const gists = this.state.gists;

    return (
      <Router>
        <Root>
          <SideBar>
            {gists.length > 0
              ? gists
                .filter(g => !!g.owner)
                .filter(g => !!g.owner.login)
                .map((gist, key) => {
                  return (
                    <SideBarItem key={key}>
                      <Link to={'/g/' + gist.id}>{gist.owner.login}</Link>
                    </SideBarItem>
                  );
                })
              : <SideBarItem>Loading...</SideBarItem>
            }
          </SideBar>
          <Content>
            <Link to="/">home</Link>
            <Route exact={true} path="/" render={() => <h1>Welcome</h1>}/>
            <Route path="/" render={() => <h4>mkay...</h4>}/>
            <Route path="/g/:gistId" component={Gist}/>
            <Route path="/g/:gistId" render={({ match }) => (
              <GistDetails gist={gists.find(g => g.id === match.params.gistId)} />
            )}/>
          </Content>
        </Root>
      </Router>
    );
  }
};

const Gist = ({ match }) => (
  <div>
    <h3>Gist:</h3>
    <pre>{JSON.stringify(match, null, 1)}</pre>
  </div>
);

const GistDetails = ({ gist }) => (
  <div>
    <h3>Gist Details</h3>
    {
      gist
      && gist.owner
      && gist.owner.avatar_url
        ? <img src={gist.owner.avatar_url} alt=""/>
        : <div>loading image...</div>
    }
    {/*<img src={gist.owner.avatar_url} alt=""/>*/}
    <pre>{JSON.stringify(gist, null, 1)}</pre>
  </div>
);

const Root = props => (
  <div style={{
    display: 'flex',
  }} {...props}/>
);

const SideBar = props => (
  <div style={{
    width: '25vw',
    height: '100vh',
    overflow: 'auto',
    background: '#eee',
  }} {...props}/>
);

const SideBarItem = props => (
  <div style={{
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    padding: '1vw'
  }} {...props}/>
);

const Content = props => (
  <div style={{
    flex: 1,
    height: '100vh',
    overflow: 'auto',
    padding: '2vw',
  }} {...props}/>
);
