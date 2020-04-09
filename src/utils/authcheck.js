  
import React, { Component } from 'react';
import history from './history';
import * as ACTIONS from '../store/actions/actions';
import { connect } from 'react-redux'

class AuthCheck extends Component {
  componentDidMount() {
    if(this.props.auth.isAuthenticated()) {
      this.props.loginSuccess()
      this.props.addProfile(this.props.auth.userProfile)
      history.replace('/')
    }
    else {
      this.props.loginFailure()
      this.props.removeProfile()
      history.replace('/')
    }
  }

  render() {
    return(
        <div>
        </div>
    )}
}

function mapDispatchToProps (dispatch) {
  return {
    loginSuccess: () => dispatch(ACTIONS.loginSuccess()),
    loginFailure: () => dispatch(ACTIONS.loginFailure()),
    addProfile: (profile) => dispatch(ACTIONS.addProfile(profile)),
    removeProfile: () => dispatch(ACTIONS.removeProfile())
  }
}

export default connect(null, mapDispatchToProps)(AuthCheck);