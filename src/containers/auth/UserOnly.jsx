import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class UserOnly extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.guestWillTransfer(this.props, this.context.router);
  }

  componentWillUpdate(nextProps) {
    this.guestWillTransfer(nextProps, this.context.router);
  }

  guestWillTransfer(props, router) {
    if (!props.auth.isLoggedIn) {
      router.replace('/login');
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

UserOnly.propTypes = {
  children: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

function select({ auth }) {
  return { auth };
}

export default connect(select)(UserOnly);
