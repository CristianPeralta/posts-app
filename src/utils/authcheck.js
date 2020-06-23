import React, { Component } from 'react';
import * as ACTIONS from '../store/actions/actions';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { registerUser } from '../api';
import PropTypes from 'prop-types';

class AuthCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToRedirect: false,
    };
  }

  sendProfileToDb = (profile) => {
    const data = {
      username: profile.nickname,
      email: profile.email,
      emailVerified: profile.email_verified,
    };
    registerUser(data)
      .then(user => this.props.saveProfile(user));
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.props.loginSuccess();
      this.props.addProfile(this.props.auth.userProfile.profile);
      this.sendProfileToDb(this.props.auth.userProfile.profile);
    } else {
      this.props.loginFailure();
      this.props.removeProfile();
      this.props.removeDbProfile();
    }
    this.setState({readyToRedirect: true});
  }

  render() {
    return this.state.readyToRedirect ? <Redirect to="/" /> : null;
  }
}

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
  auth: PropTypes.func,
  addProfile: PropTypes.func,
  saveProfile: PropTypes.func,
  loginFailure: PropTypes.func,
  loginSuccess: PropTypes.func,
  removeProfile: PropTypes.func,
  removeDbProfile: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(AuthCheck);