import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return(
        <div>
          <Link to='/' style={{padding: '5px'}}>
            Home
          </Link>
          {this.props.isAuthenticated ? <Link to='/profile' style={{padding: '5px'}}>
            Profile
          </Link> : null}
          <Link to='/component1' style={{padding: '5px'}}>
            Component 1
          </Link>
          <Link to='/container1' style={{padding: '5px'}}>
            Container 1
          </Link>
          <Link to='/form1' style={{padding: '5px'}}>
            Form 1
          </Link>
          <Link to='/renderlist' style={{padding: '5px'}}>
             List
          </Link>
          <Link to='/posts' style={{padding: '5px'}}>
             Forum
          </Link>
          <Link to='/privateroute' style={{padding: '5px'}}>
            Private Route
          </Link>
          {!this.props.isAuthenticated
            ? <button onClick={() => this.props.auth.login()}>Login</button>
            : <Link to='/logout' style={{padding: '5px'}}>Logout</Link>
          }
          <br />
          <br />
          <br />
        </div>
    )}
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Header);