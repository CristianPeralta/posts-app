import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Callback extends Component {
  state = {
    readyToredirect: false
  }
  componentDidMount() {
    if (this.props.location.hash) {
      this.props.auth.handleAuth(() => {
        this.setState({readyToredirect: true});
      });
    }
  }

  render() {
    let redirectCallback = <p>Callback</p>;
    if (this.state.readyToredirect) {
      redirectCallback = <Redirect to="/authcheck" />;
    }
    return (
      <div>
        {redirectCallback}
      </div>
    );
  }
}

Callback.propTypes = {
  location: PropTypes.object,
  auth: PropTypes.object,
};

export default Callback;