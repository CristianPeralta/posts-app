import React, {Component} from 'react';
import { connect } from 'react-redux';

import Container1 from './containers/container1'
import Header from './containers/header';
import Profile from './containers/profile';
import Form1 from './containers/form1';
import RenderList from './containers/renderlist';

import AddPost from './components/blog/addPost';
import Posts from './components/blog/posts';
import ShowPost from './components/blog/showPost';
import EditPost from './components/blog/editPost';

import Component1 from './functional/component1';
import Callback from './functional/callback';
import PrivateComponent from './functional/privatecomponent';
import UnauthRedirect from './functional/unauthredirect';
import Home from './functional/home';
import RenderListItem from './functional/renderlistitem';
import SignUp from './functional/signup';

import ShowUser from './components/profile/showUser';
import sendMessage from './components/profile/sendMessage';
import replyToMessage from './components/profile/replyToMessage';
import showMessages from './components/profile/showMessages';

import * as ACTIONS from './store/actions/actions';

import Auth from './utils/auth';
import AuthCheck from './utils/authcheck';

import { Route, Switch, Redirect } from 'react-router-dom';

export const auth = new Auth();

const handleAuthentication = (props) => {
  if(props.location.hash) {
    auth.handleAuth()
  }
}

const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth.isAuthenticated() === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/signup'}} />
  }
  />
)

class Routes extends Component {
  componentDidMount() {
    if(this.props.isAuthenticated) {
      this.props.loginSuccess();
      auth.getProfile();
      setTimeout(() => {this.props.addProfile(auth.userProfile)}, 400);
    } else {
      this.props.loginFailure();
      this.props.removeProfile();
    }
  }
  render() {
    return(
      <div>
        <Header auth={auth} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/form1' component={Form1} />
          <Route exact path='/container1' render={() => <Container1 auth={auth} /> } />
          <Route path='/authcheck' render={() => <AuthCheck auth={auth} /> } />
          <Route path='/redirect' component={UnauthRedirect} />
          <Route path='/renderlist' component={RenderList} />
          <Route path='/signup' render={() => <SignUp auth={auth}/>} />

          <Route path='/user/:uid' component={ShowUser} />

          <PrivateRoute path="/send-message" auth={auth} component={sendMessage}/>
          <PrivateRoute path="/show-messages/:id" auth={auth} component={showMessages}/>
          <PrivateRoute path="/reply" auth={auth} component={replyToMessage}/>

          <Route path='/posts' component={Posts} />
          <Route path='/post/:pid' component={ShowPost} />
          <Route path='/editpost/:pid' component={EditPost} />
          <Route path='/addpost' component={AddPost} />

          <Route path='/callback' render={(props) => { handleAuthentication(props); return <Callback />}} />
          <Route path="/component1" render={(props) => <Component1 {...props} /> } />

          <Route path="/listitem/:id" component={RenderListItem} />

          <PrivateRoute path="/privateroute" auth={auth} component={PrivateComponent} />
          <PrivateRoute path="/profile" auth={auth} component={Profile} />
          <Redirect to="/" />
        </Switch>
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
    removeProfile: () => dispatch(ACTIONS.removeProfile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);