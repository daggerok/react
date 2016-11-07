/*
const Hi = ({ name }) => (
  <div>hi, {name ? name : 'guest'}</div>
);
*/

class Hi extends React.Component {
  static defaultProps = {
    name: 'guest',
  };

  render() {
    return <div>hi, {this.props.name}</div>;
  }
}
