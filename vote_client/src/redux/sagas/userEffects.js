import {
  call,
  put,
  takeLatest,
  takeLeading,
  actionChannel,
  take,
} from 'redux-saga/effects';
import _ from 'lodash';
import {
  LOGIN_DONE,
  LOGIN_FAILED,
  LOGIN_START,
  LOGOUT_START,
  LOGOUT_DONE,
  LOGOUT_FAILED,
} from '../actions/Actions';
import UserService from '../service/LoginService';

export function* doLogin({ payload }) {
  try {
    yield call(UserService.doLogin, payload);
    yield put({
      type: LOGIN_DONE,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILED,
      payload: { error: _.get(error, 'response.data.message') },
    });
  }
}

export function* doLogout() {
  try {
    yield call(UserService.doLogout);
    yield put({
      type: LOGOUT_DONE,
    });
  } catch (error) {
    yield put({
      type: LOGOUT_FAILED,
      payload: { error: _.get(error, 'response.data.message') },
    });
  }
}

export default [
  takeLatest(LOGIN_START, doLogin),
  takeLatest(LOGOUT_START, doLogout),
];
