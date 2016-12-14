const React = require('react');
const Link  = require('react-router').Link;
const base  = require('../../../settings.json').base;

const Author = React.createClass({
  render: function render() {
    const author = this.props.author;
    return (
      <li key={author.email}>
        <Link to={`${base.href}authors/${author.email}`}>{author.name}</Link> {`<${author.email}>`}
      </li>
    );
  },
});

module.exports = Author;
