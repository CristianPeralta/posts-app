import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/actions';
import PropTypes from 'prop-types';

const Logout = props => {
  useEffect(() => {
    props.onLogout();
  }, []);
  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout()),
    };
};

Logout.propTypes = {
    onLogout: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Logout);
