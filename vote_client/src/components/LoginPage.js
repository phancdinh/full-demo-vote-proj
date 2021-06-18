import {useRef} from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {LOGIN_START} from "../redux/actions/Actions";


function Login(props) {
    const inputUserNameElement = useRef(null);
    const inputPasswordElement = useRef(null);

    const doSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { doLogin } = props;
        const username = inputUserNameElement.current.value;
        const password = inputPasswordElement.current.value;
        if (username && password) {
            doLogin(username, password);
        }
    };
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
            doingLogin: state.user.doingLogin,
            loginSuccess: state.user.loginSuccess,
            loginFailure: state.user.loginFailure,
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
