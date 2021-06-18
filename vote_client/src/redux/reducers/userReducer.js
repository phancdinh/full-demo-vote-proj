import * as actions from '../actions/Actions';


const defaultUserState = {
  userInfo: null,
  doingLogin: false,
  loginSuccess: false,
  loginFailure: false,
};

export const userInfoSelector = (state) => state.userReducer.userInfo;


export function parseJwt (token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


export default (state = defaultUserState, { type, payload }) => {
  switch (type) {
    case actions.LOGIN_START:
      return {
        ...state,
        doingLogin: true,
      };
    case actions.LOGIN_DONE:
      return {
        ...state,
        doingLogin: false,
        loginSuccess: true,
        loginFailure: false,
        userInfo: payload.userInfo
      };
    case actions.UPDATE_USER_INFO: {
      const info = parseJwt(payload.token)
      return {
        ...state,
        userInfo: info
      };
    }
    case actions.LOGIN_FAILED:
      return {
        ...state,
        doingLogin: false,
        loginSuccess: false,
        loginFailure: true,
      };
    default:
      return state;
  }
};


export const getUsername = (state) => {
  return state.userReducer.userInfo.sub;
}