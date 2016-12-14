const React       = require('react');
const ReactRouter = require('react-router');
const Link        = ReactRouter.Link;

const base = require('../settings.json').base;

const App = React.createClass({
  render: function() {
    return (
      <div>
        <Link to={base.href}>App</Link>
        {' '}
        <Link to={`${base.href}add-author`}>Add Author</Link>
        {this.props.children}
      </div>
    );
  },
});

module.exports = ReactRouter.withRouter(App);
