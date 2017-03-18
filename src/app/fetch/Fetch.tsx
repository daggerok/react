import * as React from 'react';

export default class Fetch extends React.Component<any, any> {

  state = {
    images: [],
  };

  componentDidMount() {

    fetch('https://raw.githubusercontent.com/daggerok/react/gallery/src/api/v1/photos.json')
      .then(resp => resp.json())
      .then(images => this.setState({ images }))
      .catch(console.error);
  }

  render() {

    const images = this.state.images;

    return (
      <div>
        <h3>Fetch:</h3>
        {
          images.length > 0
            ? <ListStyleItems>
              {
                images.map((i, k) => <li key={k}>{i}</li>)
              }
              </ListStyleItems>
            : <div>loading...</div>
        }
      </div>
    );
  }
}

const ListStyleItems = props => (
  <ul style={{
    listStyleType: 'none',
  }} {...props}/>
);
