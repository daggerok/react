const React = require('react');
const Link = require('react-router').Link;

const Jumbotron = React.createClass({
  render: function render() {
    return (
      <div class='container-fluid jumbotron'>
        <h1>hi</h1>
        <div>administration of <Link to='/ololo'>this</Link> site.</div>
      </div>
    );
  },
});

module.exports = Jumbotron;
