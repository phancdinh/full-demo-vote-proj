import React, {Component} from 'react';
import {Redirect} from '@reach/router';
import {connect} from 'react-redux';
import {TOKEN_LOCAL_STORAGE_KEY} from '../constants/constants';
import {UPDATE_USER_INFO} from "../redux/actions/Actions";

function requiredLogin(WrappedComponent) {
    class _RequiredLogin extends Component {

        render() {
            const {user, location, loadUserInfo,  ...rest} = this.props;
            const {loginFailure, userInfo} = user;
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
            if (!userInfo) {
                loadUserInfo(token);
            }
            return <WrappedComponent {...rest} />;
        }
    }

    return connect(
            (state) => ({
                user: state.userReducer,
            }),
            (dispatch) => ({
                loadUserInfo: (token) => dispatch(
                        {type: UPDATE_USER_INFO, payload: {token}}
                )
            }),
    )(_RequiredLogin);
}

export default requiredLogin;
