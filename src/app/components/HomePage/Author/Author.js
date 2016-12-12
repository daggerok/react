const React = require('react');
const Link  = require('react-router').Link;

const Author = React.createClass({
  render: function render() {
    const author = this.props.author;
    return (
      <li key={author.email}>
        <Link to={`/authors/${author.email}`}>{author.name}</Link> {`<${author.email}>`}
      </li>
    );
  },
});

module.exports = Author;
