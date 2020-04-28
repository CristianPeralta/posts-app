import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/actions';

class Logout extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    componentDidMount() {
        console.log('this.props.', this.props)
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

export default connect(null, mapDispatchToProps)(Logout);