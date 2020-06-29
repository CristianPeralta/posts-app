import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Header from './containers/Header';
import Profile from './containers/Profile';

import NewPost from './containers/NewPost/NewPost';
import Posts from './containers/Posts/Posts';
import FullPost from './containers/FullPost/FullPost';
import EditPost from './containers/EditPost/EditPost';

import Callback from './components/Util/Callback';
import UnauthRedirect from './components/Util/Unauthredirect';
import Home from './containers/Home';
import SignUp from './components/Auth/Signup';
import Logout from './components/Auth/Logout';

import User from './containers/User/User';
import NewMessage from './containers/NewMessage/NewMessage';
import Reply from './containers/Reply/Reply';
import Messages from './containers/Messages/Messages';

import * as ACTIONS from './store/actions/actions';

import Auth from './utils/Auth';
import AuthCheck from './utils/Authcheck';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { getProfile } from './api';

import PropTypes from 'prop-types';

export const auth = new Auth();

const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth.isAuthenticated() === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/signup'}} />
  }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.element,
  auth: PropTypes.object,
};

const Routes = props => {
  useEffect(() => {
    if (auth.isAuthenticated()) {
      props.loginSuccess();
      auth.getProfile(() => {
        props.addProfile(auth.userProfile.profile);
        getProfile(auth.userProfile.profile.nickname)
          .then(data => props.saveProfile(data));
      });
    } else {
      props.loginFailure();
      props.removeProfile();
    }
  }, []);

  const routes = (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/redirect' component={UnauthRedirect} />

      <Route path='/user/:username' component={User} />

      <Route path='/posts/new' component={NewPost} />
      <Route path='/posts/:pid/edit' component={EditPost} />
      <Route path='/posts/:pid' component={FullPost} />
      <Route path='/posts' component={Posts} />

      <Route path='/callback' render={(props) => { return <Callback auth={auth} {...props} />}} />

      <Route path='/authcheck' render={() => <AuthCheck auth={auth} /> } />
      <Route path='/signup' render={() => <SignUp auth={auth}/>} />

      <PrivateRoute path="/message/new" auth={auth} component={NewMessage}/>
      <PrivateRoute path="/messages/:id" auth={auth} component={Messages}/>
      <PrivateRoute path="/reply" auth={auth} component={Reply}/>

      <PrivateRoute path="/profile" auth={auth} component={Profile} />

      <Route path='/logout' exact render={props => <Logout auth={auth} {...props} /> } />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Header auth={auth} />
      {routes}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: () => dispatch(ACTIONS.loginSuccess()),
    loginFailure: () => dispatch(ACTIONS.loginFailure()),
    addProfile: (profile) => dispatch(ACTIONS.addProfile(profile)),
    saveProfile: (profile) => dispatch(ACTIONS.saveProfile(profile)),
    removeProfile: () => dispatch(ACTIONS.removeProfile()),
  };
};

Routes.propTypes = {
  addProfile: PropTypes.func,
  loginFailure: PropTypes.func,
  removeProfile: PropTypes.func,
  loginSuccess: PropTypes.func,
  saveProfile: PropTypes.func,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Routes)
);
