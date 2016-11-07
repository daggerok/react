/*
 const Hi = ({ name }) => (
 <div>hi, {name ? name : 'guest'}</div>
 );
 */

class HiInputDisplay extends React.Component {
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
    this.handleSetName = this.handleSetName.bind(this);
  }

  handleSetName(name) {
    if (name && name.trim().length > 0) {
      this.setState({ name });
    }
  }

  render() {
    return (
      <div>
        <Display {...this.state}/>
        <InputForm onSetName={this.handleSetName}/>
      </div>
    );
  }
}
