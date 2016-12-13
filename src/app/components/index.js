const React = require('react');

const App = React.createClass({
  render: function() {
    return (
      <div>{this.props.children}</div>
    );
  },
});

module.exports = App;
