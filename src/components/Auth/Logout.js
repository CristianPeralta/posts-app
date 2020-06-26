import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/actions';
import PropTypes from 'prop-types';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout()),
    };
};

Logout.propTypes = {
    onLogout: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Logout);
