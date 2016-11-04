const mapStateToProps = (state) => ({
  posts: state.posts,
  comments: state.components,
});

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import addComponent from '../redux/actions/addComment';
import removeComment from '../redux/actions/removeComment';
import incrementLikes from '../redux/actions/incrementLikes';

import Main from './Main';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addComponent,
  removeComment,
  incrementLikes,
  dispatch
});

const App = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default App(Main);
