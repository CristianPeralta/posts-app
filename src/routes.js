import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container1 from './containers/container1'
import Header from './containers/header';
import Profile from './containers/profile';
import Form1 from './containers/form1';
import RenderList from './containers/renderlist';

import NewPost from './containers/NewPost/NewPost';
import Posts from './containers/Posts/Posts';
import FullPost from './containers/FullPost/FullPost';
import EditPost from './containers/EditPost/EditPost';

import Component1 from './functional/component1';
import Callback from './functional/callback';
import PrivateComponent from './functional/privatecomponent';
import UnauthRedirect from './functional/unauthredirect';
import Home from './functional/home';
import RenderListItem from './functional/renderlistitem';
import SignUp from './functional/signup';
import Logout from './functional/logout';

import User from './containers/User/User';
import NewMessage from './containers/NewMessage/NewMessage';
import Reply from './containers/Reply/Reply';
import Messages from './containers/Messages/Messages';

import * as ACTIONS from './store/actions/actions';

import Auth from './utils/auth';
import AuthCheck from './utils/authcheck';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { getProfile } from './api';

export const auth = new Auth();


const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth.isAuthenticated() === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/signup'}} />
  }
  />
)

class Routes extends Component {
  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.props.loginSuccess();
      auth.getProfile((data) => {
        this.props.addProfile(auth.userProfile.profile);
        getProfile(auth.userProfile.profile.nickname)
          .then(data => this.props.saveProfile(data));
      });
    } else {
      this.props.loginFailure();
      this.props.removeProfile();
    }
  }
  render() {
    let routes = (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/form1' component={Form1} />
        <Route path='/redirect' component={UnauthRedirect} />
        <Route path='/renderlist' component={RenderList} />

        <Route path='/user/:username' component={User} />

        <Route path='/posts' component={Posts} />
        <Route path='/post/:pid' component={FullPost} />
        <Route path='/editpost/:pid' component={EditPost} />
        <Route path='/addpost' component={NewPost} />

        <Route path='/callback' render={(props) => { return <Callback auth={auth} {...props} />}} />
        <Route path="/component1" render={(props) => <Component1 {...props} /> } />

        <Route path="/listitem/:id" component={RenderListItem} />

        <Route path='/authcheck' render={() => <AuthCheck auth={auth} /> } />
        
        <Route path='/logout' exact render={props => <Logout auth={auth}  {...props} /> } />
        <Redirect to="/" />
      </Switch>
    );
    if (true) {
      routes = (
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/form1' component={Form1} />
          <Route path='/redirect' component={UnauthRedirect} />
          <Route path='/renderlist' component={RenderList} />

          <Route path='/user/:username' component={User} />

          <Route path='/posts' component={Posts} />
          <Route path='/post/:pid' component={FullPost} />
          <Route path='/editpost/:pid' component={EditPost} />
          <Route path='/addpost' component={NewPost} />

          <Route path='/callback' render={(props) => { return <Callback auth={auth} {...props} />}} />
          <Route path="/component1" render={(props) => <Component1 {...props} /> } />

          <Route path="/listitem/:id" component={RenderListItem} />

          <Route exact path='/container1' render={() => <Container1 auth={auth} /> } />
          <Route path='/authcheck' render={() => <AuthCheck auth={auth} /> } />
          <Route path='/signup' render={() => <SignUp auth={auth}/>} />

          <PrivateRoute path="/send-message" auth={auth} component={NewMessage}/>
          <PrivateRoute path="/show-messages/:id" auth={auth} component={Messages}/>
          <PrivateRoute path="/reply" auth={auth} component={Reply}/>

          <PrivateRoute path="/privateroute" auth={auth} component={PrivateComponent} />
          <PrivateRoute path="/profile" auth={auth} component={Profile} />

          <Route path='/logout' exact render={props => <Logout auth={auth} {...props} /> } />
          <Redirect to="/" />
        </Switch>
      );
    }

    return(
      <div>
        <Header auth={auth} />
        {routes}
      </div>
    )}
}

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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Routes)
);