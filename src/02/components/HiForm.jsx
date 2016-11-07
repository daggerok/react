/*
const Hi = ({ name }) => (
  <div>hi, {name ? name : 'guest'}</div>
);
*/

class HiForm extends React.Component {
  static defaultProps = {
    name: 'guest',
    message: 'hello world!',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      message: this.props.message,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    e.preventDefault();
    const ref = this.in;
    if (ref && ref.value && ref.value.trim().length > 0) {
      this.setState({ name: ref.value.trim() });
    }
    this.in.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onButtonClick}>
          <h3 className="panel panel-heading">hi, {this.state.name}!</h3>
          <div className="panel panel-body">{this.state.message}</div>
          <input ref={(input) => this.in = input}
                 className="form-control-static"
                 type='text'/>
          <button className="btn btn-primary">set name</button>
        </form>
      </div>
    );
  }
}
