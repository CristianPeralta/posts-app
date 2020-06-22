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