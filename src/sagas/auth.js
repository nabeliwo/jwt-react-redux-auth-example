import { take, call, put } from 'redux-saga/effects';
import {
  fetchLoginState,
  failFetchingLoginState,
  fetchUser,
  failFetchingUser,
  login,
  clickLogout,
  logout
} from '../actions/auth';
import superFetch from '../modules/superFetch';

export function* handleFetchLoginState() {
  while (true) {
    yield take(`${fetchLoginState}`);

    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const { payload, err } = yield call(superFetch, {
        url: '/api/login/',
        type: 'GET',
        custom: {
          headers: {
            authorization: `Bearer ${jwt}`
          }
        }
      });

      if (payload && !err) {
        yield put(login(Object.assign({}, payload[0], { jwt })));
        continue;
      }
    }

    yield put(failFetchingLoginState());
  }
}

export function* handleLogin() {
  while (true) {
    const action = yield take(`${fetchUser}`);
    const { payload, err } = yield call(superFetch, {
      url: '/api/login/',
      type: 'POST',
      data: action.payload
    });

    if (!payload && err) {
      yield put(failFetchingUser(String(err).split('Error: ')[1]));
      continue;
    }

    const jwt = payload[0].jsonWebToken;

    localStorage.setItem('jwt', jwt);

    yield put(login(Object.assign({}, payload[0], { jwt })));
  }
}

export function* handleLogout() {
  while (true) {
    yield take(`${clickLogout}`);

    localStorage.removeItem('jwt');

    yield put(logout());
  }
}
