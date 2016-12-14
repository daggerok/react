const React       = require('react');
const Link        = require('react-router').Link;

const AuthorsApi  = require('../../../api/authors');
const Author      = require('./Author/Author');
const base        = require('../../settings.json').base;

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
      <div class='container-fluid'>
        <h3>authors</h3>
        <ul class='list-tyle-none'>
          {this.state.authors.map(this.createAuthor)}
        </ul>
      </div>
    );
  },
});

module.exports = HomePage;
