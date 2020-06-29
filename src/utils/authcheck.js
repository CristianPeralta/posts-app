import React, { useState, useEffect } from 'react';
import * as ACTIONS from '../store/actions/actions';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { registerUser } from '../api';
import PropTypes from 'prop-types';

const AuthCheck = props => {
  const [readyToRedirect, setReadyToRedirect] = useState(false);
  const sendProfileToDb = profile => {
    const data = {
      username: profile.nickname,
      email: profile.email,
      emailVerified: profile.email_verified,
    };
    registerUser(data)
      .then(user => props.saveProfile(user));
  };
  useEffect(() => {
    if (props.auth.isAuthenticated()) {
      props.loginSuccess();
      props.addProfile(props.auth.userProfile.profile);
      sendProfileToDb(props.auth.userProfile.profile);
    } else {
      props.loginFailure();
      props.removeProfile();
      props.removeDbProfile();
    }
    setReadyToRedirect(true);
  }, []);

  return readyToRedirect ? <Redirect to="/" /> : null;
};

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: () => dispatch(ACTIONS.loginSuccess()),
    loginFailure: () => dispatch(ACTIONS.loginFailure()),
    addProfile: (profile) => dispatch(ACTIONS.addProfile(profile)),
    removeProfile: () => dispatch(ACTIONS.removeProfile()),
    saveProfile: (profile) => dispatch(ACTIONS.saveProfile(profile)),
    removeDbProfile: () => dispatch(ACTIONS.removeDbProfile()),
  };
};

AuthCheck.propTypes = {
  auth: PropTypes.object,
  addProfile: PropTypes.func,
  saveProfile: PropTypes.func,
  loginFailure: PropTypes.func,
  loginSuccess: PropTypes.func,
  removeProfile: PropTypes.func,
  removeDbProfile: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(AuthCheck);
