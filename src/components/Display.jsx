class Display extends React.Component {
  static defaultProps = {
    name: 'guest',
    message: 'hello world!',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { name, message } = this.props;

    return (
      <div>
        <h3 className="panel panel-heading">hi, {name}!</h3>
        <div className="panel panel-body">{message}</div>
      </div>
    );
  }
}
