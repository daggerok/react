const React       = require('react');
const Link        = require('react-router').Link;

const AuthorsApi  = require('../../../api/authors');
const Jumbotron   = require('./Jumbotron/Jumbotron');
const Author      = require('./Author/Author');

require('./HomePage.styl');

const HomePage = React.createClass({
  getInitialState: function getInitialState() {
    return {
      authors: [],
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.isMounted()) {
      this.setState({
        authors: AuthorsApi.get(),
      });
    }
  },
  createAuthor: function createRow(author) {
    return (
      <Author key={author.email} author={author} />
    );
  },
  render: function render() {
    return (
      <div>
        <Jumbotron />
        <ul class='list-tyle-none'>
          {this.state.authors.map(this.createAuthor)}
        </ul>
      </div>
    );
  },
});

module.exports = HomePage;
