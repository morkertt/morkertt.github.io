import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <p>TrybeTunes</p>
        <Header />
        <h4>Profile</h4>
      </div>
    );
  }
}

export default Profile;
