import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  LOGIN_DONE,
  LOGIN_FAILED,
  LOGIN_START,
} from '../actions/Actions';
import UserService from '../service/LoginService';
import {TOKEN_LOCAL_STORAGE_KEY} from "../../constants/constants";
import {parseJwt} from "../reducers/userReducer";


export function* doLogin({ payload }) {
  try {
    const result = yield call(UserService.doLogin, payload);
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, result.access_token);
    const userInfo = parseJwt(result.access_token);
    yield put({
      type: LOGIN_DONE,
      userInfo: userInfo
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILED,
      payload: { error: "Login Failed" },
    });
  }
}


export default [
  takeLatest(LOGIN_START, doLogin),
];
