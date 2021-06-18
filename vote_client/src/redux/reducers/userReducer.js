import * as actions from '../actions/Actions';


const defaultUserState = {
  loadingProfile: false,
  profile: null,
  doingLogin: false,
  loginSuccess: false,
  loginFailure: false,
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
      };
    case actions.LOGIN_FAILED:
      return {
        ...state,
        doingLogin: false,
        loginSuccess: false,
        loginFailure: true,
      };

    case actions.LOGOUT_START:
      return {
        ...state,
        doingLogin: true,
      };

    case actions.LOGOUT_DONE:
      return {
        ...state,
        doingLogin: false,
        loginSuccess: false,
        loginFailure: false,
        profile: null,
      };

    case actions.LOGOUT_FAILED:
      return {
        ...state,
        doingLogin: false,
        loginSuccess: true,
        loginFailure: false,
      };
    default:
      return state;
  }
};

