import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchLoginState, clickLogout } from '../actions/auth';

import Header from '../components/layout/Header';
import Loading from '../components/Loading';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchLoginState());
  }

  handleLogout() {
    this.props.dispatch(clickLogout());
  }

  render() {
    const { auth, children } = this.props;

    return auth.isPrepared ? (
      <div>
        <Header
          auth={auth}
          handleLogout={::this.handleLogout}
        />
        {children}
      </div>) :
      <Loading />;
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

function select({ auth }) {
  return { auth };
}

export default connect(select)(App);
