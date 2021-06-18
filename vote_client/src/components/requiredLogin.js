import React, { Component } from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';
import { TOKEN_LOCAL_STORAGE_KEY } from '../constants/constants';

function requiredLogin(WrappedComponent) {
  class _RequiredLogin extends Component {

    render() {
      const { user, loadProfile, location, ...rest } = this.props;
      const { loginFailure } = user;
      const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || '';
      // check token expired.
      if (token === '' || loginFailure) {
        return (
          <Redirect
            from={location.pathname}
            to={`/login?ref=${location.pathname}`}
            noThrow
          />
        );
      }
      return <WrappedComponent {...rest} />;
    }
  }

  return connect(
    (state) => ({
      user: state.userReducer,
    }),
  )(_RequiredLogin);
}

export default requiredLogin;
