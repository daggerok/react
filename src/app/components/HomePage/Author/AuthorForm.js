const React         = require('react');

const AddAuthorPage = React.createClass({
  render: function render() {
    const { author, onChange, onSave } = this.props;
    return (
      <form onSubmit={onSave}>
        <h3>manage author</h3>

        <input
          name='email'
          class='form-control-static'
          placeholder='email'
          type='email'
          value={author.email}
          onChange={onChange} />

        <input
          name='name'
          class='form-control-static'
          placeholder='name'
          type='text'
          value={author.name}
          onChange={onChange} />

        <input
          type='submit'
          value='save'
          onClick={onSave}
          class='form-inline btn btn-primary' />
      </form>
    );
  },
});

module.exports = AddAuthorPage;
