import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../../actions/auth';
import Loading from '../../components/Loading';

class Login extends Component {
  handleSubmit(e) {
    const target = e.target;

    e.preventDefault();

    this.props.dispatch(fetchUser({
      name: target.name.value.trim(),
      pass: target.password.value.trim()
    }));
  }

  renderSubmit() {
    return this.props.auth.isFetching ? <Loading /> : <input type="submit" value="Send" />;
  }

  render() {
    const { auth } = this.props;

    return (
      <div>
        <h1>Log in</h1>

        <form onSubmit={::this.handleSubmit}>
          <ul>
            <li>
              <p>name</p>
              <p><input type="text" name="name" required /></p>
            </li>
            <li>
              <p>Password</p>
              <p><input type="password" name="password" required /></p>
            </li>
          </ul>

          {auth.error &&
            <p>{auth.error}</p>
          }

          {this.renderSubmit()}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

function select({ auth }) {
  return { auth };
}

export default connect(select)(Login);
