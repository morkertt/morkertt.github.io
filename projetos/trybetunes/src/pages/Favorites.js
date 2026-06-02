import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <p>TrybeTunes</p>
        <Header />
        <h4>Favorites</h4>
      </div>
    );
  }
}

export default Favorites;
