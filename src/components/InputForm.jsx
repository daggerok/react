class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    e.preventDefault();
    const ref = this.in;
    if (ref && ref.value && ref.value.trim().length > 0) {
      this.props.onSetName(ref.value.trim());
    }
    ref.value = '';
  }

  render() {
    return (
      <form onSubmit={this.onButtonClick}>
        <input ref={(input) => this.in = input}
               className="form-control-static"
               type='text'/>
        <button className="btn btn-primary">set name</button>
      </form>
    );
  }
}
