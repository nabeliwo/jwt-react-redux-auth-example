import { createReducer } from 'redux-act';
import {
  failFetchingLoginState,
  fetchUser,
  failFetchingUser,
  login,
  logout
} from '../actions/auth';

const initial = {
  auth: {
    isPrepared: false,
    isLoggedIn: false,
    user: {
      id: undefined,
      name: undefined,
      pass: undefined,
    },
    isFetching: false,
    error: undefined,
    jwt: ''
  }
};

const auth = createReducer({
  [failFetchingLoginState]: state => Object.assign({}, state, {
    isPrepared: true
  }),
  [fetchUser]: state => Object.assign({}, state, {
    isFetching: true,
    error: undefined
  }),
  [failFetchingUser]: (state, err) => Object.assign({}, state, {
    isFetching: false,
    error: err
  }),
  [login]: (state, payload) => Object.assign({}, state, {
    isPrepared: true,
    isLoggedIn: true,
    user: {
      id: payload.id,
      name: payload.name,
      pass: payload.pass,
    },
    isFetching: false,
    error: undefined,
    jwt: payload.jwt
  }),
  [logout]: () => Object.assign({}, initial.auth, {
    isPrepared: true
  })
}, initial.auth);

export default auth;
