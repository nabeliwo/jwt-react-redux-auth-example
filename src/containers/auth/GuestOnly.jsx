import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class GuestOnly extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.userWillTransfer(this.props, this.context.router);
  }

  componentWillUpdate(nextProps) {
    this.userWillTransfer(nextProps, this.context.router);
  }

  userWillTransfer(props, router) {
    if (props.auth.isLoggedIn) {
      router.replace('/');
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

GuestOnly.propTypes = {
  children: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

function select({ auth }) {
  return { auth };
}

export default connect(select)(GuestOnly);
