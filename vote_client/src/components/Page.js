import React from 'react';
import { connect } from 'react-redux';
import requiredLogin from './requiredLogin';

function Page(props) {
  const {
    children,
  } = props;

  return (
    <div>
      {children}
    </div>
  );
}

export default requiredLogin(
  connect(
    (state) => ({}),
    (dispatch) => ({}),
  )(Page),
);
