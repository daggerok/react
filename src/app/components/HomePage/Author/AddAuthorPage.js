const React      = require('react');
const Toastr     = require('toastr');

const AuthorForm = require('./AuthorForm');
const AuthorsApi = require('../../../../api/authors');
const base       = require('../../../settings.json').base;

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
    const author = this.state.author;
    if (author.email && author.name) {
      AuthorsApi.add(this.state.author);
      Toastr.success('saved.');
      this.state.author.email = '';
      this.state.author.name = '';
      this.setState({ author: { email: '', name: '', }, });
      this.props.router.push(base.href);
    }
  },
  componentDidMount: function componentWillUnmount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      const author = this.state.author;

      if ('' != author.email && '' != author.name) {
        return 'you have not saved info, are u sure?';
      }
    });
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
