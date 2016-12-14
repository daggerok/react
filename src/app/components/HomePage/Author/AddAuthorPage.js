const React = require('react');
const Link  = require('react-router').Link;

const AuthorForm = require('./AuthorForm');
const AuthorsApi  = require('../../../../api/authors');

const AddAuthorPage = React.createClass({
  getInitialState: function getInitialState() {
    return {
      author: { email: '', name: '', },
    };
  },
  setAuthor: function setAuthor(event) {
    const author = this.state.author;
    const target = event.target;
    const { value, name } = target;

    author[name] = value;
    return this.setState({ author });
  },
  saveAuthor: function setAuthor(event) {
    event.preventDefault();
    AuthorsApi.add(this.state.author);
    this.setState({ author: { email: '', name: '', }, });
  },
  render: function render() {
    return (
      <div class='container-fluid'>
        <AuthorForm
          onChange={this.setAuthor}
          onSave={this.saveAuthor}
          author={this.state.author} />
      </div>
    );
  },
});

module.exports = AddAuthorPage;
