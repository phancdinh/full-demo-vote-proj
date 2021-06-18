import React, {useRef} from 'react';
import {connect} from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {LOGIN_START} from "../redux/actions/Actions";
import {Redirect} from "@reach/router";
import queryString from 'query-string';


function Login(props) {
    const inputUserNameElement = useRef(null);
    const inputPasswordElement = useRef(null);
    const {loginSuccess} = props;
    const queryParams = queryString.parse(window.location.search);
    const redirectUrl = queryParams.ref || '/home';
    const doSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const {doLogin} = props;
        const username = inputUserNameElement.current.value;
        const password = inputPasswordElement.current.value;
        if (username && password) {
            doLogin(username, password);
        }
    };
    if (loginSuccess) {
        return <Redirect from="/login" to={redirectUrl} noThrow />;
    }
    return (
            <div className="row justify-content-center">
                <div className="col-6 mt-4">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control ref={inputUserNameElement} type="text" placeholder="Enter username" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={inputPasswordElement} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={doSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
    )
}


export default connect(
        (state) => ({
            doingLogin: state.userReducer.doingLogin,
            loginSuccess: state.userReducer.loginSuccess,
            loginFailure: state.userReducer.loginFailure,
        }),
        (dispatch) => ({
            doLogin: (username, password) => {
                dispatch({
                    type: LOGIN_START,
                    payload: {username, password},
                });
            },
        }),
)(Login);
