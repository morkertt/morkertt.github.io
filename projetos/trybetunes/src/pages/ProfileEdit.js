import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <p>TrybeTunes</p>
        <Header />
        <h4>Profile Edit</h4>
      </div>
    );
  }
}

export default ProfileEdit;
