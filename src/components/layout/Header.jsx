import React, { Component, PropTypes } from 'react';

class Header extends Component {
  render() {
    const { auth, handleLogout } = this.props;

    return (
      <header>
        {auth.isLoggedIn &&
          <button onClick={handleLogout}>Logout</button>
        }
      </header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Header;
