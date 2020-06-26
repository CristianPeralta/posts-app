import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Header = props => {
  return (
      <div>
        <Link to='/' style={{padding: '5px'}}>
          Home
        </Link>
        {props.isAuthenticated ? <Link to='/profile' style={{padding: '5px'}}>
          Profile
        </Link> : null}
        <Link to='/posts' style={{padding: '5px'}}>
          Forum
        </Link>
        {!props.isAuthenticated
          ? <button onClick={() => props.auth.login()}>Login</button>
          : <Link to='/logout' style={{padding: '5px'}}>Logout</Link>
        }
        <br />
        <br />
        <br />
      </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object,
};

export default connect(mapStateToProps)(Header);